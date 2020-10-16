import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default class EventDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event: {},
    };
  }

  deleteNote(id) {
    console.log(id);
    axios
      .delete(`http://localhost:4000/event/${id}`)
      .then((result) => {
        console.log(result);
        this.props.history.push("/events");
      })
      .catch((error) => {
        console.log("There is some error");
      });
  }

  componentDidMount() {
    axios
      .get(`http://localhost:4000/event/${this.props.match.params.id}`)
      .then((result) => {
        const event = result.data;
        this.setState({ event: result.data });
        console.log(result);
      })
      .catch((error) => console.log("There is some error ", error));
  }

  render() {
    return (
      <div class="container" style={{ fontSize: 15 }}>

        <h1 className="display-3">Details</h1>
        <p className="lead" style={{ fontSize: 15 }}>
          Simple details page
        </p>
        <div className="panel panel-primary">
          <div className="panel-heading">
            <h3 className="panel-title">Details of {this.state.event.title}</h3>
          </div>
          <div className="panel-body">
            <table className="table col-xs-9">
              <tbody>
              <tr>
                  <th>Event ID</th>
                  <td>{this.state.event._id}</td>
                </tr>
                <tr>
                  <th>Event Title</th>
                  <td>{this.state.event.title}</td>
                </tr>
                <tr>
                  <th>Event Domain</th>
                  <td>{this.state.event.domain}</td>
                </tr>
                <tr>
                  <th>Event Price</th>
                  <td>{this.state.event.price}</td>
                </tr>
                <tr>
                  <th>Event Location</th>
                  <td>{this.state.event.location}</td>
                </tr>
                <tr>
                  <th>Event Start Date</th>
                  <td>{this.state.event.startDate}</td>
                </tr>
                <tr>
                  <th>Event End Date</th>
                  <td>{this.state.event.endDate}</td>
                </tr>
                <tr>
                  <th>Event Photo Path </th>
                  <td>{this.state.event.photoPath}</td>
                </tr>
                <tr>
                  <th>Event Descriptiom </th>
                  <td>{this.state.event.description}</td>
                </tr>

                <tr>
                  <th>Event Organizer Name </th>
                  <td>{this.state.event.organizerName}</td>
                </tr>


              </tbody>

              <div className="container">
                    <Link
                      to={`/event-edit/${this.state.event._id}`}
                      className="btn btn-warning btn-lg btn-block"
                    >
                      Edit
                    </Link>
                    &nbsp; 

                    <button
                      onClick={this.deleteNote.bind(this, this.state.event._id)}
                      className="btn btn-danger btn-lg btn-block"
                    >
                      Delete
                    </button>

                    &nbsp;

                    <Link to="/events" className="btn btn-dark btn-lg btn-block">
                      Back to Event list
                    </Link>
                    &nbsp; &nbsp;
                    </div>

            </table>
                    
          </div>
        </div>
      </div>
    );
  }
}