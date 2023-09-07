import { useState, useEffect } from "react";

export default function useBookvenue(url, ){
    const [reservation, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const options = {
        method: "POST",
        body: {
            dateFrom: dateFrom,
            dateTo: dateTo,
            guests: guests,
            venueId: id
        }
    }

    setData(options);

    useEffect(() => {
        async function bookVenue(){
            try {
                setIsLoading(true);
                const response = await fetch(url, options);
                const json = await response.json(response);
                setData(json);
            } catch(error) {
                console.log(error);
            }
        }
        bookVenue();
    }, [url])
    return { reservation };
}