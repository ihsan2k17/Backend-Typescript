import { Express, Request, Response } from "express";
import swaggerUi from 'swagger-ui-express';
import swaggerjsdoc from 'swagger-jsdoc';
import { version } from "../../package.json";

const option: swaggerjsdoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: 'Rest API Docs',
            version
        },
        components: {
            securitySchemas: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                }
            }
        }
    },
    apis: ["./src/routers/baseroutes.ts"],
};
const swaggerspec = swaggerjsdoc(option)
function swaggerDoc(KuponApps: Express, port: number) {
    KuponApps.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerspec))

    KuponApps.get('swagger')
}