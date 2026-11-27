import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import { UserRegisterI } from "@/types/Auth";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { email, name, password }: UserRegisterI = body;

  await connectDB();

  const validEmail = email.trim().toLowerCase();

  const userExist = await User.findOne({ email: validEmail });

  if (userExist) {
    return NextResponse.json({
      success: false,
      message: "User already exist"
    }, {status: 401})
  }

  /* hashing password */
  const hashedPassword = await bcrypt.hash(password, 12);

  const newUser = await User.create({
    name: name,
    password: hashedPassword,
    email: validEmail,
  });

  return NextResponse.json(
    {
      success: true,
      message: "User registered successfully",
      data: {
        name: newUser.name,
        email: newUser.email,
        isActive: newUser.isActive,
        projectName: newUser.projectName,
      },
    },
    { status: 200 },
  );
}
