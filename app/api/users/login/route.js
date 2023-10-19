import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";
import { COOKIE_NAME } from "@/constants";

const MAX_AGE = 360;

export async function POST(request) {
  const { email, password } = await request.json();

  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        headers: {
          "Content-Type": "application/json",
        },
        status: 404,
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      const secret = process.env.JWT_SECRET || "";
      const token = jwt.sign({ userId: user.id }, secret, {
        expiresIn: MAX_AGE,
      });

      const serialized = serialize(COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV == "production",
        sameSite: "strict",
        maxAge: MAX_AGE,
        path: "/",
      });

      return new Response(JSON.stringify({ message: "Login successful" }), {
        headers: {
          "Set-Cookie": serialized,
        },
        status: 200,
      });
    } else {
      return new Response(JSON.stringify({ error: "Login failed" }), {
        headers: {
          "Content-Type": "application/json",
        },
        status: 401,
      });
    }
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Login failed" }), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 500,
    });
  }
}
