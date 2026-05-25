import { prisma } from '../config/db.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/generateToken.js';

const register = async (req, res) => {
  try {
    const body = req.body || {};
    const parsedBody = typeof body === 'string' ? JSON.parse(body) : body;
    const { username, email, password } = parsedBody;

    if (!username || !email || !password) {
      return res.status(400).json({
        message: 'username, email, and password are required',
        body: parsedBody,
      });
    }

    const normalizedEmail = String(email).trim().toLowerCase();

    // Check if user exists
    const userExists = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (userExists) {
      return res.status(400).json({
        message: `User with email ${normalizedEmail} already exists`,
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await prisma.user.create({
      data: {
        username: String(username).trim(),
        email: normalizedEmail,
        password: hashedPassword,
      },
    });

    // Generate a jwt token
    const token = generateToken(user.id, res);

    res.status(201).json({

      message: 'User registered successfully', token

    });
  } catch (error) {
    res.status(500).json({

      message: error.message,

    });
  }
};

const login = async (req, res) => {
  const body = req.body || {};
  const parsedBody = typeof body === 'string' ? JSON.parse(body) : body;
   const { email, password} = parsedBody;

   // check if the user exists
   const user = await prisma.user.findUnique({
    where: { email: email},
   });

   if (!user) {

    return res.status(401).json({ error: 'Invalid email or password'});

   }
    // check if the password is correct

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {

      return res.status(401).json({ error: 'Invalid  email or password'});

    }

    // Generate a jwt token
    
    const token = generateToken(user.id, res); 

    res.status(200).json({ message: 'Login successful', token }); 
};

//Create a logout function that clears the cookie
const logout =  async (req, res) => {

  res.cookie("jwt", "", {

    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: 'Logout successful' });
};

export { register, login, logout };