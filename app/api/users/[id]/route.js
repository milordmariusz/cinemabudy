import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function PUT(request, { params }) {
  const { id } = params;
  const { email, password, name } = await request.json();

  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!existingUser) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        headers: {
          "Content-Type": "application/json",
        },
        status: 404,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const updatedUser = await prisma.user.update({
      where: {
        id: parseInt(id),
      },
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    return new Response(
      JSON.stringify({ message: "User Updated", user: updatedUser }),
      {
        headers: {
          "Content-Type": "application/json",
        },
        status: 200,
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: "User update failed" }), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 500,
    });
  }
}

export async function GET(request, { params }) {
  const { id } = params;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(id),
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

    return new Response(JSON.stringify({ user }), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to retrieve user" }), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 500,
    });
  }
}
