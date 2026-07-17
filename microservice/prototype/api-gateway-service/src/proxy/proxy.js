import { createProxyMiddleware } from 'http-proxy-middleware';
import { log } from '../utils/logger.js';

export default (target, serviceName) =>
    createProxyMiddleware({
        target,
        changeOrigin: true,
        on: {
            proxyReq: (proxyReq, req) => {
                proxyReq.setHeader("x-internal-secret", process.env.INTERNAL_SECRET);
                proxyReq.setHeader("x-trace-id", req.traceId);
                proxyReq.startTime = Date.now();
                if (req.user) {
                    proxyReq.setHeader("x-user-context", JSON.stringify(req.user));
                }
            },

            proxyRes(proxyRes, req, res) {
                const latency = Date.now() - proxyRes.req.startTime;

                log({
                    traceId: req.traceId,
                    service: serviceName,
                    method: req.method,
                    path: req.originalUrl,
                    statusCode: proxyRes.statusCode,
                    latency: `${latency}ms`
                });
            },
            error(err, req) {
                log({
                    traceId: req.traceId,
                    service: serviceName,
                    error: err.message
                });
            }
        }
    });