export const verifyMiddleware = (req, res, next) => {
    const token = req.headers['x-internal-token'];

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    if (token !== process.env.SECRET_TOKEN) {
        return res.status(403).json({ message: "Forbidden" });
    }
    console.log("Verification middleware executed");
    next();
}