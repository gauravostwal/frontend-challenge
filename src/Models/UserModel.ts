import { BaseModel } from './BaseModel';
export interface IUserModelPropsApi {
    user: {
        customer_id: string;
        name: string;
        email: string;
        address_1: string;
        address_2: string;
        city: string;
        region: string;
        postal_code: string;
        shipping_region_id: string;
        day_phone: string;
        eve_phone: string;
        mob_phone: string;
    };
    accessToken: string;
    expiresIn: string;
}

export interface IUserModelProps extends IUserModelPropsApi {
    id: string;
    name: string;
    email: string;
    address_1: string;
    address_2: string;
    city: string;
    region: string;
    postal_code: string;
    shipping_region_id: string;
    day_phone: string;
    eve_phone: string;
    mob_phone: string;
    country?: string;
    credit_card?: number;
    
}

export class UserModel extends BaseModel<IUserModelProps> {
    static resource = 'user';
    constructor(props: IUserModelProps) {
        super(props);
    }
}
