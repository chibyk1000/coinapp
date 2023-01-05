
import axios from 'axios'
import { useState, useEffect } from 'react'
import ActionBtns from "./ActionBtns";
import { BASE_URL } from "@env";
import { useSelector } from 'react-redux';
const CheckAuth = ({children}) => {
console.log(BASE_URL)
    const [loggedin, setLogin] = useState(false)
      const { user: data } = useSelector((state) => state.userSlice);
      const { login } = useSelector((state) => state.authSlice);
    useEffect(() => {
        axios
          .post(`${BASE_URL}/auth/checklogin`)
          .then((res) => {
            if (res.status === 200) {
              setLogin(true);
            }
          })
          .catch((err) => {
            setLogin(false);
          });    
    }, [data,login])
    
    if (!loggedin) {
        return <ActionBtns />;
    }
    
    return (
        <>
        {children}
        </>
    )
}


export default CheckAuth