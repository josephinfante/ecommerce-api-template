import bycript from 'bcrypt';

export const encryptPassword = async (password: string) => {
    let salt = await bycript.genSalt(10);
    return await bycript.hash(password, salt);
}

export const comparePassword = async (password: string, encryptedPassword: string) => {
    return await bycript.compare(password, encryptedPassword);
}