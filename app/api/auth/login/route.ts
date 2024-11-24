import { NextResponse } from 'next/server';
import axios from 'axios';

console.log('app/api/auth/login/route.ts')

// const api = axios.create({
//   baseURL: `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/account/token/`,
// });

export const fetchUserData = async (email="mrchike@mailinator.com", password="mrchike123") => {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/account/token/`, {
      email,
      password,
    });
    console.log('app/(dashboard)/(routes)/(root)/page.tsx', response.data.userId)
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error); // Log error if any
  }
};

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
