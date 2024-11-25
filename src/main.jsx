
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import { CartProvider } from './pages/cartprovider.jsx';
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')).render(

  <CartProvider>
  <App />
  <Toaster position='top-right'/>
  </CartProvider>

)
