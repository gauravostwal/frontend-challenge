import { BaseModel } from './BaseModel';

export interface IProductModelCommonProps {
    name: string;
    description: string;
    thumbnail: string;
    image?: string;
    image2?: string;
}
export interface IProductModelApiProps extends IProductModelCommonProps {
    price: string;
    discounted_price: string;
    product_id: string;
}
export interface IProductModelProps extends IProductModelCommonProps {
    id: string;
    discounted_price: number;
    price: number;
}

export class ProductModel extends BaseModel<IProductModelProps> {
    static resource = 'product';
    constructor(props: IProductModelProps) {
        super(props);    
    }
}