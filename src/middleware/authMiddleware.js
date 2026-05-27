import jwt from 'jsonwebtoken';
import { prisma} from '../config/db.js';

export const authMiddleware = async (req, res, next) => {

    console.log('Auth middleware reached');
    
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {

      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies && (req.cookies.jwt || req.cookies.token)) {

      token = req.cookies.jwt || req.cookies.token;
    }

    if (!token) {
    
      return res.status(401).json({ error: 'Not authorized, no token' });
    }

    try {
      //Verify token and get user id from token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await prisma.user.findUnique({
        where: { id: decoded.id },
      });

      if (!user) {
        return res.status(401).json({ error: 'User no longer exists' });
      }

      req.user = user;
      next();

    } catch (error){

       return res.status(401).json({ error: 'Not authorized, token failed' });

    }
} 