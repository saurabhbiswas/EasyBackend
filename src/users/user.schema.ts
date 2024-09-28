// src/users/user.schema.ts
import { Schema } from 'mongoose';

export const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true }, // Added name field
  password: { type: String, required: true },
});
