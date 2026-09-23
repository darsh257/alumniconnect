import { query } from './src/config/db';

async function alterDb() {
    try {
        console.log('Altering users table...');
        await query('ALTER TABLE users ALTER COLUMN password_hash DROP NOT NULL;');
        console.log('Successfully dropped NOT NULL constraint on password_hash');
        process.exit(0);
    } catch (error) {
        console.error('Failed to alter db:', error);
        process.exit(1);
    }
}

alterDb();
