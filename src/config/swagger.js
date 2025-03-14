import swaggerJSDoc from 'swagger-jsdoc';

const URL = process.env.URL || "unknown url";
const BASE_PATH = '/openscancloud';

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Express API',
            version: '1.0.0',
            description: 'Automatische API-Dokumentation mit Swagger',
        },
        servers: [{ url: URL }],
        basePath: BASE_PATH
    },
    apis: ['./src/routes/*.js'], // Pfad zu den Routen mit JSDoc-Kommentaren
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);
export default swaggerSpec;
