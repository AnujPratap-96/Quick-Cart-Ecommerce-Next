import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Address from "@/models/address.model";
import connectDB from "@/config/db";
export async function GET(request){
    try{
        const {userId} = getAuth(request);
        await connectDB();
        const addresses = await Address.find({userId});
        return NextResponse.json({
            success: true,
            addresses
        });
    }
    catch(error){
        return NextResponse.json({
            success: false,
            message: error.message
        });
    }
}