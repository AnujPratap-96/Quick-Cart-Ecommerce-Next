
import { NextResponse } from "next/server";
import connectDB from "@/config/db.js";
import Product from "@/models/product.model.js";

export async function GET(request) {
  try {
  
      await connectDB();
      const products = await Product.find({});
      return NextResponse.json({ success: true, products });
    
  } catch (err) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}
