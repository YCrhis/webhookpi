import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import { UserRegisterI } from "@/types/UserT";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { email, name, password }: UserRegisterI = body;

  await connectDB();

  const validEmail = email.trim().toLowerCase();

  const userExist = await User.findOne({ email: validEmail });

  if (userExist) {
    throw new Error("The user already exist");
  }

  /* hashing password */
  const hashedPassword = await bcrypt.hash(password, 12);

  const newUser = await User.create({
    name: name,
    password: hashedPassword,
    email: validEmail,
  });
  console.log("Document ID:", newUser._id);
  console.log("Database:", newUser.db.name);
  console.log("Collection:", newUser.collection.name);

  return NextResponse.json(
    {
      sucesss: true,
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
