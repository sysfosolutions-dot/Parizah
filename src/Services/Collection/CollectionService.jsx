// service.js
import { useApiHelper } from '../../Utils/Helper/Api_Helper';
import { useToast } from "../../Context/Tostify/index";

export const CollectionService = () => {
    const { post, loading } = useApiHelper();
    const { showToast } = useToast();

    const UseFetchCollection_Product = async (payload) =>{
        try {
            return await post(`${import.meta.env.VITE_PUBLIC_NEW_PRODUCT}/FetchProductsPagination`, payload);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            showToast(error, "error");
        }

    }

    return {
        UseFetchCollection_Product,
        loading,
    };
};
