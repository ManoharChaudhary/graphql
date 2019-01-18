import React, { Component } from "react";

import Modal from "./../components/Modal/Modal";
import Backdrop from "./../components/Backdrop/Backdrop";
import "./Event.css";
class EventsPage extends Component {
  state = {
    creating: false,
  };
  createEventHandler = props => {
    this.setState({ creating: true });
  };
  modalConfirmHandler = () => {
   // this.setState({creating: false});
  }
  modalCancelHandler = () => {
    this.setState({creating: false});
  }
  render() {
    return (
      <React.Fragment>
        {this.state.creating && <Backdrop />}
        {this.state.creating && (
          <Modal title="Add Event" canCancel="true" canConfirm="true"  onCancel={ this.modalCancelHandler} onConfirm={this.modalConfirmHandler}>
            <p>Modal Content</p>
          </Modal>
        )}
        <div className="event-control">
          <p>Share your own events!</p>
          <button className="btn" onClick={this.createEventHandler}>
            Create Event
          </button>
        </div>
      </React.Fragment>
    );
  }
}
export default EventsPage;
