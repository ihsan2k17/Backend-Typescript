import express, {Application } from 'express';
import parse from 'body-parser';
import { config as dotenv } from 'dotenv';
import SalesRouters from './SRC/Routers/SalesRouters';
import 'reflect-metadata';
import cors from 'cors';
import AgenRoutes from './SRC/Routers/AgenRoutes';
import HadiahRoutes from './SRC/Routers/HadiahRoutes';
import CustomerRoutes from './SRC/Routers/CustomerRoutes';
import LoginRoutes from './SRC/Routers/LoginRoutes';
import KuponRoutes from './SRC/Routers/KuponRoutes';
import PeriodeRoutes from './SRC/Routers/PeriodeRoutes';
import CustomerNakamiRoutes from './SRC/Routers/CustomerNakamiRoutes';
import HadiahNakamiRoutes from './SRC/Routers/HadiahNakamiRoutes';
import KuponNakamiRoutes from './SRC/Routers/KuponNakamiRoutes';

class KuponApps{
    public KuponApps: Application;
    

    constructor() {
        this.KuponApps = express();
        this.plugins();
        this.routes();
        dotenv();
    }
    protected routes(): void {
        this.KuponApps.use("/Kupon", SalesRouters);
        this.KuponApps.use("/Kupon", AgenRoutes);
        this.KuponApps.use("/Kupon", HadiahRoutes);
        this.KuponApps.use("/Kupon", HadiahNakamiRoutes);
        this.KuponApps.use("/Kupon", CustomerRoutes);
        this.KuponApps.use("/Kupon", CustomerNakamiRoutes);
        this.KuponApps.use("/Kupon", LoginRoutes);
        this.KuponApps.use("/Kupon", KuponRoutes);
        this.KuponApps.use("/Kupon", KuponNakamiRoutes);
        this.KuponApps.use("/Kupon", PeriodeRoutes);

    }
    protected plugins(): void {
        this.KuponApps.use(parse.json());
        this.KuponApps.use(cors({
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
            allowedHeaders: ['Content-Type', 'Authorization'],
            credentials: true
        }));
    }
}
const port: number = 8080;
const kupon = new KuponApps().KuponApps;
kupon.listen(port, ()=> {
    console.log("berjalan di port " + port);
    console.log(process.env.DB_HOST);
}) 
