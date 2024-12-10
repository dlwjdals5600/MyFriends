export const requireAuth = (req, res, next) => {
    if (!req.session || !req.session.user) {
        return res.redirect('/auth/login');
    }
    next(); // 인증된 사용자는 다음 미들웨어로 진행
};