import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const jwtData = async ()=>{
    const token=Cookies.get('authToken');
    const data = jwtDecode(token);
    console.log(data);
}

export default jwtData