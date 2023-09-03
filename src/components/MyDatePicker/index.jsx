import '../../../node_modules/@amir04lm26/react-modern-calendar-date-picker/lib/DatePicker.css';
import { useState, useEffect } from 'react';
import { Calendar, utils } from '@amir04lm26/react-modern-calendar-date-picker';

export default function MyDatePicker({ bookings}) {

    const [selectedDayRange, setSelectedDayRange] = useState({
        from: null,
        to: null
    });

    console.log(selectedDayRange);

    const [disabledDays, setDisabledDays] = useState([]);

    useEffect(() => {
        if (bookings && bookings.length > 0) {
            const disabledDates = bookings.map((booking) => {
                const dateFrom = new Date(booking.dateFrom);
                const dateTo = new Date(booking.dateTo);
                const dateRange = [];
                let currentDate = dateFrom;

                while (currentDate <= dateTo) {
                    dateRange.push({
                        year: currentDate.getFullYear(),
                        month: currentDate.getMonth() + 1,
                        day: currentDate.getDate(),
                    });

                    currentDate.setDate(currentDate.getDate() + 1);
                }

                return dateRange;
            }).flat();

            setDisabledDays(disabledDates);
        }
    }, [bookings]);

    return (
        <Calendar
            value={selectedDayRange}
            onChange={setSelectedDayRange}
            inputPlaceholder='Select a day'
            shouldHighlightWeekends
            minimumDate={utils().getToday()}
            disabledDays={disabledDays}
            colorPrimary="#335F33"
        />
    );
}