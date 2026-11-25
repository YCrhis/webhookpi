import jwt, { JwtPayload } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_TIME = process.env.JWT_EXPIRES_IN!;

interface TokenPayload {
  userId: string;
  email: string;
}

// Create token
export const generateToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "1h",
  });
};

// Validate token
export const validateToken = (token: string): TokenPayload | null => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

    return {
      userId: decoded.userId,
      email: decoded.email,
    };
  } catch {
    return null;
  }
};