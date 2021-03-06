import Axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { RegionDropdown } from "react-country-region-selector";
import Header from "../Header";

export default class EventAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      domain: "",
      price: "",
      location: "",
      startDate: "",
      photoPath: "",
      endDate: "",
      description: "",
      organizerName: "",
      EventError: {
        title: "The title should be greater than 3 characters and cannot be empty",
        domain: "The domain should be greater than 3 characters and must not be empty",
        price: "The price cannot be null and must be a number",
        location: "You must select a state from this dropdown",
        startDate: "The starting date cannot be empty.",
        photoPath: "The image URL cannot be left empty",
        endDate: "The ending date cannot be empty.",
        description: "The description of the event cannot be empty.",
        organizerName: "The organizer name of the event cannot be empty.",
      },
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    let errors = this.state.EventError;

    switch(name){
      case "title":
        if(value.length<3){
          errors.title = "The title should be greater than 3 characters and cannot be empty"
        }
        else{
          errors.title = ""
        }
        break ; 

      case "domain":
        if(value.length<3){
          errors.domain = "The domain should be greater than 3 characters and must not be empty"
        }
        else{
          errors.domain = ""
        }
        break ; 

      case "price":
        if(value.length==0){
          errors.price = "The price cannot be null and must be a number"
        }
        else if(Number.isInteger(Number(value))==false){
          errors.price = "The price must be a number"
        }
        else if(Number(value)<0){
          errors.price = "The price cannot be negative"
        }
        else{
          errors.price = ""
        }
        break ; 
      
      case "startDate":
        if(value.length<1){
          errors.startDate = "The starting date cannot be empty."
        }
        else{
          errors.startDate="" ; 
        }
        break;

      case "photoPath":
        if(value.length==0){
          errors.photoPath = "The image URL cannot be left empty"
        }
        else{
          errors.photoPath = "" ; 
        }
        break ; 

      case "endDate":
        if(value.length==0){
          errors.endDate = "The ending date cannot be empty."
        }
        else{
          errors.endDate = ""
        }
        break ; 

      case "description":
        if(value.length==0){
          errors.description = "The description of the event cannot be empty."
        }
        else{
          errors.description = ""
        }
        break ; 

      case "organizerName":
        if(value.length==0){
          errors.organizerName = "The organizer name of the event cannot be empty."
        }
        else{
          errors.organizerName="" ; 
        }
        break ; 
      
      default:
        break ; 
      
    }


    this.setState({
      [name]: value,
      EventError: errors,
    });
  };

  validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
    return valid;
  };

  handleSubmit = (event) => {
    event.preventDefault();


    if (this.validateForm(this.state.EventError)) {


      const event = {
        title: this.state.title,
        domain: this.state.domain,
        price: this.state.price,
        location: this.state.location,
        startDate: this.state.startDate,
        photoPath: this.state.photoPath,
        endDate: this.state.endDate,
        description: this.state.description,
        organizerName: this.state.organizerName,
      };

      console.log(event) ; 

      Axios.post(`http://localhost:4000/event`, event)
        .then((result) => {
          console.log("successfully added a new event");
          this.props.history.push("/events");
        })
        .catch((error) => console.log("error occured"));
    } else {
      alert(
        "Invalid form, can't add. Check the error messages and resolve them"
      );
    }
  };

  render() {
    const errors = this.state.EventError;
    console.log(this.state);

    return (

      <div className="container-fluid">
        <Header />

      <div className="container" style={{marginBottom:100, marginTop:50}}>
        <h1 className="display-3">Add Event</h1>
        <p className="lead" style={{ fontSize: 15 }}>
          Simple Add Event page
        </p>

        <form
          onSubmit={this.handleSubmit}
          style={{ fontSize: 15}}
        >
          <div className="form-group">
            <label>Event Title</label>
            <input
              type="text"
              className="form-control"
              name="title"
              onChange={this.handleChange}
              value={this.state.title}
            />
            {errors.title.length > 0 && (
              <span className="error lead text-danger">{errors.title}</span>
            )}
          </div>

          <div className="form-group">
            <label>Event Domain</label>
            <input
              type="text"
              className="form-control"
              name="domain"
              onChange={this.handleChange}
              value={this.state.domain}
            />
            {errors.domain.length > 0 && (
              <span className="error lead text-danger">{errors.domain}</span>
            )}
          </div>

          <div className="form-group">
            <label>Event Price</label>
            <input
              type="text"
              className="form-control"
              name="price"
              onChange={this.handleChange}
              value={this.state.price}
            />
            {errors.price.length > 0 && (
              <span className="error lead text-danger">{errors.price}</span>
            )}
          </div>

          <div className="form-group">
            <label>Event Location </label>
            <span> </span>
            <RegionDropdown
              country="India"
              name="location"
              value={this.state.location}
              onChange={(val) => {
                let errorsList = this.state.EventError;
                if (val.length < 2) {
                  errorsList.location =
                    "You must select a state from this dropdown";
                } else {
                  errorsList.location = "";
                }
                this.setState({ location: val, EventError: errorsList });
              }}
            />
            {errors.location.length > 0 && (
              <span className="error lead text-danger">{errors.location}</span>
            )}
          </div>

          <div className="form-group">
            <label>Event Start Date</label>
            <input
              type="date"
              className="form-control"
              name="startDate"
              onChange={this.handleChange}
            />

            {errors.startDate.length > 0 && (
              <span className="error lead text-danger">{errors.startDate}</span>
            )}
          </div>

          <div className="form-group">
            <label>Event End Date</label>
            <input
              type="date"
              className="form-control"
              name="endDate"
              onChange={this.handleChange}
            />
            {errors.endDate.length > 0 && (
              <span className="error lead text-danger">{errors.endDate}</span>
            )}
          </div>

          <div className="form-group">
            <label>Event Photo Path (Web URL)</label>
            <input
              type="text"
              className="form-control"
              name="photoPath"
              onChange={this.handleChange}
              value={this.state.photoPath}
            />
            {errors.photoPath.length > 0 && (
              <span className="error lead text-danger">{errors.photoPath}</span>
            )}
          </div>

          <div className="form-group">
            <label>Event Description</label>
            <input
              type="text"
              className="form-control"
              name="description"
              onChange={this.handleChange}
              value={this.state.description}
            />
            {errors.description.length > 0 && (
              <span className="error lead text-danger">
                {errors.description}
              </span>
            )}
          </div>

          <div className="form-group">
            <label>Event Organiser Name</label>
            <input
              type="text"
              className="form-control"
              name="organizerName"
              onChange={this.handleChange}
              value={this.state.organizerName}
            />
            {errors.organizerName.length > 0 && (
              <span className="error lead text-danger">
                {errors.organizerName}
              </span>
            )}
          </div>

          <div>
            <br />
            <br />
            <button
              type="submit"
              className="btn btn-primary btn-lg btn-block"
              style={{ padding: 8 }}
            >
              <h4>+ Add</h4>
            </button>
            &nbsp; &nbsp;
            <Link
              to="/events"
              className="btn btn-dark btn-lg btn-block"
              style={{ padding: 8 }}
            >
              <h4>Back to Events List</h4>
            </Link>
          </div>
        </form>
      </div>
      </div>
    );
  }
}
