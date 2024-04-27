import { Schema, model } from "mongoose";
import { hash, compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

const UserSchema = new Schema(
  {
    avatar: { type: String, default: "" },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    verified: { type: Boolean, default: false },
    verificationcode: { type: String, require: false },
    admin: { type: Boolean, default: false },
    member: { type: Boolean, default: false },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await hash(this.password, 10);
    return next();
  }
  return next();
});

UserSchema.methods.generateJWT = async function () {
  return await sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

UserSchema.methods.comparePassword = async function (enteredPassword) {
  try {
    return await compare(enteredPassword, this.password);
  } catch (error) {
    throw new Error("Error comparing passwords");
  }
};


const User = model("User", UserSchema);
export default User;
