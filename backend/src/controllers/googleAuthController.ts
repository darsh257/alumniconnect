import { Request, Response } from 'express';
import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import { query } from '../config/db';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleLogin = async (req: Request, res: Response): Promise<void> => {
    try {
        const { credential } = req.body;
        
        if (!credential) {
            res.status(400).json({ error: 'Google credential is required' });
            return;
        }

        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        
        if (!payload || !payload.email) {
            res.status(400).json({ error: 'Invalid Google credential' });
            return;
        }

        const email = payload.email;
        const name = payload.name || 'Google User';
        const avatar_url = payload.picture || null;

        // Check if user exists
        const existingUserResult = await query('SELECT * FROM users WHERE email = $1', [email]);
        
        let user;
        
        if (existingUserResult.rows.length > 0) {
            user = existingUserResult.rows[0];
            // Optionally update avatar_url if it's missing in DB
        } else {
            // Create new user, defaulting to STUDENT role
            const newUserResult = await query(
                'INSERT INTO users (email, name, role, avatar_url) VALUES ($1, $2, $3, $4) RETURNING id, email, name, role, avatar_url',
                [email, name, 'STUDENT', avatar_url]
            );
            user = newUserResult.rows[0];
        }

        if (!user.is_active) {
            res.status(403).json({ error: 'Account is deactivated' });
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
        console.error('Google Auth Error:', err);
        res.status(500).json({ error: 'Server error during Google Authentication' });
    }
};
