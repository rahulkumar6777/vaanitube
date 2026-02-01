export const loggerMiddleware = (req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    console.log(JSON.stringify({
      traceId: req.traceId,
      method: req.method,
      path: req.originalUrl,
      statusCode: res.statusCode,
      latencyMs: Date.now() - start
    }));
  });

  next();
};