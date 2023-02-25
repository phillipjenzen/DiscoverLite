import { NextFunction, Request, Response } from "express";

export = (permissions: string | any[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.body.role;

    if (permissions.includes(userRole)) {
      next();
    } else {
      res.status(401).send("You do not have permission!");
    }
  };
};
