import { put } from "../utilities/HTTP";

export async function addTheDeliveryAddress(values) {
        try {
            console.log(values);
            // const { data } = await put(`customers/address`, {
            //     address_1 : values.address_1,
            //     city: values.city,
            //     reqion: values.region,
            //     postal_code: values.postal_code,
            //     country: values.country,
            //     shipping_region_id: values.shipping_region_id
            // });
            return;
        } catch (error) {
            throw error;
        }
}