import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './index.css'
import App from './App.jsx'
import AccountProvider from './Context/Account/AccountProvider.jsx';
import { ToastProvider } from './Context/Tostify/index.jsx';
import Products_Provider from './Context/Products/ProductsProvider.jsx';
import ShoppingCart_Provider from './Context/Shopping_Cart/Shopping_CartProvider.jsx';
import Collection_Provider from './Context/Collection/Collection_Provider.jsx';
import { SweetAlertProvider } from './Context/SweetAlert/index.jsx';

createRoot(document.getElementById('root')).render(

    <SweetAlertProvider>
        <ToastProvider>
            <AccountProvider> 
                <Collection_Provider>
                    <ShoppingCart_Provider>
                        <Products_Provider>
                          <App />
                        </Products_Provider>
                    </ShoppingCart_Provider> 
                  </Collection_Provider>
            </AccountProvider>
        </ToastProvider>
     </SweetAlertProvider>

)
