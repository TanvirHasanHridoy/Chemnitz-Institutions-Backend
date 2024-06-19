import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema(
  {
    NAME: {
      type: String,
      required: true,
    },
    EMAIL: {
      type: String,
      unique: [true, "Email already exists"],
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
        default: null,
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

UserSchema.pre("save", async function (next) {
  if (!this.isModified("PASSWORD")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.PASSWORD = await bcrypt.hash(this.PASSWORD, salt);
  // console.log(this.PASSWORD);
  next();
});

UserSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.PASSWORD);
};

export default mongoose.model("User", UserSchema);
