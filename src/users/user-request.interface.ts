import { Role } from 'src/users/users.entity'

export interface UserRequest {
    id: number;
    email: string;
    roles: Role[];
    order: number;
}