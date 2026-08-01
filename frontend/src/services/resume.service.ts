import api from "@/lib/api";

export interface Resume {
  id: string;
  title: string;
  originalText: string;
  optimizedText: string | null;
  atsScore: number | null;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export async function getResumes() {
  const response = await api.get("/resumes");
  return response.data.data as Resume[];
}

export async function getResume(id: string) {
  const response = await api.get(`/resumes/${id}`);
  return response.data.data as Resume;
}

export async function createResume(data: {
  title: string;
  originalText: string;
}) {
  const response = await api.post("/resumes", data);
  return response.data.data as Resume;
}

export async function updateResume(
  id: string,
  data: {
    title?: string;
    originalText?: string;
  }
) {
  const response = await api.put(`/resumes/${id}`, data);
  return response.data.data as Resume;
}

export async function deleteResume(id: string) {
  await api.delete(`/resumes/${id}`);
}

export async function analyzeResume(
  id: string,
  jobDescription: string
) {
  const response = await api.post(`/resumes/${id}/analyze`, {
    jobDescription,
  });

  return response.data.data;
}