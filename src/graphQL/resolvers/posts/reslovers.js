import Post from '../../../models/Posts'

export const getPosts = async() => {
    try {
        const posts = await Post.find();
        if (posts) {
            return posts;
        } else {
            throw new Error('No posts found!')
        }
    } catch (error) {
        throw new Error(error);
    }
}