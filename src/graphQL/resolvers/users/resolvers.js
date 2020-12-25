import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../../../models/User';

/**
 * @desc signup mutation that handles signing up users to our application
 * @param {*} req
 */
export const signup = async(_, req) => {

    const {username, email, password, confirmPassword} = req;

    try {
        const existingUser = await User.findOne({email});
        if (existingUser) {
            throw new Error('User already exist!');
        }
        // const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({
            username, email, password, confirmPassword
        })

        user.save();
        return {message: 'User created successfully!'};
    } catch (err) {
        throw new Error(err);
    }
}

/**
 * @desc login mutation that handles signing into our application
 * @param {*} req
 */
export const login = async(_, req) => {

    const { email, password } = req;

    try {
        const user = await User.findOne({email});

        if (!user) {
            throw new Error('Unauthorized access! contact admin');
        }
        
        const isEqual = await bcrypt.compare(password, user.password);

        if (!isEqual){
            throw new Error('Invalid credentials');
        }

        const token = jwt.sign(
            {
                userId: user.id,
                email: user.email
            },
            process.env.SECRET_KEY,
            {
                expiresIn: 60 * 60
            }
        );

        return { token, message: 'Login Successfull!', status: 'success'}
        // return { userId: user.id, token: token, tokenExpiry: 1}
    } catch (error) {
        throw new Error(error);
    }
}

/**
 * @desc  returns all users in our app
 */
export const getUsers = async() => {
    try {
        const users = await Users.find();
        return users;
    } catch (error) {
        throw new Error(error)
    }
}