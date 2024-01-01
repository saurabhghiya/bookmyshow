import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
import { message, Row, Col } from "antd";
import { GetBookingsOfUser } from "../../apicalls/bookings";
import moment from "moment";

function Bookings() {
  const [bookings = [], setBookings] = useState([]);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetBookingsOfUser();
      
      if (response.success) {
        //filter bookings by valid shows
        let filteredBookings = response.data.filter((b,i) => b.show);
        setBookings(filteredBookings);
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if(bookings.length === 0){
    return (
      <p className="text-lg text-center">You have no bookings</p>
    )
  }

  return (
    <div>
      <Row gutter={[24, 24]}>
        {bookings.map((booking) => ( 
          <>
            <Col span={12}>
              <div className="p-2 flex justify-between uppercase gap-3 br-10" style={{ backgroundColor: "rgb(0,0,0,0.03)", boxShadow: "0 4px 10px 0 rgba(0, 0, 0, 0.15)" }}>
                <div>
                  <h1 className="text-xl">
                    {booking.show.movie.title} ({booking.show.movie.language})
                  </h1>
                  <div className="divider"></div>
                  <h1 className="text-sm">
                    {booking.show.theatre.name} ({booking.show.theatre.address})
                  </h1>
                  <h1 className="text-sm">
                    Date & Time: {moment(booking.show.date).format("Do MMM YYYY")}{" "}
                    - {moment(booking.show.time, "HH:mm").format("hh:mm A")}
                  </h1>

                  <h1 className="text-sm">
                    Amount : ₹ {booking.show.ticketPrice * booking.seats.length}
                  </h1>
                  <h1 className="text-sm">Booking ID: {booking._id}</h1>
                </div>

                <div>
                  <img
                    src={booking.show.movie.poster}
                    alt=""
                    width={150}
                    className="br-1"
                  />
                  <h1 className="text-sm">Seats: {booking.seats.join(", ")}</h1>
                </div>
              </div>
            </Col>
          </>
        ))}
      </Row>
    </div>
  );
}

export default Bookings;