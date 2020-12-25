import Post from '../../../models/Posts'

export const getPosts = async() => {
    try {
        const posts = await Post.find();
        return posts;
    } catch (error) {
        throw new Error(error);
    }
}