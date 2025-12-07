/**
 * API route to create an admin user (for initial setup only)
 * This should be protected or removed in production
 */

import { NextRequest, NextResponse } from 'next/server';
import { createUserWithPassword } from '@/lib/create-user';

export async function POST(request: NextRequest) {
  try {
    // In production, you should add authentication/authorization here
    // For now, this is a utility endpoint for initial setup
    
    const body = await request.json();
    const { email, password, name, role = 'admin' } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    if (role !== 'admin' && role !== 'superadmin' && role !== 'user') {
      return NextResponse.json(
        { error: 'Invalid role. Must be admin, superadmin, or user' },
        { status: 400 }
      );
    }

    const user = await createUserWithPassword(email, password, name, role);

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      message: 'User created successfully',
    });
  } catch (error: any) {
    console.error('Create user error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

