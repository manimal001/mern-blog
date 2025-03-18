import mongoose from "mongoose";


const postSchema = new mongoose.Schema(
    {
       userId: {
         type: String,
          required: true,
       },
       content: {
         type: String,
          required: true,
       },
       title:{
         type: String,
          required: true,
          unique: true,
       },
       Image: {
           type: String,
           default: "https://plus.unsplash.com/premium_photo-1720744786849-a7412d24ffbf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmxvZ3xlbnwwfHwwfHx8MA%3D%3D",

        },
        category : {
            type: String,
            default: 'Uncategorized',
        },
        slug: {
            type: String,
            required: true,
            unique: true,
        },
     }, {timestamps: true}
);

const Post = mongoose.model('Post', postSchema);

export default Post;