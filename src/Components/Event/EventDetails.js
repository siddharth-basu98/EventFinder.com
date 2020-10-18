import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import img_src from "../../Images/nature-design.jpg" ; 
import Header from "../Header";


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

      <div className="container-fluid">
        <Header />

      <div className="container">
<div class="card mb-3">
  <img class="card-img-top" src={img_src} alt="Card image cap" />
  <div class="card-body">
    <h2 class="card-title display-2">{this.state.event.title}</h2>
    <hr/>
    <blockquote class="card-text">{this.state.event.description}</blockquote>
    <br />
    <br />


    <div class="list-group" style={{fontSize:16}}>
  <button type="button" class="list-group-item list-group-item-action active">
    Details
  </button>
  <button type="button" class="list-group-item list-group-item-action"><strong>Domain :</strong> {this.state.event.domain}</button>
  <button type="button" class="list-group-item list-group-item-action"><strong>Price : </strong>{this.state.event.price}</button>
  <button type="button" class="list-group-item list-group-item-action"><strong>Location : </strong>{this.state.event.location}</button>
  <button type="button" class="list-group-item list-group-item-action"><strong>Start Date : </strong>{this.state.event.startDate}</button>
  <button type="button" class="list-group-item list-group-item-action"><strong>End Date : </strong>{this.state.event.endDate}</button>
  <button type="button" class="list-group-item list-group-item-action"><strong>Organizer Name : </strong>{this.state.event.organizerName}</button>
  <br />
  <br />

</div>


  </div>

      <div class="card-body">
          <Link
            to={`/event-edit/${this.state.event._id}`}
            className="btn btn-warning btn-lg btn-block"
            style={{padding:10}}
          >
            <h3>Edit</h3>
          </Link>
          &nbsp; 

          <button
            onClick={this.deleteNote.bind(this, this.state.event._id)}
            className="btn btn-danger btn-lg btn-block"
            style={{padding:10}}
          >
          <h3>Delete</h3>
          </button>

          &nbsp;

          <Link to="/events" className="btn btn-dark btn-lg btn-block" style={{padding:10}}>
            <h3>Back to Event list</h3>
          </Link>
          &nbsp; &nbsp;
        </div>

        <div class="container-fluid">
    <div class="map-responsive">

    

   <iframe src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyA0s1a7phLN0iaD6-UE7m4qP-z21pH0eSc&q=${this.state.event.location}`} style={{width:"100%" ,height:400, frameborder:0,border:0}} allowfullscreen></iframe>
</div>
</div>
  
</div>
      </div>
      </div>

    );
  }
}