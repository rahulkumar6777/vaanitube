import { randomUUID } from "crypto";

export const traceMiddleware = (req, res, next) => {
  const traceId = req.headers["x-trace-id"] || randomUUID();

  req.traceId = traceId;
  res.setHeader("x-trace-id", traceId);

  next();
};