import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
      const token = jwt.sign({ userId: user.id }, "your-secret-key", {
        expiresIn: "1h",
      });

      return new Response(
        JSON.stringify({ message: "Login successful", token }),
        {
          headers: {
            "Content-Type": "application/json",
          },
          status: 200,
        }
      );
    } else {
      return new Response(JSON.stringify({ error: "Login failed" }), {
        headers: {
          "Content-Type": "application/json",
        },
        status: 401,
      });
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: "Login failed" }), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 500,
    });
  }
}
