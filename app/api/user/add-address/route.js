import connectDB from "@/config/db";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Address from "@/models/address.model.js";

export async function POST(request) {
    try{
      const {userId} = getAuth(request);
      const {address} = await request.json();
      await connectDB();
      const newAddress = await Address.create({
        userId,
        ...address
      });
      return NextResponse.json({
        success: true,
        newAddress,
        message: "Address added successfully"
      });
    }
    catch(err){
       return NextResponse.json({
        success: false,
        message: err.message
       })

    }
}