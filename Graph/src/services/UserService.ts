import { Service } from 'typedi';
import { User } from '../entities';

@Service()
export class UserService {
    getUsers() {
        return User.find();
    }
}
