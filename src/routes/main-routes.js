import express from 'express';
import { requireAuth } from '../middlewares/auth.js';

const router = express.Router();


router.get('/', requireAuth, (req, res) => {
    res.render('main');
})

export default router;