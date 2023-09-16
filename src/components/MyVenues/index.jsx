import UserVenueCards from '../VenueCards/UserVenueCards';
import useGetVenues from '../../hooks/useGetVenue';

export default function MyVenues(){

    const { data, isLoading, isError } = useGetVenues();

    return (
        <>
            {isLoading && <p>Loading...</p>}
            {data && 
                data.map((venue) => (
                    <UserVenueCards key={venue.id} venue={venue}/>
            ))}
        </>
    )
}