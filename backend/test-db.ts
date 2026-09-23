import { query } from './src/config/db';

async function testConnection() {
    try {
        console.log('Testing connection to Supabase Postgres...');
        const res = await query('SELECT NOW(), current_database(), current_user');
        console.log('Connection successful!');
        console.log(res.rows[0]);
        
        console.log('Checking tables...');
        const tablesRes = await query(`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public'
            ORDER BY table_name;
        `);
        console.log('Tables found:', tablesRes.rows.map(r => r.table_name));
        process.exit(0);
    } catch (error) {
        console.error('Connection failed:', error);
        process.exit(1);
    }
}

testConnection();
