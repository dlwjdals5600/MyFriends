export const requireAuth = (req, res, next) => {
    // 세션이나 쿠키에서 사용자 인증 여부 확인 (예: req.session.user)
    if (!req.session || !req.session.user) {
        return res.redirect('/auth/login'); // 로그인 페이지로 리다이렉트
    }
    next(); // 인증된 사용자는 다음 미들웨어로 진행
};