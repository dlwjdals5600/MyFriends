import pool from './config/db.js';

const testDatabase = async () => {
    try {
        const result = await pool.query('SELECT NOW()');
        console.log('Database connected:', result.rows[0]);
    } catch (error) {
        console.error('Database connection failed:', error);
    } finally {
        pool.end(); // 연결 종료
    }
};

testDatabase();