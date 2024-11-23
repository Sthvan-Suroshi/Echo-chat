// we are overwritting this file because (req.user= user) throws error

interface AuthUser {
  id: number;
  name: string;
  email: string;
}

declare namespace Express {
  export interface Request {
    user?: AuthUser;
  }
}
