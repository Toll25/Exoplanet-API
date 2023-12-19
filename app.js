import express from 'express';
import {initialize} from 'express-openapi';
import exoplanetsService from './api/v1/services/exoplanetsService.js';
import apiDoc from './api/v1/api-doc.js';
import swaggerUi from "swagger-ui-express";
import logging from './middleware/logging.js'

const app = express();
const port = 8000;

app.use(logging);

app.use(express.json());

await initialize({
    app,
    // NOTE: If using yaml you can provide a path relative to process.cwd() e.g.
    // apiDoc: './api-doc.yml',
    apiDoc: apiDoc,
    dependencies: {
        exoplanetsService
    },
    paths: './api/v1/paths',
    routesGlob: "**/*.{ts,js}",
    validateApiDoc: true
});

// OpenAPI UI
app.use(
    "/api-documentation",
    swaggerUi.serve,
    swaggerUi.setup(null, {
        swaggerOptions: {
            url: `http://localhost:${port}/api/v1/api-docs`,
        },
    })
);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})