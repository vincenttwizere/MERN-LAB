import { prisma } from '../config/db.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/generateToken.js';

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const normalizedEmail = String(email).trim().toLowerCase();

    const existingUser = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (existingUser) {
      return res.status(409).json({ message: 'A user with that email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        username: String(username).trim(),
        email: normalizedEmail,
        password: hashedPassword,
      },
    });

    const token = generateToken(user.id, res);

    return res.status(201).json({ message: 'User registered successfully', token });
  } catch (error) {
    console.error('Register error:', error);
    return res.status(500).json({
      message: 'Registration failed',
      ...(process.env.NODE_ENV !== 'production' ? { details: error.message } : {}),
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const normalizedEmail = String(email).trim().toLowerCase();

    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = generateToken(user.id, res);
    return res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({
      message: 'Login failed',
      ...(process.env.NODE_ENV !== 'production' ? { details: error.message } : {}),
    });
  }
};

//Create a logout function that clears the cookie
const logout =  async (req, res) => {

  res.cookie("jwt", "", {

    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: 'Logout successful' });
};

const getCurrentUser = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Not authorized' });
  }

  const { id, username, email, createdAt } = req.user;
  res.status(200).json({ user: { id, username, email, createdAt } });
};
export { register, login, logout, getCurrentUser };