import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    NAME: {
      type: String,
      required: true,
    },
    EMAIL: {
      type: String,
      unique: true,
      required: true,
    },
    PASSWORD: {
      type: String,
      required: true,
    },
    HOME: {
      address: {
        type: String,
        default: undefined,
        required: true,
      },
      lat: {
        type: Number,
        required: true,
        default: null,
      },
      lan: {
        type: Number,
        required: true,
        default: null,
      },
    },
    FAVORITE: {
      address: {
        type: String,
        default: undefined,
      },
      lat: {
        type: Number,
        default: null,
      },
      lan: {
        type: Number,
        default: null,
      },
    },

    id: "number",
  },
  {
    timestamps: true,
  }
);

UserSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model("User", UserSchema);
