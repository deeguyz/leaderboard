import { prop, getModelForClass } from "@typegoose/typegoose";
import { ObjectId } from "mongoose";

class User {
  @prop({ required: true })
  public email?: string;

  @prop({ required: true, select: false })
  public passwordHash?: string;

  @prop()
  public profilePicture?: string;

  @prop()
  public communityid?: string;

  @prop({ required: true, select: false, default: [] })
  public experiencePoints?: { points: number; timestamp: Date }[];
}

export const UserModel = getModelForClass(User);
