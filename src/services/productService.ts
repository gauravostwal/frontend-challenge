import { get } from '../utilities/HTTP';
import { IProductModelApiProps, ProductModel } from '../Models/ProductModel';
import { setLoading, setSuccess } from '../actions/loadingActions';
import { saveProductAttributes, saveProductReviews } from '../actions/productsActions';

export async function getProducts(departmentId, categoryId) {
    try {
        ProductModel.deleteAll();
        let data;
        if (!departmentId && !categoryId){
            data = await get<IProductModelApiProps>('/products');
        } else if (departmentId) {
            data = await get<IProductModelApiProps>(`/products/inDepartment/${parseInt(departmentId)}`);
        } else if (categoryId) {
            data = await get<IProductModelApiProps>(`/products/inCategory/${categoryId}`);
        }
      const productArray = data.data.rows.map((product, index) => (
        new ProductModel({
            id: product.product_id.toString(), 
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

export async function getProductDetails(id) {
    try {
        ProductModel.deleteAll();
        const { data } = await get(`/products/${id}`);
        const { data: attributeList } = await get(`/attributes/inProduct/${id}`);
        // const { data: reviewsList } = await get(`/products/${id}/reviews`);
        // saveProductReviews(reviewsList);
        getReviews(id);
        saveProductAttributes(attributeList);
        new ProductModel({ 
            id: data.product_id.toString(), 
            discounted_price: parseFloat(data.discounted_price) ,
            price: parseFloat(data.price),
            description: data.description,
            name: data.name,
            thumbnail: data.thumbnail,
            image: data.image,
            image2: data.image_2
        }).$save();
        setSuccess('product-details');
        return data;
    } catch (error) {
        throw error;
    }
}

export async function getReviews(id) {
    try {
        const { data } = await get(`/products/${id}/reviews`);
        saveProductReviews(data);
        return;
    } catch (error) {

    }
}