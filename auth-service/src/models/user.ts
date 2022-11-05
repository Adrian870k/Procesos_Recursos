import { Schema, model } from "mongoose";
import * as bcryp from "bcrypt";
import { BadRequestError } from "@angelgoezg/common";
import jwt from "jsonwebtoken";

const tokenShema = new Schema({
  token: {
    type: String,
    trim: true,
  },
});

const UserSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    pwd: {
      type: String,
      trim: true,
    },
    userName: {
      type: String,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      trim: true,
      unique: true,
    },
    userType: {
      type: String,
      trim: true,
    },
    tokens: [tokenShema],
  },
  { timestamps: true }
);
UserSchema.methods.toJSON = function () {
  const user = this;
  const userObj = user.toObject();
  delete userObj.pwd;
  return userObj;
};

UserSchema.statics.findUserByCredentials = async (email, pwd) => {
  const user: any = await User.findOne({ email: email });
  console.log(user);
  if (!user) {
    throw new BadRequestError("Something happend :/");
  }

  const isPwdMatched = await bcryp.compare(pwd, user.pwd);

  if (!isPwdMatched) {
    throw new BadRequestError("Something happend :/");
  }

  return user;
};

UserSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, 'secret-encriptation-key');
  user.tokens = [...user.tokens, ...[{ token }]];
  await user.save();
  return token;
};

UserSchema.pre("save", async function (next) {
  // console.log(this);
  const user: any = this;
  if (user.isModified("pwd")) {
    user.pwd = await bcryp.hash(user.pwd, 10);
  }
  next;
});
const User: any = model("User", UserSchema);
export { User };
