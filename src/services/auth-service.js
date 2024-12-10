import { saveUser } from '../models/auth-model.js'
import bcrypt from 'bcrypt';

export const createUser = async ({ email, password }) => {

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await saveUser({ email, password: hashedPassword });

    return user;
}