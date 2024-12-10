import { createUser } from '../services/auth-service.js'
import { findUserByEmail } from '../models/auth-model.js';
import bcrypt from 'bcrypt';

// 로그인 페이지 렌더링
const loginPage = (req, res) => {
    res.render('login');
};
// 회원가입 페이지 렌더링
const signUpPage = (req, res) => {
    res.render('signup', {emailError: null, pwError: null, pw2Error: null});
};

// 회원가입 기능
const signUp = async (req, res) => {
    try {
        const { email, password } = req.body;

        const existingUser = await findUserByEmail(email);

        if (existingUser) {
            return res.status(400).json({ error: '이미 등록된 이메일입니다.' });
        }

        const user = await createUser( { email, password });

        res.status(200).json({ message: '회원가입 성공', redirectUrl: '/auth/login'});
    } catch (error) {
        console.error('회원가입 중 오류 발생 : ', error);
        res.status(500).json({ error: '서버 오류가 발생했습니다.' });
    }
};

const login = async (req, res) => {
    try{
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(401).json({error: '이메일과 비밀번호를 모두 입력해주세요.'});
        }

        const user = await findUserByEmail(email);
        if (!user) {
            return res.status(400).json({ error: '존재하지 않는 이메일입니다.' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: '비밀번호가 일치하지 않습니다.' });
        }

        req.session.user = { id: user.id, email: user.email };

        res.status(200).json({ message: '로그인 성공', redirectUrl: '/'});
    } catch (error) {
        console.error('로그인 중 오류 발생:', error);
        res.status(500).json({ error: '서버 오류가 발생했습니다.' });
    }
}

export {loginPage, signUpPage, signUp, login}