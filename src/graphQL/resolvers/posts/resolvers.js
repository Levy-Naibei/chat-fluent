import { AuthenticationError } from 'apollo-server-errors'
import Post from '../../../models/Posts'
import { checkAuth } from '../../../../utils/check-auth'
/**
 * fetches all posts available in db
 */
export const getPosts = async() => {
    try {
        const posts = await Post.find().sort({ createdAt: -1});
        if (!posts) {
            throw new Error('No posts found!');
        } else {
            // console.log(posts);
            return posts;
        }
    } catch (error) {
        throw new Error(error);
    }
}

/**
 * fetches a single post given id
 */
export const getPost = async(_, {postId}) => {
    try {
        const post = await Post.findById({_id: postId});
        if (post) {
            // console.log(post);
            return post;
        } else {
            throw new Error ('Post does not exist!')
        }
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

/**
 * creates a post
 */
export const createPost = async(_, { body }, context) => {
    const user = checkAuth(context);
    try {
        const post = new Post({
            body,
            username: user.username,
            user: user._id,
            createdAt: new Date().toLocaleString()
        });

        const newPost = await post.save();
        return { ...newPost._doc };
    } catch (error) {
        console.log(error)
        throw new Error(error);
    }
}

/**
 * @desc    deletes a given post 
 */
export const deletePost = async(_, {postId}, context) => {
    const user = checkAuth(context);
    try {
        const post = await Post.findById(postId);
        if (user.username === post.username) {
            await post.deleteOne();
        } else {
            throw new AuthenticationError('Authorization Error!');
        }
        return { message: "Post deleted successfully!"}; 
    } catch (error) {
        throw new Error(error);
    }
}