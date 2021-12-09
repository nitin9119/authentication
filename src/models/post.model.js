const {Schema,model} = require("mongoose");

// Comment Mongoose => Post and comment are one to many relationship
const postSchema = new Schema(
  {
    title:{type: String,required: true},
    body:{type: String,required: true},
    user:{
      type: Schema.Types.ObjectId,
      ref:"user",
      required: true
    },
    //imageUrls:[{type: String,required: true}]
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = model("post", postSchema); // product collection
