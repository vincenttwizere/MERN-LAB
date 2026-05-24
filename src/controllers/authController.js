import { prisma } from '../config/db.js';
import bcrypt from 'bcryptjs';

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

    res.status(201).json({
      message: 'User registered successfully'
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export { register };