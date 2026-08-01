import { Request, Response } from "express";
import { createResumeSchema } from "../validators/resume.validator.js";
import {
    createResume,
    getUserResumes,
    getResumeById,
    deleteResume,
    updateResume,
    analyzeResumeWithAI,
  } from "../services/resume.service.js";

export async function create(req: Request, res: Response) {
  try {
    const validatedData = createResumeSchema.parse(req.body);

    const resume = await createResume({
      ...validatedData,
      userId: req.user!.id,
    });

    return res.status(201).json({
      success: true,
      message: "Resume created successfully.",
      data: resume,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

export async function getAll(req: Request, res: Response) {
  try {
    const resumes = await getUserResumes(req.user!.id);

    return res.status(200).json({
      success: true,
      message: "Resumes fetched successfully.",
      data: resumes,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

export async function getById(req: Request, res: Response) {
  try {
    const resume = await getResumeById(
      req.params.id as string,
      req.user!.id
    );

    return res.status(200).json({
      success: true,
      message: "Resume fetched successfully.",
      data: resume,
    });
  } catch (error: any) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
}
export async function remove(req: Request, res: Response) {
    try {
      const result = await deleteResume(
        req.params.id as string,
        req.user!.id
      );
  
      return res.status(200).json({
        success: true,
        message: result.message,
      });
    } catch (error: any) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  }
  export async function update(req: Request, res: Response) {
    try {
      const validatedData = createResumeSchema.parse(req.body);
  
      const resume = await updateResume(
        req.params.id as string,
        req.user!.id,
        validatedData.title,
        validatedData.originalText
      );
  
      return res.status(200).json({
        success: true,
        message: "Resume updated successfully.",
        data: resume,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
  export async function analyze(req: Request, res: Response) {
    try {
      const { jobDescription } = req.body;
  
      if (!jobDescription) {
        return res.status(400).json({
          success: false,
          message: "Job description is required.",
        });
      }
  
      const analysis = await analyzeResumeWithAI(
        req.params.id as string,
        req.user!.id,
        jobDescription
      );
  
      return res.status(200).json({
        success: true,
        message: "Resume analyzed successfully.",
        data: analysis,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }