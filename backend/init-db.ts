import fs from 'fs';
import path from 'path';
import { query } from './src/config/db';
async function initDb() {
    try {
        console.log('Reading schema.sql...');
        const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf-8');

        console.log('Applying schema to Supabase...');
        await query(schema);

        console.log('Schema applied successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Failed to apply schema:', error);
        process.exit(1);
    }
}
initDb();
