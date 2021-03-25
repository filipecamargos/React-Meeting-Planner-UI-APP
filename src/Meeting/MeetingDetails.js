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
                    <p className="card-text">Opening Song: {props.openingSong}</p>
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
                    <p className="card-text">Sacrament Song: {props.sacramentHymn}</p>
                    <p className="card-text">Special Song: {props.specialSong}</p>
                    <hr />
                    <p className="card-text">Closing Song: {props.closingSong}</p>
                    <p className="card-text">Closing Prayer: {props.closingPrayer}</p>
                    <hr />
                </div>
                <div className="btnsIterators">
                    <button onClick={props.backToMeetingsList} className="btn btn-secondary"><i className="glyphicon glyphicon-arrow-left"></i></button>
                    <button className="btn btn-info"><i className="glyphicon glyphicon-pencil"></i></button> 
                    <button className="btn btn-danger"><i className="glyphicon glyphicon-trash"></i></button> 
                </div>
            </div>
        </div>
    );
}

export default MeetingDetails;