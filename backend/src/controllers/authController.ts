import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { query } from '../config/db';

export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, name, password, role } = req.body;
        
        if (!email || !name || !password || !role) {
            res.status(400).json({ error: 'All fields are required' });
            return;
        }

        const existingUser = await query('SELECT * FROM users WHERE email = $1', [email]);
        if (existingUser.rows.length > 0) {
            res.status(400).json({ error: 'User already exists' });
            return;
        }

        const salt = await bcrypt.genSalt(10);
        const password_hash = await bcrypt.hash(password, salt);

        const newUser = await query(
            'INSERT INTO users (email, name, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING id, email, name, role',
            [email, name, password_hash, role]
        );

        if (role === 'ALUMNI') {
             // Create empty alumni profile
             await query(
                 'INSERT INTO alumni_profiles (user_id, batch_year, is_verified, is_active) VALUES ($1, $2, false, true)',
                 [newUser.rows[0].id, new Date().getFullYear()]
             );
        }

        const token = jwt.sign(
            { id: newUser.rows[0].id, role: newUser.rows[0].role }, 
            process.env.JWT_SECRET || 'secret', 
            { expiresIn: '1d' }
        );

        res.status(201).json({ user: newUser.rows[0], token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({ error: 'Email and password are required' });
            return;
        }

        const userResult = await query('SELECT * FROM users WHERE email = $1', [email]);
        if (userResult.rows.length === 0) {
            res.status(400).json({ error: 'Invalid credentials' });
            return;
        }

        const user = userResult.rows[0];
        if (!user.is_active) {
            res.status(403).json({ error: 'Account is deactivated' });
            return;
        }

        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            res.status(400).json({ error: 'Invalid credentials' });
            return;
        }

        const token = jwt.sign(
            { id: user.id, role: user.role }, 
            process.env.JWT_SECRET || 'secret', 
            { expiresIn: '1d' }
        );

        res.status(200).json({ 
            user: { id: user.id, email: user.email, name: user.name, role: user.role, avatar_url: user.avatar_url }, 
            token 
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

export const getMe = async (req: Request, res: Response): Promise<void> => {
    try {
        const userReq = req as any; 
        if (!userReq.user || !userReq.user.id) {
            res.status(401).json({ error: 'Not authenticated' });
            return;
        }

        const userId = userReq.user.id;
        const userResult = await query('SELECT id, email, name, role, avatar_url, is_active FROM users WHERE id = $1', [userId]);
        
        if (userResult.rows.length === 0) {
            res.status(404).json({ error: 'User not found' });
            return;
        }

        res.status(200).json({ user: userResult.rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};
