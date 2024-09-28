// src/users/user.interface.ts
import { Document } from 'mongoose';

export interface User extends Document {
  email: string;
  name: string; // Added name field
  password: string;
}
