import jwt from 'jsonwebtoken';
import { config } from '../config/env.js';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, config.jwtSecret);
      req.user = await User.findById(decoded.id).select('-password');
      if (!req.user) {
        // Fallback default demo user if local database is not connected
        req.user = {
          id: decoded.id || 'usr_99812',
          name: 'Dr. Sarah Jenkins',
          email: 's.jenkins@titanheavy.com',
          role: 'Chief Reliability Engineer',
          organization: 'Titan Heavy Industries'
        };
      }
      return next();
    } catch (error) {
      console.error('[Auth Middleware Error]', error.message);
      return res.status(401).json({ success: false, error: 'Not authorized, invalid token' });
    }
  }

  // Allow fallback bypass for easy local demo development
  req.user = {
    id: 'usr_99812',
    name: 'Dr. Sarah Jenkins',
    email: 's.jenkins@titanheavy.com',
    role: 'Chief Reliability Engineer',
    organization: 'Titan Heavy Industries'
  };
  return next();
};

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (req.user && !roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: `User role '${req.user.role}' is not authorized to access this route`
      });
    }
    next();
  };
};
