import postResolver from './posts';
import authResolver from './users';
import commentsResolvers from './comments'
import { merge } from 'lodash';

/**
 * @desc  creates root reslover by combining child resolvers
 */
const rootResolver = merge(postResolver, authResolver, commentsResolvers);
export default rootResolver;