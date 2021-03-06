import postResolver from './posts/reslovers';
import authResolver from './users';
import { merge } from 'lodash';

/**
 * @desc  creates root reslover by combining child resolvers
 */
const rootResolver = merge(postResolver, authResolver)
export default rootResolver;