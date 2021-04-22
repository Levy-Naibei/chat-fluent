import { getPosts, getPost, createPost, deletePost } from './resolvers'

/**
 * @desc    combines and returns post resolver querys and mutations
 */
const postResolver = {
    Query: { getPost, getPosts },
    Mutation: { createPost, deletePost },
    Post: {
        countOfLikes: (parent) => parent.likes.length,
        countOfComments: (parent) => parent.comments.length
    }
};

export default postResolver;