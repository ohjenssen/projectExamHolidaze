import UserVenueCards from '../VenueCards/UserVenueCards';
import useGetVenues from '../../hooks/useGetVenue';

export default function MyVenues(){

    const { data, isLoading, isError } = useGetVenues();

    return (
        <>
            {data && 
                data.map((venue) => (
                    <UserVenueCards venue={venue}/>
            ))}
        </>
    )
}