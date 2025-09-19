// service.js
import { useApiHelper } from '../../Utils/Helper/Api_Helper';
import { useToast } from "../../Context/Tostify/index";

export const BlogsServie = () => {
    const { post, loading } = useApiHelper();
    const { showToast } = useToast();

    const UseBlogAPi_call = async (payload) =>{
        try {
            return await post(`${import.meta.env.VITE_PUBLIC_NEW_PRODUCT}/ExecuteProcedure`, payload);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            showToast(error, "error");
        }

    }

    return {
        UseBlogAPi_call,
        loading,
    };
};
