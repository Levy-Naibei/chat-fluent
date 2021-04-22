import Post from '../../../models/Posts';
import { checkAuth } from '../../../../utils/check-auth';
import { UserInputError, AuthenticationError } from 'apollo-server-errors';

/**
 * @desc        adds comment to the post given  post id
 * @param {*} req      passes the req body
 * @param {*} context  tracks logged in user
 */
export const addComment = async(_, req, context) => {
    const {postId, body } = req;
    // check if the user is authenticated
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

/**
 * @desc        adds a comment on comment
 * @param {*} req      passes the req body
 * @param {*} context  tracks logged in user
 */
//  export const AddCommentOnComment = async(_, req, context) => {
//     const {postId, commentId, body} = req;
//     const { username } = checkAuth(context);
//     try {
//         // ensure body of comment is not empty
//         if (body.trim() === '') {
//             throw new UserInputError('Empty comment body!', {
//                 errors: {
//                     body: "Body cant be empty!"
//                 }
//             })
//         }
//         // check if the post exist
//         const post = await Post.findById(postId);
//         if (post) {
//             // locate the comment in the comments array
//             const index = post.comments.findIndex(c => c.id === commentId);
//             if (post.comments[index].username === username) {
//                 post.comments.comment.unshift({
//                     username: username,
//                     body,
//                     createdAt: new Date().toLocaleString()
//                 })
//                 await post.save();
//                 return post;
//             } else {
//                 throw new AuthenticationError('You are not authorized!')
//             }
//         } else {
//             throw new UserInputError('Post Not found!')
//         }
//     } catch (error) {
//         throw new Error(error);
//     }
// }

/**
 * @desc        deletes a comment from the post given post id and comment id
 * @param {*} req      passes the req body
 * @param {*} context  tracks logged in user
 */
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
 */
export const getComments = async() => {

}

/**
 * @desc    fetches a single comment given an ID
 */
 export const getComment = async() => {
    
}

/**
 * @desc        likes and unlikes a post
 * @param {*} req      passes the req body
 * @param {*} context  tracks logged in user
 */
export const likePost = async(_, req, context) => {
    const {postId} = req
    const {username} = checkAuth(context)

    try {
        // ensure post id is provided
        if (postId.trim() === '') {
            throw new UserInputError('Post ID must be provided!', {
                errors: { postId: "Post ID cant be empty!"}
            });
        }

        // check if the post exist
        const post = await Post.findById(postId);
        if (post) {
            if (post.likes.find(like => like.username === username)) {
                // post liked, unlike it
                post.likes = post.likes.filter(like => like.username !== username);
            } else {
                // post not liked, like it
                post.likes.push({
                    username,
                    createdAt: new Date().toLocaleString()
                });
            }
        } else {
            throw new UserInputError('No post found!');
        }
        await post.save();
        return post;
    } catch (error) {
        throw new Error(error);
    }
}
