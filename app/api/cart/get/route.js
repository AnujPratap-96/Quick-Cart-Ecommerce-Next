import connectDB from "@/config/db";
import { getAuth, User } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { userId } = getAuth(request);
    await connectDB();
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" });
    }
    return NextResponse.json({ success: true, cartItems: user.cartItems });
  } catch (err) {
    return NextResponse.json({ success: false, message: err.message });
  }
}
