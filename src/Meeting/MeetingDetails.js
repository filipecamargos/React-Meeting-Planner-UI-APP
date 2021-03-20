import React from 'react';

//Import CSS 
import './MeetingDetails.css'

//Creat  Person Component that takes issues from App and map to display all the data
const MeetingDetails = (props) => { 

    return (
        <div className="displayContainer">
            <div className="card details">
                <div className="card-body">
                    <h5 className="card-title">Meeting Date: {props.date}</h5>
                    <hr />
                    <p className="card-text">Conductor: {props.conducter}</p>
                    <p className="card-text">Opening Song: {props.openSong}</p>
                    <p className="card-text">Opening Prayer: {props.openingPrayer}</p>
                    <hr />
                    <p className="card-text">Speakers:</p>
                    {props.speakers.map((person, index) => (
                        <div key={person.name + person.topic}>
                            <span>Name: {person.name}</span><br />   
                            <span>Topic: {person.topic}</span>
                            <br />
                            <br />
                        </div>
                    ))}
                    <hr />
                    <p className="card-text">Sacrament Song: {props.sacramentHym}</p>
                    <p className="card-text">Special Song: {props.specialSong}</p>
                    <hr />
                    <p className="card-text">Closing Song: {props.closingSong}</p>
                    <p className="card-text">Closing Prayer: {props.closingPrayer}</p>
                    
                </div>
                <button onClick={props.backToMeetingsList} className="btn btn-primary">Back to Meetings</button> 
            </div>
            
        </div>
    );
}

/**
 *                         openSong = {this.state.meetingDetail.openSong}
              sacramentHym = {this.state.meetingDetail.sacramentHym}
              specialSong = {this.state.meetingDetail.specialSong}
              closingSong = {this.state.meetingDetail.closingSong}
              openingPrayer = {this.state.meetingDetail.openingPrayer}
              closingPrayer = {this.state.meetingDetail.closingPrayer}
              speakers = {this.state.meetingDetail.speakers}
 */

//Make sure to export the person
export default MeetingDetails;