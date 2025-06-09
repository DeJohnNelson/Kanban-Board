import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();



export const login = async (req: Request, res: Response) => {
  
  const user = await User.findOne({ where: { email: req.body.email } as any });
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

 
  const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Invalid password' });
  }

  
  const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET_KEY || '', { expiresIn: '1h' });
  return res.json({ token });
};

const router = Router();

// POST /login - Login a user
router.post('/login', login);

export default router;
