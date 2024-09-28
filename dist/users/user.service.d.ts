import { Model } from 'mongoose';
import { User } from './user.interface';
export declare class UserService {
    private userModel;
    constructor(userModel: Model<User>);
    createUser(email: string, name: string, password: string): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
}
