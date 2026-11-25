import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "The name is required"],
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, "The email is required"]
    },
    password: {
      type: String,
      required: [true, "The password is required"],
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
      required: true
    },
    projectName: {
        type: String,
        default: "webhookpi"
    }
  },
  {
    timestamps: true,
  }
);

UserSchema.index(
  { email: 1 },
  {
    unique: true,
    partialFilterExpression: { email: { $type: "string" } },
  }
);

const User =
  mongoose.models.User || mongoose.model("User", UserSchema);

export default User;