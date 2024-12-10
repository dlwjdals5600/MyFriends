import pool from '../config/db.js';

// 유저 저장
export const saveUser = async ({ email, password }) => {
    try {
        const query = `
            INSERT INTO users (email, password)
            VALUES ($1, $2)
            RETURNING id, email;
            `;
        const values = [email, password];
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.error('Error saving user:', error);
        throw error;
    }
};
// 이메일로 유저 검색
export const findUserByEmail = async (email) => {
    try {
        const query = `
        SELECT id, email, password
        FROM users
        WHERE email = $1;
        `;
        const values = [email];
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.error('Email로 유저를 찾는중에 오류가 생겼습니다 : ', error);
        throw error;
    }
};