import { ZodError, ZodSchema } from "zod";
import { Request, Response, NextFunction } from "express";

type ValidationSource = "body" | "params" | "query";

export const validationMiddleware = (
  schema: ZodSchema,
  source: ValidationSource = "body",
) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      schema.parse(req[source]);
      console.log("Success validation")
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const message = error.issues.map((issue) => issue.message).join(", ");

        return next({
          statusCode: 400,
          message,
          errors: error.issues,
        });
      }

      return next({
        statusCode: 500,
        message: "Something went wrong during validation",
      });
    }
  };
};
