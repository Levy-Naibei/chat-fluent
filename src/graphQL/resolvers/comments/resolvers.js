import Post from '../../../models/Posts';
import { checkAuth } from '../../../../utils/check-auth';
import { UserInputError, AuthenticationError } from 'apollo-server-errors';

export const addComment = async(_, req, context) => {
    const {postId, body } = req;
    const { username } = checkAuth(context);
    try {
        // ensure empty comment is not submitted
        if (body.trim() === '') {
            throw new UserInputError('Comment empty',
            { 
                errors: {
                    body: 'Comment body cant be empty'
                }
            })
        }

        // check if post exists
        const post = await Post.findById(postId);

        // add comment -- to the top
        if (post) {
            post.comments.unshift(
                {
                    body,
                    username: username,
                    createdAt: new Date().toLocaleString()
                }
            )
            await post.save();
            return post;
        } else {
            throw new UserInputError('Post not found!');
        }
    } catch (error) {
        throw new Error(error);
    }
}

export const removeComment = async(_, req, context) => {
    const { postId, commentId } = req;
    const { username } = checkAuth(context);
    try {
        // check if post exists
        const post = await Post.findById(postId);
        if (post) {
            // locate the comment in the comments array by its index
            const index = post.comments.findIndex((i) => i.id === commentId);    // why id not _id ?
            if (post.comments[index].username === username) {
                // delete/remove the comment
                post.comments.splice(index, 1);
                await post.save();
                return post;
                // return { messege: "Comment deleted successfully!" }
            } else {
                throw new AuthenticationError('You are not Authorized to delete')
            }
        } else {
            throw new UserInputError('Post Not found!')
        }
    } catch (error) {
        throw new Error(error);
    }
}

/**
 * @desc    fetches all comments
 * 
 */
export const getComments = async() => {

}

/**
 * @desc    fetches a single comment given an ID
 */
 export const getComment = async() => {
    
}