import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  fileUrl: { type: String, required: true },
  thumbUrl: { type: String, required: true },
  title: { type: String, required: true, trim: true, maxLength: 80 },
  description: { type: String, required: true, trim: true },
  createdAt: { type: Date, default: Date.now, required: true },
  hashtags: [{ type: String, required: true, trim: true }],
  meta: {
    views: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
  },
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  comment: [
    { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Comment" },
  ],
});

videoSchema.static("formatHashtags", function (hashtags) {
  return hashtags
    .split(",")
    .map((word) => (word.startsWith("#") ? word : `#${word}`));
});

// videoSchema.pre("save", async function () {
//   this.hashtags = this.hashtags[0]
//     .split(",")
//     .map((word) => (word.startsWith("#") ? word : `#${word}`));
//   console.log(this);
// });

const Video = mongoose.model("Video", videoSchema);
export default Video;
