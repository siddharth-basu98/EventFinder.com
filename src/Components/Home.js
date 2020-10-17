import React, { Component } from "react";
import img_src1 from "../Images/carousel_1.jpg"
import img_src2 from "../Images/carousel-2.jpg"
import img_src3 from "../Images/carousel-3.jpg"


import {Link} from "react-router-dom"

export default class Home extends Component {
  render() {
    return (

      <div className="container-fluid">
      <main role="main">

      <div class="jumbotron">
        <div class="container">
          <h1 class="display-1">Hello, to the event finder application!</h1>
          <p>This is an application to search, add, update and delete events. The user just needs to know what he wants and we will show where he needs to check-in in the city. Give it a try today. You will absolutely love it. </p>
          <p><a class="btn btn-primary btn-lg" style={{padding:30}} href="/login" role="button" style={{fontSize:20}}>Sign In &raquo;</a></p>
        </div>
      </div>

         <div id="myCarousel" class="carousel slide" data-ride="carousel" style={{marginLeft:0}}>
     <ol class="carousel-indicators">
       <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
       <li data-target="#myCarousel" data-slide-to="1"></li>
       <li data-target="#myCarousel" data-slide-to="2"></li>
     </ol>

     <div class="carousel-inner">
       <div class="item active">
         <img src={img_src1} alt="..." style={{width:"100%"}} />
         <div class="carousel-caption">
         <h1 style={{color:"black",fontSize:50}}>Search for travelling events</h1><br />
         <p style={{color:"black",fontSize:30}}>There are so many places to go, why don't you search for travel events today</p>
         <Link
               to="/login"
               className="btn btn-primary btn-lg"
               style={{ padding: 15 }}
             ><h2 style={{fontSize:15}}><b>Sign in now</b></h2></Link>
       </div>
       </div>

       <div class="item">
         <img src={img_src2} alt="..." style={{width:"100%"}} />
         <div class="carousel-caption">
         <h1 style={{color:"white",fontSize:50}}>Food events in the city?</h1><br />
         <p style={{color:"white",fontSize:30}}>From amazing cheese cakes to delicious traditional food from around the world. Get them now in your city</p>
         <Link
               to="/login"
               className="btn btn-primary btn-lg"
               style={{ padding: 15 }}
             ><h2 style={{fontSize:15}}><b>Sign in now</b></h2></Link>
       </div>
       </div>
    
       <div class="item">
         <img src={img_src3} alt="..." style={{width:"100%"}} />
         <div class="carousel-caption">
         <h1 style={{color:"white",fontSize:50}}><b>Sway to all the drops and highs</b></h1><br />
         <p style={{color:"white",fontSize:30}}><b>Catch world famous international artists live in your city now.</b></p>
         <Link
               to="/login"
               className="btn btn-primary btn-lg"
               style={{ padding: 15 }}
             ><h2 style={{fontSize:15}}><b>Sign in now</b></h2></Link>
       </div>
       </div>
     </div>

     <a class="left carousel-control" href="#myCarousel" data-slide="prev">
       <span class="glyphicon glyphicon-chevron-left"></span>
       <span class="sr-only">Previous</span>
     </a>
     <a class="right carousel-control" href="#myCarousel" data-slide="next">
       <span class="glyphicon glyphicon-chevron-right"></span>
       <span class="sr-only">Next</span>
     </a>
   </div>

      <div class="container" style={{marginTop:30, fontSize:15}}>
        <div class="row">
          <div class="col-md-4">
            <h2>Search Events</h2>
            <p>The application allows the user to search events based on different parameters such as the event name, location of the event, 
              the domain the event belongs to and the starting date of the event. The search bar on the events page dynamically updates the 
              list of events shown on the page. 
            </p>
            <p><a class="btn btn-primary btn-lg" style={{padding:30}} href="/events" role="button" style={{fontSize:15}}>View Details &raquo;</a></p>
          </div>
          <div class="col-md-4">
            <h2>Add, update and Delete events</h2>
            <p>The application provides the option of adding and updating the events. The add and update is implemented through a form interface 
              where the user is required to enter all the details of the event such as tile, domain, starting date, ending date, price, organizer name 
              etc. There are delete buttons associated to the events which remove the event from the database. 
            </p>
            <p><a class="btn btn-primary btn-lg" style={{padding:30}} href="/events" role="button" style={{fontSize:15}}>View Details &raquo;</a></p>
          </div>
          <div class="col-md-4">
            <h2>Sorting events</h2>
            <p>On the main landing page of the application where all the events are listed, there is a sorting button with many sort by options. 
              The implemented ones are sort by price with two variations - lowest to highest and highest to lowest. There is also a clear sort and 
              sort button which clears the filters and then goes back to display the entire list of events again. 
            </p>
            <p><a class="btn btn-primary btn-lg" style={{padding:30}} href="/events" role="button" style={{fontSize:15}}>View Details &raquo;</a></p>
          </div>
        </div>

        <hr />

      </div>

    </main>

    <footer class="container">
      <p>&copy; Company 2020-2021</p>
    </footer>
    </div>


    );
  }
}

