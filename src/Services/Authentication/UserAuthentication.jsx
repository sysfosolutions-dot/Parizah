// service.js
import { useApiHelper } from '../../Utils/Helper/Api_Helper';
import { useToast } from "../../Context/Tostify/index";

export const UserAuthentication = () => {
    const { post, get, loading } = useApiHelper();
    const { showToast } = useToast();

    const user_Login = async (payload) => {
        try {
            return await post(`${import.meta.env.VITE_PUBLIC_API_URL}/ExecuteProcedure`, payload);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            throw error;
        }
    };

    const user_CreateReview = async (payload) => {
        try {
            return await post(`${import.meta.env.VITE_PUBLIC_NEW_PRODUCT}/PostReview`, payload);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            throw error;
        }
    };
    const User_Registration = async (payload) => {
        try {
            return await post(`${import.meta.env.VITE_PUBLIC_USER_REG}/Register`, payload);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            throw error;
        }
    };
    
    const ChceckPinCode = async (payload) => {
        try {
            return await get(`${import.meta.env.VITE_PUBLIC_PINCODECHECK}/${payload}`);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            throw error;
        }
    };
    const GenerateOTP_Code = async (payload) => {
        try {
            return await post(`${import.meta.env.VITE_PUBLIC_API_URL}/ExecuteProcedure`, payload);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            throw error;
        }
    };

    const User_sendresetLink = async (payload) => {
        try {
            return await post(`${import.meta.env.VITE_PUBLIC_USER_REG}/SendPasswordResetLink`, payload);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            throw error;
        }
    };

    const FetchUser_Address = async (payload) => {
        try {
            return await post(`${import.meta.env.VITE_PUBLIC_API_URL}/ExecuteProcedure`, payload);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            throw error;
        }
    };

    const Addto_WishList = async (payload) => {
        try {
            return await post(`${import.meta.env.VITE_PUBLIC_NEW_PRODUCT}/ExecuteProcedure`, payload);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            throw error;
        }
    };

        const user_common_api = async (payload) =>{
        try {
            return await post(`${import.meta.env.VITE_PUBLIC_NEW_PRODUCT}/ExecuteProcedure`, payload);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            showToast(error, "error");
        }
    }

    const PlaceOrderApi = async (payload) => {
        try {
            return await post(`${import.meta.env.VITE_PUBLIC_NEW_PRODUCT}/PlaceEPINOrder`, payload);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            throw error;
        }
    };


    
    return {
        user_Login,
        User_Registration,
        GenerateOTP_Code,
        User_sendresetLink,
        ChceckPinCode,
        FetchUser_Address,
        user_CreateReview,
        Addto_WishList,
        PlaceOrderApi,
        user_common_api,
        loading,
    };
};
