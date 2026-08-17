import swaggerUi from "swagger-ui-express";

export const swaggerSpec = {
  openapi: "3.0.0",
  info: {
    title: "ResumeForge API",
    version: "1.0.0",
    description: "API documentation for the ResumeForge application",
  },
  servers: [
    {
      url: "http://localhost:5000",
      description: "Local development server",
    },
  ],
  tags: [
    {
      name: "Health",
      description: "API health check",
    },
    {
      name: "Authentication",
      description: "User authentication APIs",
    },
    {
      name: "Resumes",
      description: "Resume management APIs",
    },
  ],
  paths: {
    "/health": {
      get: {
        tags: ["Health"],
        summary: "Check API health",
        responses: {
          "200": {
            description: "API is running",
          },
        },
      },
    },
  },
};

export { swaggerUi };
