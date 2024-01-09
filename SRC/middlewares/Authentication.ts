import bcrypt from 'bcrypt';
import jwt  from 'jsonwebtoken';
class Authentication {
    public static PaswordHash = (Password: string): Promise<string> => {
        return bcrypt.hash(Password, 10);
    }
    public static PasswordCompare = async (
        text: string, encryptText: string): Promise<boolean> => {
        let result = await bcrypt.compare(text, encryptText);
        return result;
    }
    public static GenerateToken = (
        Username: string, 
        Role: string, 
        ID: string, 
        Status: string, 
        PC:string, 
        Version:string, 
        lastLogin:Date,
        lastLogout:Date,
        Input_Duration:string
        ): string => {
        const secretKey: string = process.env.JWT_SECRET_KEY || "secret";
        const token: string = jwt.sign({ID, Username, Role, Status,PC, Version, lastLogin, lastLogout, Input_Duration}, secretKey);
        return token;
    }
    public static isPasswordHashed = (Password: string): boolean => {
        const hashPatterns = ["$2", "$2a", "$2b", "$2y"];
        return hashPatterns.some(pattern => Password.startsWith(pattern));
    }
}

export default Authentication;