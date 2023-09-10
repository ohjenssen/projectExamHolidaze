import { useState, useEffect } from "react";

export default function useGetProfile(url){
    const [profile, setProfile] = useState([]);

    const options = {
        method: "GET",
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": `Bearer ${JSON.parse(localStorage.getItem('accessToken'))}`,
        }
    }

    useEffect(() => {
        async function getProfile(){
            try {
                const response = await fetch(url, options);
                const json = await response.json(response);
                setProfile(json);
            } catch(error) {
                console.log(error);
            }
        }
        getProfile();
    }, [url])
    return { profile };
}