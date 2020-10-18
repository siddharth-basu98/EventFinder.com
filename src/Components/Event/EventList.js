import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { RegionDropdown } from "react-country-region-selector";
import img_src from "../../Images/Event-placeholder-image.png" ; 
import { getToken } from "../../Utils/Common"
import Header from "../Header"

export default class EventList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      all_events:[],
      search:"",
      search_by:"title",
      sort_by:""
    };
  }

  getEvents() {
    axios
      .get(`http://localhost:4000/events`)
      .then((result) => {
        this.setState({ events: result.data,
                        all_events:result.data });
      })
      .catch((error) => console.log("There is some error ", error));
  }

  componentDidMount() {
    this.getEvents();
  }

  deleteEvent(id) {
    console.log(getToken());
    axios
      .delete(`http://localhost:4000/event/${id}`)
      .then((result) => {
        console.log(result);
        this.getEvents();
      })
      .catch((error) => {
        console.log("There is some error");
      });
  }

  handleSearch = (event) => {
    const { name, value } = event.target;

    let new_array = this.state.all_events.filter((event_object)=>{
      return (event_object[this.state.search_by]).includes(value) ; 
    }) ; 

    this.setState({
      events: new_array,
      search:value
    })
  }


  handleSort = (event) => {

    console.log(this.state.all_events); 
    console.log(this.state.events) ; 

    let val = event.currentTarget.dataset.id ; 

    if(val==="price-asc"){
      let event_list_sorted = this.state.events ; 
      event_list_sorted = this.state.events.sort((a,b) => a.price - b.price );
      this.setState({sort_by:"price-asc", events:event_list_sorted})
    }

    if(val==="price-desc"){
      let event_list_sorted = this.state.events ; 
      event_list_sorted = this.state.events.sort((a,b) => b.price - a.price );
      this.setState({sort_by:"price-desc", events:event_list_sorted})
    }

    if(val==="date"){
      let event_list_sorted = this.state.events ; 
      event_list_sorted = this.state.events.sort((a,b) => a.startDate.localeCompare(b.startDate));
      this.setState({sort_by:"date", events:event_list_sorted})
    }



  }



  render() {
    let search_form = ""


    if(this.state.search_by=="location"){

      search_form = <RegionDropdown
                      country="India"
                      name="location"
                      value={this.state.search}
                      onChange={(val) => {
                          if(val!=null){
                          let new_array = this.state.all_events.filter((event_object)=>{
                            return (event_object['location']).includes(val) ; 
                          }) ; 
                          this.setState({
                            events: new_array,
                            search:val
                        })
                      }}}
                      />
    }else{
      search_form =  <input
                        type={this.state.search_by=="startDate" ? "date" : "text"}
                        className="form-control"
                        name="search"
                        onChange={this.handleSearch}
                        value={this.state.search}
                        placeholder={"Enter the " + this.state.search_by + " of the event you want to search for..."}
                        style={{height:50}}
                      />
    }



    return (

      <div className="container-fluid">
        <Header />

      <div className="container" style={{marginBottom:100}}>

        <h1 style={{fontSize:100, paddingTop:15}}>Events</h1>
        <br />
        <Link
          to="/event-add"
          className="btn btn-success btn-lg btn-block"
          style={{ padding: 10 }}
        >
          <h4>+ Click to add a new Event</h4>
        </Link>
        <br />
        <br />

      
        <div class="input-group mb-3">
            <div class="input-group-prepend">
                  <span style={{fontSize:40}} class="glyphicon glyphicon-search"></span>
                  &nbsp; &nbsp; &nbsp; &nbsp;
            </div>
            <div class="btn-group">
                  <button type="button" class="btn btn-primary btn-lg dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <b>Search by {this.state.search_by}. <br/>(Click dropdown to change)</b>
                  </button>
                      <div class="dropdown-menu">
                        <li class="dropdown-item" style={{fontSize:14}} onClick={()=>{this.setState({search_by:"title", events:this.state.all_events, search:""})}}>Title</li>
                        <li class="dropdown-item" style={{fontSize:14}} onClick={()=>{this.setState({search_by:"domain", events:this.state.all_events, search:""})}}>Domain</li>
                        <li class="dropdown-item" style={{fontSize:14}} onClick={()=>{this.setState({search_by:"location", events:this.state.all_events, search:""})}}>Location</li>
                        <li class="dropdown-item" style={{fontSize:14}} onClick={()=>{this.setState({search_by:"startDate", events:this.state.all_events, search:""})}}>Date</li>
                      </div>
            </div>

           {search_form}

                    
        </div>


            <br /> 
            <br />

            <div class="input-group mb-3">
            <div class="btn-group">
                  <button type="button" class="btn btn-primary btn-lg dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <b>Sort results by {this.state.sort_by} <br/>(Click dropdown to change)</b>
                  </button>
                      <div class="dropdown-menu">
                        <li class="dropdown-item" style={{fontSize:14}} data-id="price-asc" onClick={this.handleSort}>Price (low to high)</li>
                        <li class="dropdown-item" style={{fontSize:14}} data-id="price-desc" onClick={this.handleSort}>Price (high to low)</li>
                        <li class="dropdown-item" style={{fontSize:14}} data-id="date" onClick={this.handleSort}>Date</li>
                      </div>
            </div>
            <div>
            &nbsp; &nbsp;
            &nbsp; &nbsp;
            &nbsp; &nbsp;

            <button type="button" class="btn btn-danger btn-lg" onClick={()=>{this.setState({sort_by:"", search:"", events:this.state.all_events})}}>
                        <b>Clear Search and Sort Filters<br/>(return back to original list)</b>
                  </button></div>
            </div>



    <div class="container">
    <div class="row equal">

        {
          this.state.events.map((listValue, index) => {
            return (
              <div class="col-sm-4 d-flex pb-3">
                <div class="card" style={{marginBottom:40, marginTop:40}}>
                <img src={img_src} class="card-img-top img-thumbnail" alt="..."/>
                <div class="card-body">
            <h5 class="card-title display-4">{listValue.title}</h5>
            <h3>Location: {listValue.location}</h3>
            <h3>Domain: {listValue.domain}</h3>
            <h3>Price: {listValue.price}</h3>

            <p class="card-text">{listValue.description.length > 200 ? listValue.description.substring(0,200)+"...." : listValue.description}</p>
            
                </div>
                <div class="card-footer" style={{backgroundColor:"white",}}>
            <Link
                      to={`/event-detail/${listValue._id}`}
                      className="btn btn-primary btn-lg"
                    >
                      Details
                    </Link>
                    &nbsp; &nbsp;
                    <Link
                      to={`/event-edit/${listValue._id}`}
                      className="btn btn-warning btn-lg"
                    >
                      Edit
                    </Link>
                    &nbsp; &nbsp;
                    <button
                      onClick={this.deleteEvent.bind(this, listValue._id)}
                      className="btn btn-danger btn-lg"
                    >
                      Delete
                    </button>
                    </div>
                <div class="card-footer" style={{backgroundColor:"black",}}>
            <h4 style={{color:"white",}}>Date : {listValue.startDate}</h4>
                </div>
                </div>

              </div>
            )
          })
        }

      </div>
      </div>
              </div>
              </div>
    );
  }
}