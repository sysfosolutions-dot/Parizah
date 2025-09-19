// service.js
import { useApiHelper } from '../../Utils/Helper/Api_Helper';
import { useToast } from "../../Context/Tostify/index";

export const Product_Service = () => {
    const { post, loading } = useApiHelper();
    const { showToast } = useToast();


    const UseFetchProduct_Details = async (payload) =>{
        try {
            return await post(`${import.meta.env.VITE_PUBLIC_NEW_PRODUCT}/FetchProductDetails`, payload);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            showToast(error, "error");
        }
    }

    const UseAddTo_Cart = async (payload) =>{
        try {
            return await post(`${import.meta.env.VITE_PUBLIC_NEW_PRODUCT}/AddToCart`, payload);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            showToast(error, "error");
        }
    }

    const UseDeleteProduct_Cart = async (payload) =>{
        try {
            return await post(`${import.meta.env.VITE_PUBLIC_NEW_PRODUCT}/DeleteItemFromCart`, payload);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            showToast(error, "error");
        }
    }
    
    const UseFetchCart_Details = async (payload) =>{
        try {
            return await post(`${import.meta.env.VITE_PUBLIC_NEW_PRODUCT}/FetchCart`, payload);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            showToast(error, "error");
        }
    }

    const UseUpdate_Cart = async (payload) =>{
        try {
            return await post(`${import.meta.env.VITE_PUBLIC_NEW_PRODUCT}/ExecuteProcedure`, payload);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            showToast(error, "error");
        }
    }

    const Custom_api_call = async (payload) =>{
        try {
            return await post(`${import.meta.env.VITE_PUBLIC_NEW_PRODUCT}/ExecuteProcedure`, payload);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            showToast(error, "error");
        }
    }



    return {
        UseAddTo_Cart,
        UseFetchCart_Details,
        UseFetchProduct_Details,
        UseDeleteProduct_Cart,
        UseUpdate_Cart,
        Custom_api_call,
        loading,
    };
};
