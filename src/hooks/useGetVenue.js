import { useState, useEffect } from "react";
import { constants } from "../js/constants";


export default function useGetVenues(){
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const profileName = JSON.parse(localStorage.getItem('profileName'));
    const url = `${constants.BASE_URL + constants.PROFILES}/${profileName}/venues?_bookings=true`;

    const options = {
        method: "GET",
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": `Bearer ${JSON.parse(localStorage.getItem('accessToken'))}`,
        }
    }

    useEffect(() => {
        async function getData(){
            try{
                setIsLoading(true);
                const response = await fetch(url, options);
                const json = await response.json(response);
                setData(json);
            } catch(error){
                console.log(error);
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        }
        getData();
    }, [url])
    return { data, isLoading, isError };
}