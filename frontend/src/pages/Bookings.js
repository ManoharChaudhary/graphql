import React, { Component } from "react";

import Spinner from "../components/Spinner/Spinner";
import AuthContext from "../context/auth-context";
import BookingList from "../components/Bookings/BookingList";
import BookingCharts from "../components/Bookings/BookingCharts";
import BookingControl from "../components/Bookings/BookingControls";

class BookingsPage extends Component {
  state = {
    isLoading: false,
    bookings: [],
    type: 'list'
  };

  static contextType = AuthContext;

  componentDidMount() {
    this.fetchBookings();
  }
  deleteBookingHandler = bookingId => {
    this.setState({ isLoading: true });
    const requestBody = {
      query: `
          mutation CancelBooking($id: ID!) {
            cancelBooking(bookingId: $id) {
              _id
              title
            }
          }
        `,
      variables: {
        id: bookingId
      }
    };

    fetch("http://localhost:8000/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.context.token,
      },
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed!");
        }
        return res.json();
      })
      .then(resData => {
        this.setState( prevState => {
          const updatedBookings = prevState.bookings.filter( booking =>  booking._id !== bookingId);
         return {  bookings: updatedBookings, isLoading: false }
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({ isLoading: false });
      });
  }
  fetchBookings = () => {
    this.setState({ isLoading: true });
    const requestBody = {
      query: `
          query {
            bookings {
              _id
             createdAt
             event {
               _id
               title
               date,
               price
             }
            }
          }
        `,
    };

    fetch("http://localhost:8000/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.context.token,
      },
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed!");
        }
        return res.json();
      })
      .then(resData => {
        const bookings = resData.data.bookings;
        this.setState({ bookings: bookings, isLoading: false });
      })
      .catch(err => {
        console.log(err);
        this.setState({ isLoading: false });
      });
  };
  tabChangeHandler = type => {
      if(type === 'list') {
        this.setState( {
          type: 'list'
        })
      } else {
        this.setState( {
          type: 'chart'
        })
      }
  }
  render() {
    let content = <Spinner />
    if (!this.state.isLoading) {
      content = (
        <React.Fragment>
          <BookingControl activeTab={this.state.type} onChange ={this.tabChangeHandler}/>
          <div>
            {this.state.type === 'list' ? <BookingList bookings={this.state.bookings} onDelete={this.deleteBookingHandler} /> : <BookingCharts bookings={this.state.bookings}/>
            }
          </div>
        </React.Fragment>
      )
    }
    return (
      <React.Fragment>
        {content}
      </React.Fragment>
    );
  }
}

export default BookingsPage;

