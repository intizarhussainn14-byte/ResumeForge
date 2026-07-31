import bcrypt from "bcryptjs";
import prisma from "../lib/prisma.js";

interface RegisterUserData {
  fullName: string;
  email: string;
  password: string;
  role?: "USER" | "ADMIN";
}

export async function registerUser(data: RegisterUserData) {
  const { fullName, email, password, role = "USER" } = data;

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    throw new Error("Email is already registered.");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  const user = await prisma.user.create({
    data: {
      fullName,
      email,
      password: hashedPassword,
      role,
    },
  });

  return {
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
  };
}