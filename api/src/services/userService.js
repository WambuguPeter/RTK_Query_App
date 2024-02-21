import { poolRequest, closePool, sql } from '../utils/dbConnect.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
export const addUserServices = async (newUser) => {
    try {
        const result = await poolRequest()
            .input('username', sql.VarChar, newUser.username)
            .input('email', sql.VarChar, newUser.email)
            .input('password', sql.VarChar, newUser.password)
            .query("INSERT INTO tbl_user (username, email, password) VALUES( @username, @email, @password)");
        return result;
    } catch (error) {
        return error;
    }
}
export const loginService = async (username, password) => {
    try {
        const userResult = await poolRequest()
            .input('username', sql.VarChar, username)
            .query("select * from tbl_user where username = @username");
            const user = userResult.recordset[0];
        if (!user) {
            return { "error": 'User not found' };
        } else {
            if (!bcrypt.compareSync(password, user.password)) {
                return { "error": 'Wrong Credentials' };
            } else {
                let token = `JWT ${jwt.sign({
                    email: user.email,
                    username: user.username,
                    id: user.id
                },
                    `${process.env.JWT_SECRET}`,
                    { expiresIn: "6h" })}`;
                const { id, username, email } = user;
                return { user: { id, username, email }, token };
            }
        }
    } catch (error) {
        return { "error": error };
    }
}
export const updateUserService = async (userId, updatedUserData) => {
    try {
        const result = await poolRequest()
            .input('id', sql.Int, userId)
            .input('username', sql.VarChar, updatedUserData.username)
            .input('email', sql.VarChar, updatedUserData.email)
            .query("UPDATE tbl_user SET username = @username, email = @email WHERE id = @id");
        return result;
    } catch (error) {
        return error;
    }
}
export const deleteUserService = async (userId) => {
    try {
        const result = await poolRequest()
            .input('id', sql.Int, userId)
            .query("DELETE FROM tbl_user WHERE id = @id");
        return result;
    } catch (error) {
        return error;
    }
}
export const getUserByIdService = async (userId) => {
    try {
        const result = await poolRequest()
            .input('id', sql.Int, userId)
            .query("SELECT * FROM tbl_user WHERE id = @id");
        return result.recordset;
    } catch (error) {
        return error;
    }
}
