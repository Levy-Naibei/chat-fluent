import mongoose from 'mongoose';
const { Schema } = mongoose; // or const Schema = mongoose.Schema

const PostSchema = new Schema({
    username: String,
    body: String,
    createdAt: String,
    comments: [
        {
            body: String,
            username: String,
            createdAt: String,
        }
    ],
    likes: [
        {
            username: String,
            createdAt: String
        }
    ],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
});

const Post = mongoose.model('Post', PostSchema);
export default Post;