import { login, signup } from './resolvers';

/**
 * @desc   combines and returns auth resolver mutations
 */
 const authResolvers = {
     Mutation: { login, signup }
 };

 export default authResolvers;