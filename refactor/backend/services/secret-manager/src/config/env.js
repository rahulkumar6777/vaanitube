import { z } from 'zod';
import dotenv from 'dotenv'


// env
dotenv.config({
  quiet: true
})

const schema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().default(4000),
  SERVICE_NAME: z.string().default('secrets-manager'),

  REDIS_HOST: z.string(),
  REDIS_PORT: z.coerce.number().default('6379'),
  REDIS_PASSWORD: z.string(),
  REDIS_URL: z.string().optional(),


  ACCESS_TOKEN_SECRET: z.string().min(32),
  ACCESS_TOKEN_EXPIRY: z.string().default('15m'),
  REFRESH_TOKEN_SECRET: z.string().min(32),
  REFRESH_TOKEN_EXPIRY: z.string().default('7d'),

  EMAIL_HOST: z.string().default('smtp.gmail.com'),
  EMAIL_PORT: z.coerce.number().default(465),
  EMAIL_USER: z.string().email(),
  EMAIL_PASS: z.string().min(1),

  RAZORPAY_KEY_ID: z.string().optional(),
  RAZORPAY_KEY_SECRET: z.string().optional(),

  FRONTEND_URL: z.string(),

  RABBITMQ_URL: z.string(),

  BCRYPT_ROUNDS: z.coerce.number().default(10),
})

const parsed = schema.safeParse(process.env);

if (!parsed.success) {
  console.error('\n❌  Secrets Manager — Missing/invalid env vars:\n');
  parsed.error.issues.forEach((i) => {
    console.error(`   • ${i.path.join('.')}: ${i.message}`);
  });
  console.error('\nFix .env and restart.\n');
  throw new Error('Secrets Manager missing/invalid env vars');
}

export const env = parsed.data;
