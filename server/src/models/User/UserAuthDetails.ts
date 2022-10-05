import { Document, model, Model, Schema } from 'mongoose';

interface Stats {
  health: number;
  attack: number;
  defense: number;
  speed: number;
  regeneration: number;
  abilities: string[];
}

const UserStats = {
  health: Number,
  attack: Number,
  defense: Number,
  speed: Number,
  regeneration: Number,
  abilities: [String]
};

const deafultStats = {
  health: 100,
  attack: 10,
  defense: 100,
  speed: 10,
  regeneration: 10,
  abilities: []
};

interface IUserDetail {
  name: string;
  // avatar: string;
  email: string;
  // phone: number;
  hash: string;
  salt: string;
  level: Number;
  created_at: string;
  updated_at: string;
  isActive: boolean;
  stats: Stats;
  jobs: string[];
  weapon: string;
  inventory: string[];
}
export type UserDetailDocument = IUserDetail & Document;

const UserDetailSchema: Schema<UserDetailDocument> = new Schema({
  name: { type: String, required: false, default: '' },
  // avatar: { type: String, required: false },
  email: { type: String, required: false, default: '' },
  // phone: { type: Number, required: false, default: 0 },
  hash: String,
  salt: String,
  level: { type: Number, required: false, default: 0 },
  stats: { type: UserStats, required: false, default: deafultStats },
  jobs: { type: [String], required: false, default: [] },
  weapon: { type: String, required: false, default: '' },
  inventory: { type: [String], required: false, default: [] },
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
