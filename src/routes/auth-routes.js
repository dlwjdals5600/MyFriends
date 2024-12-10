import express from 'express'
import {
    loginPage,
    signUpPage,
    signUp,
    login,
    logout
} from '../controllers/auth-controller.js'

const router = express.Router();

// 로그인 화면
router.get('/login', loginPage);
// 회원가입 화면
router.get('/signup', signUpPage);




// 회원가입 기능
router.post('/signup', signUp);
// 로그인 기능
router.post('/login', login);

router.post('/logout', logout);

export default router;