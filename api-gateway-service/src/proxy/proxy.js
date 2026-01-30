import { createProxyMiddleware } from 'http-proxy-middleware';

export default (target) =>
    createProxyMiddleware({
        target,
        changeOrigin: true,
        on: {
            proxyReq: (proxyReq, req) => {
                proxyReq.setHeader("x-internal-secret", process.env.INTERNAL_SECRET);
                if (req.user) {
                    proxyReq.setHeader("x-user-context", JSON.stringify(req.user));
                }
            }
        }
    });