// service.js
import { useApiHelper } from '../../Utils/Helper/Api_Helper';
import { useToast } from "../../Context/Tostify/index";

export const Common_Service = () => {
    const { post, loading } = useApiHelper();
    const { showToast } = useToast();

    const UseCommonService = async (payload) =>{
        try {
            return await post(`${import.meta.env.VITE_PUBLIC_ADMIN_API_URL}/ExecuteProcedure`, payload);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            showToast(error, "error");
        }

    }
    const UseFetchProductService = async (payload) =>{
        try {
            return await post(`${import.meta.env.VITE_PUBLIC_NEW_PRODUCT}/FetchProductsByType`, payload);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            showToast(error, "error");
        }
    }
    return {
        UseCommonService,
        UseFetchProductService,
        loading,
    };
};
