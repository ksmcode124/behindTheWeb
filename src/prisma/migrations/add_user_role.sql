-- Add 'user' role to Role enum
ALTER TYPE "Role" ADD VALUE IF NOT EXISTS 'user';

