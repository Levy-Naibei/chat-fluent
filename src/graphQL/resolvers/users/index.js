import { login, signup, getUsers, getUser, deleteUser } from './resolvers';

/**
 * @desc   combines and returns auth resolver mutations and querys
 */
 const authResolvers = {
     Mutation: { login, signup, deleteUser },
     Query: { getUsers, getUser }
 };

 export default authResolvers;