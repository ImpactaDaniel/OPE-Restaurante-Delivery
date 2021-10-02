import { Order } from "./order";

export class Deliveryman {
    name: string;
    lastName: string;
    statusDescription: string;
    status: Boolean;
    username: string;
    email: string;
    password: string;
    current_password: string;
    new_password: string;
    new_password_confirm: string;
    cellphone: string;
    role: Role;
    orders: Order[];
    last_seen: string;
}

export class Role {
    name: string;
}