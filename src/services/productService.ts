import { get, post } from '../utilities/HTTP';
import { IProductModelApiProps, ProductModel } from '../Models/ProductModel';
import { setLoading, setSuccess } from '../actions/loadingActions';
import { saveProductAttributes, saveProductReviews, saveShoppingCartProductList, saveShippingRegions, saveShippingDetails } from '../actions/productsActions';
import { marshalAddProductsToCart } from '../utilities/generalUtils';
import { getUniqueCardKey } from './loginService';
import { getCustomerDetails } from './customerService';

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
        getReviews(id);
        getShoppingCartList(id);
        const regions = getCountries();
        getCustomerDetails(regions);
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

export async function submitReviewForm(values, id) {
    try {
        const data = await post(`/products/${id}/reviews`, { review: values.review, rating: values.rating });
        getReviews(id);
        setSuccess('product-details');
        return;
    } catch (error) {
        throw error;
    }
}

export async function addProductsToCart(cart_id, product_id, values) {
        try {
            const attributes = marshalAddProductsToCart(values);
            await post(`shoppingcart/add`, 
            { 
                cart_id: cart_id.cart_id, 
                product_id: parseInt(product_id), 
                attributes 
            });
            getShoppingCartList(product_id);
            return;
        } catch (error) {    
            throw error;
        }
}

export async function getShoppingCartList(product_id) {
    try {
        const { cart_id } = getUniqueCardKey()
        const { data } = await get(`/shoppingcart/${cart_id}`);
        
        saveShoppingCartProductList(data);
        return;
    } catch (error) {

    }
}

export async function getCountries() {
    try {
        const { data } = await get(`/shipping/regions`);
        saveShippingRegions(data);
        return data;
    } catch(error) {

    }
}

export async function getShippingDetails(id) {
    try {
        const { data } = await get(`/shipping/regions/${id}`);
        saveShippingDetails(data);
        return;
    } catch (error) {

    }
}