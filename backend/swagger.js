const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Cookies App API",
      version: "1.0.0",
      description: "REST API dokumentacija za Cookies App — kursevi, korisnici, prijave i uloge",
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Lokalni razvojni server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        User: {
          type: "object",
          properties: {
            _id: { type: "string", example: "664f1b2c3e4d5f6a7b8c9d0e" },
            name: { type: "string", example: "Nemanja Petrović" },
            email: { type: "string", example: "nemanja@example.com" },
            age: { type: "number", example: 22 },
            phone: { type: "string", example: "0641234567" },
            isAdmin: { type: "boolean", example: false },
            courses: { type: "array", items: { type: "string" }, example: [] },
            applications: { type: "array", items: { type: "string" }, example: [] },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        AuthResponse: {
          type: "object",
          properties: {
            _id: { type: "string", example: "664f1b2c3e4d5f6a7b8c9d0e" },
            name: { type: "string", example: "Nemanja Petrović" },
            email: { type: "string", example: "nemanja@example.com" },
            token: { type: "string", example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." },
            age: { type: "number", example: 22 },
            phone: { type: "string", example: "0641234567" },
          },
        },
        Course: {
          type: "object",
          properties: {
            _id: { type: "string", example: "664f1b2c3e4d5f6a7b8c9d0e" },
            name: { type: "string", example: "Web Development" },
            desc: { type: "string", example: "Kurs za web razvoj" },
            range: { type: "string", example: "3 meseca" },
            price: { type: "string", example: "15000" },
            onSalePrice: { type: "string", example: "12000" },
            related: { type: "array", items: { type: "string" }, example: ["JavaScript", "HTML"] },
            link: { type: "string", example: "https://example.com/web-dev" },
            image: { type: "string", example: "https://example.com/image.jpg" },
            onSale: { type: "boolean", example: true },
            aktuelan: { type: "boolean", example: true },
          },
        },
        Application: {
          type: "object",
          properties: {
            _id: { type: "string", example: "664f1b2c3e4d5f6a7b8c9d0e" },
            name: { type: "string", example: "Nemanja Petrović" },
            email: { type: "string", example: "nemanja@example.com" },
            phone: { type: "string", example: "0641234567" },
            courseName: { type: "string", example: "Web Development" },
            courseId: { type: "string", example: "664f1b2c3e4d5f6a7b8c9d0e" },
            userId: { type: "string", example: "664f1b2c3e4d5f6a7b8c9d0e" },
          },
        },
        Question: {
          type: "object",
          properties: {
            _id: { type: "string", example: "664f1b2c3e4d5f6a7b8c9d0e" },
            name: { type: "string", example: "Nemanja" },
            email: { type: "string", example: "nemanja@example.com" },
            message: { type: "string", example: "Kada počinje sledeći kurs?" },
          },
        },
        Role: {
          type: "object",
          properties: {
            _id: { type: "string", example: "664f1b2c3e4d5f6a7b8c9d0e" },
            name: { type: "string", example: "admin" },
          },
        },
        Error: {
          type: "object",
          properties: {
            message: { type: "string", example: "Greška na serveru" },
          },
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
