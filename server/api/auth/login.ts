import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(); 
  const JWT_SECRET = config.JWT_SECRET; 

  const { email, password } = await readBody(event);

  const user = await prisma.user.findUnique({
    where: { email }
  });

  if (!user || !user.password) {
    return { statusCode: 401, body: { success: false, message: 'Invalid email or password' } };
  }

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    return { statusCode: 401, body: { success: false, message: 'Invalid email or password' } };
  }

  const token = jwt.sign(
    { id: user.id, email: user.email }, 
    JWT_SECRET, 
    { expiresIn: '12h' }
  );

  return { 
    statusCode: 200, 
    body: { 
      success: true, 
      message: 'Login successful', 
      token 
    } 
  };
});
