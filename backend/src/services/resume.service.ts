import prisma from "../lib/prisma.js";
import { analyzeResume } from "../ai/ats.service.js";

interface CreateResumeData {
  title: string;
  originalText: string;
  userId: string;
}
export async function getUserResumes(userId: string) {
    const resumes = await prisma.resume.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  
    return resumes;
  }

export async function createResume(data: CreateResumeData) {
  const { title, originalText, userId } = data;

  const resume = await prisma.resume.create({
    data: {
      title,
      originalText,
      userId,
    },
  });

  return resume;
}
export async function getResumeById(
    resumeId: string,
    userId: string
  ) {
    const resume = await prisma.resume.findFirst({
      where: {
        id: resumeId,
        userId,
      },
    });
  
    if (!resume) {
      throw new Error("Resume not found.");
    }
  
    return resume;
  }
  export async function deleteResume(
    resumeId: string,
    userId: string
  ) {
    // Check if resume exists and belongs to the user
    const resume = await prisma.resume.findFirst({
      where: {
        id: resumeId,
        userId,
      },
    });
  
    if (!resume) {
      throw new Error("Resume not found.");
    }
  
    await prisma.resume.delete({
      where: {
        id: resumeId,
      },
    });
  
    return {
      message: "Resume deleted successfully.",
    };
  }
  export async function updateResume(
    resumeId: string,
    userId: string,
    title: string,
    originalText: string
  ) {
    // Check if resume belongs to the user
    const resume = await prisma.resume.findFirst({
      where: {
        id: resumeId,
        userId,
      },
    });
  
    if (!resume) {
      throw new Error("Resume not found.");
    }
  
    const updatedResume = await prisma.resume.update({
      where: {
        id: resumeId,
      },
      data: {
        title,
        originalText,
      },
    });
  
    return updatedResume;
  }
  export async function analyzeResumeWithAI(
    resumeId: string,
    userId: string,
    jobDescription: string
  ) {
    const resume = await prisma.resume.findFirst({
      where: {
        id: resumeId,
        userId,
      },
    });
  
    if (!resume) {
      throw new Error("Resume not found.");
    }
  
    const analysis = await analyzeResume(
      resume.originalText,
      jobDescription
    );
  
    await prisma.resume.update({
      where: {
        id: resume.id,
      },
      data: {
        optimizedText: analysis.optimizedResume,
        atsScore: analysis.overallScore,
      },
    });
  
    return analysis;
  }