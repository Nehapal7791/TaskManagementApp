import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Task Management API",
      version: "1.0.0",
      description: "API documentation for Task Management",
    },
    basePath: "/api",
    servers: [
      {
        url: "http://localhost:3000/api",
        description: "Local server",
      },
      {
        url: "https://task-management-app-swart.vercel.app/",
        description: "Deployed server",
      },
    ],
  },
  apis: ["./src/routers/*.js"],
};

const specs = swaggerJsdoc(options);

export { specs, swaggerUi };
