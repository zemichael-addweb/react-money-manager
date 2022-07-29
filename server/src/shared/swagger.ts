const swaggerJsDoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Library API",
            version: "1.0.0",
            description: "A simple Express Library API",
            termsOfService: "http://example.com/terms/",
            contact: {
                name: "API Support",
                url: "http://www.exmaple.com/support",
                email: "support@example.com",
            },
        },
        servers: [
            {
                url: "http://localhost:4001",
                description: "My API Documentation",
            },
        ],
    },
    apis: ["./Routes/*.js"],
};

export const swaggerSpecs = swaggerJsDoc(options);