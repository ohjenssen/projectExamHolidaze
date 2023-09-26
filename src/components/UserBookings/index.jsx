import { constants } from "../../js/constants";
import useGetBookingsByProfile from "../../hooks/useGetBookingsByProfile";
import BookingCards from "../VenueCards/BookingCards";
import { Spinner } from "react-bootstrap";

export default function UserBookings(){
    const options = {
        method: "GET",
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": `Bearer ${JSON.parse(localStorage.getItem('accessToken'))}`,
        }
    }

    const profileName = JSON.parse(localStorage.getItem('profileName'));
    const url = `${constants.BASE_URL + constants.PROFILES}/${profileName}/bookings?_venue=true`;
    const { data, isLoading, isError } = useGetBookingsByProfile(url, options);

    return (
        <>
        {isLoading && <Spinner />}
        {isError && 'Uh oh, an error occured!'}
        {data.length > 0 ? 
            data.map((booking) => (
                <BookingCards 
                    key={booking.id}
                    id={booking.id}
                    from={booking.dateFrom} 
                    to={booking.dateTo}
                    guests={booking.guests}
                    venue={booking.venue}
                />
            )) 
            : <h3>You dont have any bookings yet.</h3>
        }
        </>
    )
}