import { Request, Response, NextFunction } from 'express';
import { check, validationResult } from 'express-validator';
import Sql from '../Database/Server/db_config';
import { QueryTypes } from 'sequelize';
import jwt from 'jsonwebtoken';
import loginQuery from '../Database/query/loginquery';


export const validate = [
    check('Username').isString().isLength({ min: 2 }),
    check('Password').isLength({ min: 2 }),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).send({ errors: errors.array });
        }
        return next();
    }
]

export const CheckUsername = async (req: Request, res: Response, next: NextFunction) => {
    const paramsBody = req.body.Username
    const cek = await Sql.query(loginQuery.loginCheckUsername, {
        replacements: { username: paramsBody },
        type: QueryTypes.SELECT,
    })
    if (cek.length > 0) {
        return res.status(400).send(`${paramsBody} sudah ada, silahkan tambahkan teks lain`);
    }
    next();
}

export const auth = (req: Request, res: Response, next: NextFunction): any => {
    if (!req.headers.authorization) {
        return res.status(400).send("You can't login yet!");
    }
    let secretkey = process.env.JWT_SECRET_KEY || "IndoPrimaPerkasa";
    const token: string = req.headers.authorization.split(" ")[1];
    try {
        const credential: string | object = jwt.verify(token, secretkey);
        if (credential) {
            req.app.locals.credential = credential;
            return next()
        }
        return res.send("token invalid");
    } catch (error) {
        return res.send(error);
    }
}

export const authLogout= (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) {
        return res.status(400).send("You can't login yet!");
    }
    let secretkey = process.env.JWT_SECRET_KEY || "IndoPrimaPerkasa";
    const token: string = req.headers.authorization.split(" ")[1];
    try {
        const decodedToken: any = jwt.verify(token, secretkey);
        if (decodedToken) {
            req.app.locals.credential = {
                Username: decodedToken.Username, 
            };
            return next()
        }
        return res.send("token invalid");
    } catch (error) {
        return res.send(error);
    }
}


