const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "name must have at least 3 characters"],
      trim: true,
      min: 3,
    },

    post: {
      type: String,
      required: [true, "name must have at least 3 characters"],
      trim: true,
    },

    category: {
      type: [String],
      default: ["Discovery"],
      trim: true,
      required: [true, "name must have at least 3 characters"],
    },

    // outside link

    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],

    postPicture: {
      type: String,
      // default:"/upload/example" // no default
    },

    // coming from view
    views: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "View",
      },
    ],
    // who will create
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Like",
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // timestamp: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

// postSchema.index({ user: 1, post: 1 }, { index: true });

module.exports = mongoose.model("Post", postSchema);
