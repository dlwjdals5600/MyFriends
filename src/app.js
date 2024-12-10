import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import session from 'express-session';
import mainRoutes from './routes/main-routes.js';
import authRoutes from './routes/auth-routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

app.use(session({
    secret: process.env.SESSION_KEY, // 세션 암호화에 사용될 키
    resave: false, // 세션이 변경되지 않은 경우에도 저장할지 여부
    saveUninitialized: false, // 초기화되지 않은 세션을 저장할지 여부
    cookie: {
        secure: process.env.NODE_ENV === 'production', // HTTPS에서만 동작하려면 true로 설정
        httpOnly: true, // 클라이언트에서 쿠키를 읽지 못하도록 설정
    },
}));

// 뷰 엔진 설정
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 정적 파일 설정
app.use(express.static(path.join(__dirname, '../public')));

// 미들웨어 설정
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

// 라우트 설정
app.use('/', mainRoutes)
app.use('/auth', authRoutes)

export default app;