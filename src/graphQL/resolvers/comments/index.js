import { addComment, removeComment, getComment, getComments } from './resolvers'

/**
 * @desc    combines comments mutations and querys
 */

const commentsResolvers = {
    Mutation: { addComment, removeComment },
    Query: { getComments, getComment }
}

export default commentsResolvers;