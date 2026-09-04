import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'khet_setu_sih26033_secret_key_2026';

export const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      name: user.name,
      role: user.role,
      phone: user.phone,
      email: user.email
    },
    JWT_SECRET,
    { expiresIn: '30d' }
  );
};

export const requireAuth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized. No token provided.' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token.' });
  }
};
