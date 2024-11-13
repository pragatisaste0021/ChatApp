import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import axios, { all } from 'axios'

const UseGetAllUsers = () => {

    const[allUsers, setAllUsers] = useState([]);
    const[loading, setLoading] = useState(false);

    useEffect(() => {
        const getUsers = async() => {
            setLoading(true);
           
            try{
                const token = Cookies.get("jwt");
                console.log(token);
                const response = await axios.get("/api/user/allusers",{
                    credentials: "include",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                console.log(response.data);
                setAllUsers(response.data);
                setLoading(false);
            }
            catch(error){

            }
        }
        getUsers();
    }, 
    [])
  return [allUsers, loading];
}

export default UseGetAllUsers
