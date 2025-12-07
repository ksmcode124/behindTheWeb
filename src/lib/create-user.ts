/**
 * Utility script to create a user with a password
 * Usage: This can be used in a script or API route to create users
 */

import { prisma } from './prisma';
import { hashPassword } from './auth';

export async function createUserWithPassword(
  email: string,
  password: string,
  name?: string,
  role: 'admin' | 'superadmin' | 'user' = 'user'
) {
  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error('User with this email already exists');
  }

  // Hash password
  const hashedPassword = await hashPassword(password);

  // Create user
  const user = await prisma.user.create({
    data: {
      email,
      name,
      role,
      accounts: {
        create: {
          accountId: email,
          providerId: 'credential',
          type: 'credential',
          password: hashedPassword,
        },
      },
    },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
    },
  });

  return user;
}

