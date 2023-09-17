import { useState, useEffect } from 'react';
import { constants } from '../js/constants';

export default function useGetBookingsByVenue(id){
    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const url = `${constants.BASE_URL + constants.VENUES}/${id}?_bookings=true`;

    const options = {
        method: "GET",
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": `Bearer ${JSON.parse(localStorage.getItem('accessToken'))}`,
        }
    }

    useEffect(() => {
        async function getData(){
            try {
                setIsLoading(true);
                const response = await fetch(url, options);
                const json = await response.json();
                setData(json.bookings);
                setIsLoading(false);
            } catch(error) {
                console.log(error);
                setIsError(true);
                setIsLoading(false);
            }
        }
        getData();
    }, [])
    return { data, isLoading, isError };
}