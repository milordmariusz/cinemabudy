import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(request) {
  const { email, password, name } = await request.json();

  const existingUser = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });

  if (existingUser) {
    return new Response(JSON.stringify({ error: "Email already in use" }), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 400,
    });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    return new Response(
      JSON.stringify({ message: "User Created", user: newUser }),
      {
        headers: {
          "Content-Type": "application/json",
        },
        status: 201,
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: "User creation failed" }), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 500,
    });
  }
}

export async function GET(request) {
  const cookies = request.cookies;

  try {
    const allUsers = await prisma.user.findMany();

    return new Response(JSON.stringify({ users: allUsers }), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to retrieve users" }), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 500,
    });
  }
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  console.log(id);

  try {
    const deletedUser = await prisma.user.delete({
      where: {
        id: parseInt(id),
      },
    });

    return new Response(
      JSON.stringify({ message: "User Deleted", deletedUser }),
      {
        headers: {
          "Content-Type": "application/json",
        },
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error: "Failed to delete user" }), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 500,
    });
  }
}
