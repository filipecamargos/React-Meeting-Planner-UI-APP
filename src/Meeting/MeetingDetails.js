import React from 'react';

//Import CSS 
import './MeetingDetails.css'

//Creat  Person Component that takes issues from App and map to display all the data
const MeetingDetails = (props) => { 

    return (
        <div className="displayContainer">
            <div className="card details">
                <div className="card-body">
                    <h5 className="card-title">{props.title}</h5>
                    <p className="card-text">Issue: {props.body}</p>
                </div>
                <button onClick={props.backToMeetingsList} className="btn btn-primary">Back to Meetings</button> 
            </div>
            
        </div>
    );
}

//Make sure to export the person
export default MeetingDetails;