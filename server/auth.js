import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const hashPassword = (password) => bcrypt.hash(password, 10);

export const comparePassword = (password, hash) => bcrypt.compare(password, hash);

export const signToken = (user) =>
  jwt.sign(
    { id: user.id, email: user.email, name: user.name },
    process.env.JWT_SECRET || 'clickshot-dev-secret',
    { expiresIn: '7d' }
  );

export const sanitizeUser = (user) => ({
  id: user.id,
  name: user.name,
  email: user.email,
  createdAt: user.created_at,
});
