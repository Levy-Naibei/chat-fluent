import { addComment, removeComment, getComment, getComments, likePost } from './resolvers'

/**
 * @desc    combines comments mutations and querys
 */

const commentsResolvers = {
    Mutation: { addComment, removeComment, likePost },
    Query: { getComments, getComment }
}

export default commentsResolvers;