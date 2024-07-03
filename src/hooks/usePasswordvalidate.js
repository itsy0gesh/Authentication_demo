import { useEffect, useState } from "react"


export const usePasswordvalidate = ({ password ,confirmpass, length="8" ,email})=>{
    const [validLength,setValidLength] = useState(null);
    const [hasNumber,setNumber] = useState(null);
    const [uppercase,setUppercase] = useState(null);
    const [lowercase,setLowercase] = useState(null);
    const [hasSpecial,setSpecial] =useState(null);
    const [validemail,setEmail] = useState(null);
    const [confirm,setConfirm] = useState(null);

    useEffect(()=>{
        setValidLength(password.length >= length ? true:false);
        setUppercase (password.toLowerCase() !== password);
        setLowercase(password.toUpperCase()!==password);
        setNumber(/\d/.test(password));
        setSpecial(/[`!@#$%^&*()_+\-=\]{};':"\\|,.<>?~]/.test(password));
        setEmail(/^[a-zA-Z0-9.]+@gmail\.com$/.test(email.toLowerCase()));
        setConfirm(password ? confirmpass === password : false);
        
    },[password,length,email,confirmpass]);
    return [validLength,hasNumber,uppercase,lowercase,hasSpecial,validemail, confirm];
}

