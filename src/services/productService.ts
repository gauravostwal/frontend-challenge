import { get } from '../utilities/HTTP';
import { IProductModelApiProps, ProductModel } from '../Models/ProductModel';
import { setLoading, setSuccess } from '../actions/loadingActions';

export async function getProducts(departmentId, categoryId) {
    try {
        let data;
        if (!departmentId && !categoryId){
            data = await get<IProductModelApiProps>('/products');
        } else if (departmentId) {
            data = await get<IProductModelApiProps>(`/products/inDepartment/${parseInt(departmentId)}`);
        } else if (categoryId) {
            data = await get<IProductModelApiProps>(`/products/inCategory/${categoryId}`);
        }
      const productArray = data.data.rows.map((product, index) => (
        new ProductModel({id: product.product_id.toString(), 
            discounted_price: parseFloat(product.discounted_price) ,
            price: parseFloat(product.price),
            description: product.description,
            name: product.name,
            thumbnail: product.thumbnail})
      ));
      ProductModel.saveAll(productArray);
      setSuccess('product');
      return data;
    } catch (error) {
        throw error;
    }
}
