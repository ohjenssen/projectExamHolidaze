import { useState, useEffect } from "react";

export default function useGetBookingsByProfile(url, options){
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

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