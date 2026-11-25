import { generateToken } from "@/helpers/jwt";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import { LoginI } from "@/types/Auth";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  try {
    const body = await req.json();

    await connectDB();

    const { email, password }: LoginI = body;

    const normalizeEmail = email.trim().toLowerCase();

    const userExist = await User.findOne({ email: normalizeEmail });

    if (!userExist) {
      return NextResponse.json(
        { success: false, message: "The user doesnt exist." },
        { status: 401 },
      );
    }

    const validatePassword = await bcrypt.compare(password, userExist.password);

    if (!validatePassword) {
      return NextResponse.json(
        { success: false, message: "Contraseña incorrecta." },
        { status: 401 },
      );
    }

    const tokenGenerate = generateToken({email: userExist.email, userId: userExist._id});

    const cookieStore = await cookies();

    cookieStore.set("auth_token", tokenGenerate, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Inicio de sesión exitoso.",
        token: tokenGenerate,
        data: {
          name: userExist.name,
          email: userExist.email,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.log(error, ' error')
    return NextResponse.json(
      {
        success: true,
        message: error,
      },
      { status: 405 },
    );
  }
}
