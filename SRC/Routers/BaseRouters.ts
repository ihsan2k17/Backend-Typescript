import { Router, Request, Response } from "express";

abstract class BaseRoutes {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    abstract routes(): void;
}

export default BaseRoutes;