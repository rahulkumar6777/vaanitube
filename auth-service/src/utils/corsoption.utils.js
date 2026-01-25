const corsLocally = {
    origin: ['http://localhost:5175'],
    methods: ['POST' , 'GET' , 'PUT' , 'DELETE' , 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
}

const corsProdution = {
    origin: ['https://vaanitube.com'],
    methods: ['POST' , 'GET' , 'PUT' , 'DELETE' , 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
}

export const corsOptions  = process.env.NODE_ENV === 'production' ? corsProdution : corsLocally;