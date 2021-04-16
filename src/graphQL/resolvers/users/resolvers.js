import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../../../models/User';
import { AuthenticationError, UserInputError } from 'apollo-server'
import { validSignup, validLogin } from '../../../../utils/validators'
import { checkAuth } from '../../../../utils/check-auth';

/**
 * @desc signup mutation that handles signing up users to our application
 * @param {*} req
 */
export const signup = async(_, req) => {
    const {username, email, password, confirmPassword} = req.registerInput;

    // validate inputs
    const {valid, errors} = validSignup(username, email, password, confirmPassword);
    if (!valid) {
        throw new UserInputError('Auth errors', {errors});
    }
    
    try {
        // check if user already exist
        const existingUser = await User.findOne({email});
        if (existingUser) {
            throw new UserInputError(
                'User already exist!',
                {
                    errors: {
                        userExistMessage: 'User already exist!'
                    }
                }
            );
        }
        // hash the password before saving to db
        const hashedPassword = bcrypt.hashSync(password, 12);
        // create user object
        const user = new User({
            username,
            email,
            password: hashedPassword,
            createdAt: new Date().toLocaleString()
        })
        // save new user
        // console.log(user);
        user.save();
        return { ...user._doc };
    } catch (error){
        // console.error(error);
        throw new Error(error);
    }
}

/**
 * @desc login mutation that handles logging into our application
 * @param {*} req
 */
export const login = async(_, req) => {
    const { email, password } = req;

    const {valid, errors} = validLogin(email, password);
    if (!valid) {
        throw new UserInputError('Auth errors', {errors});
    }

    try {
        const user = await User.findOne({email});
        if (!user) {
            throw new UserInputError(
                'Unauthorized access! contact admin',
                { 
                    errors: { 
                        illegalAccessMsg: 'Unauthorized access! contact admin'
                    }
                }
            );
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
        return {token, ...user._doc};
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
        const users = await User.find().sort({ createdAt: -1});
        if (users) {
            // console.log(users);
            return users;
        }
        else {
            throw new Error("No users!")
        }
    } catch (error) {
        console.log(error);
        throw new Error(error)
    }
}

/**
 * @desc  returns a single user in our app
 */
 export const getUser = async(_, {userId}) => {
    try {
        const user = await User.findById(userId);
        if (user) {
            // console.log(user);
            return user;
        }
        else {
            throw new Error("User does not exist!")
        }
    } catch (error) {
        console.log(error);
        throw new Error(error)
    }
}


/**
 * @desc    deletes user by id
 */
export const deleteUser = async(_, {userId}, context) => {
    // check if user is authenticated
    const user = checkAuth(context);

    try {
        //check in db if user exists then delete user
        const userDel = await User.findById(userId);
        // check if user is Admin
        if (user === isAdmin) {
            userDel.deleteOne();   
        } else {
            throw new AuthenticationError('Authorization Error!');
        }
    } catch (error) {
        throw new Error(error);
    }
}