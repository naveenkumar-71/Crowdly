const swaggerJsdoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: "3.0.0",

        security: [
            {
                bearerAuth: []
            }
        ],

        info: {
            title: "Crowdly API",
            version: "1.0.0",
            description: "Crowdly Social Media Application API"
        },

        servers: [
            {
                url: "http://localhost:3000",
                description: "Development Server"
            }
        ],

        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            }
        }
    },

    apis: [
        "./src/docs/*.swagger.js"
    ]
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;