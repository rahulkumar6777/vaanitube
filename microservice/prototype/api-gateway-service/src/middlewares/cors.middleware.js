const devCors = {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}

const productionCors = {
    origin: "https://vaanitube.com",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}

export const corsOption = process.env.NODE_ENV === 'production' ? productionCors : devCors