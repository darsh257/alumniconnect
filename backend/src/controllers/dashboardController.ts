import { Request, Response } from 'express';
import { query } from '../config/db';

export const getStudentDashboard = async (req: Request, res: Response): Promise<void> => {
    try {
        const userReq = req as any;
        if (userReq.user?.role !== 'STUDENT') {
            res.status(403).json({ error: 'Only students can access this dashboard' });
            return;
        }

        // Fetch some recommended alumni (for mock purpose, we just fetch any active alumni limit 3)
        const alumniResult = await query(`
            SELECT u.id, u.name, u.avatar_url, p.job_title as "currentRole", p.company 
            FROM users u
            JOIN alumni_profiles p ON u.id = p.user_id
            WHERE u.role = 'ALUMNI' AND u.is_active = true
            LIMIT 3
        `);

        // Fetch upcoming sessions (events)
        const eventsResult = await query(`
            SELECT id, title, type, date, location 
            FROM events
            WHERE date > NOW() AND is_active = true
            ORDER BY date ASC
            LIMIT 2
        `);

        // Format data for the frontend
        res.status(200).json({
            recommendedAlumni: alumniResult.rows.map(row => ({
                id: row.id,
                name: row.name,
                role: row.currentRole || 'Alumni',
                company: row.company || 'Company',
                image: row.avatar_url || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?fit=facearea&facepad=2&w=256&h=256&q=80',
                isRequested: false
            })),
            upcomingSessions: eventsResult.rows.map(row => ({
                id: row.id,
                title: row.title,
                type: row.type || 'Mentorship',
                date: row.date,
                time: new Date(row.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }))
        });
    } catch (err) {
        console.error('Error fetching student dashboard:', err);
        res.status(500).json({ error: 'Server error' });
    }
};
