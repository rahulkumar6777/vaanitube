export type AppScreen = 'home' | 'login' | 'signup';
export type SignupRole = 'viewer' | 'creator';
export type VerificationType = 'pan' | 'aadhaar';
export type AuthStatus = 'checking' | 'authenticated' | 'unauthenticated';

export type AuthUser = {
  id: string;
  role: string;
};
