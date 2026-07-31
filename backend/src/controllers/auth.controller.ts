import { Request, Response } from "express";
import { registerSchema } from "../validators/auth.validator.js";
import { registerUser } from "../services/auth.service.js";

export async function register(req: Request, res: Response) {
  try {
    // Validate request body
    const validatedData = registerSchema.parse(req.body);

    // Register user
    const user = await registerUser(validatedData);

    return res.status(201).json({
      success: true,
      message: "User registered successfully.",
      data: user,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}