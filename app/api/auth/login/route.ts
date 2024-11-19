import { NextResponse } from 'next/server';
import axios from 'axios';

console.log('app/api/auth/login/route.ts')

export async function POST(req: Request) {
  try {
    const { email, password, rememberMe } = await req.json();

    const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/account/token/`, {
      email,
      password,
      rememberMe,
    });


    if (response.data && response.data.access) {
      return NextResponse.json({ success: true, data: response.data });
    } else {
      return NextResponse.json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error("Error logging in:", error);
    return NextResponse.json({ success: false, message: 'An error occurred' });
  }
}
