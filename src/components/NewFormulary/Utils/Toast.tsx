import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function showMessage(message: any, messageType: any){
    toast(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        type: messageType
    });
}