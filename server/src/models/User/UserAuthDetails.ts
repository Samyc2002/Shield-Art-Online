import { Document, model, Model, Schema } from 'mongoose';
import * as crypto from 'crypto';

interface IUserDetail {
  name: string;
  // avatar: string;
  email: string;
  // phone: number;
  hash: string;
  salt: string;
  created_at: string;
  updated_at: string;
  isActive: boolean;
}
export type UserDetailDocument = IUserDetail & Document;

const UserDetailSchema: Schema<UserDetailDocument> = new Schema({
  name: { type: String, required: false, default: '' },
  // avatar: { type: String, required: false },
  email: { type: String, required: false, default: '' },
  // phone: { type: Number, required: false, default: 0 },
  hash: String,
  salt: String,
  created_at: {
    type: String,
    required: false,
    default: new Date().toISOString()
  },
  updated_at: {
    type: String,
    required: true,
    default: new Date().toISOString()
  },
  isActive: { type: Boolean, required: false, default: false }
});

const UserDetail: Model<UserDetailDocument> = model(
  'UserDetail',
  UserDetailSchema
);
export default UserDetail;
