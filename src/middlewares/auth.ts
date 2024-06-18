import * as jwt from "jsonwebtoken";

import { Request, Response, NextFunction } from "express";

export interface IMyRequest extends Request {
  id?: string;
  email?: string;
  nome?: string;
}

const createAuthMiddleware = (
  req: IMyRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).send({ error: "No token provided" });

  const parts = authHeader.split(" ");

  if (parts.length !== 2) return res.status(401).send({ error: "Token error" });

  const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme))
      return res.status(401).send({ error: "Token malformatted" });

    jwt.verify(token, "chaveprivada", (err: any, decoded: any) => {
      if (err) return res.status(401).send({ err, error: "Token invalid" });

      req["id"] = decoded.id;
      req["email"] = decoded.email;
      req["nome"] = decoded.nome;

      return next();
    });
};

export default createAuthMiddleware;
