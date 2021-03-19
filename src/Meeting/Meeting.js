import React from 'react';

//Import CSS 
import './Meeting.css'

//Creat  Person Component that takes issues from App and map to display all the data
const Meeting = (props) => { 

    return (
        <div>
            <div className="card" className="overEffect" onClick={props.clickRefMeetingDetail}>
                <div className="card-body">
                    <h5 className="card-title">Meeting Date: {props.date}</h5>
                    <p className="card-text">Conducter: {props.conducter}</p>
                    <p className="card-text">Opening Prayer: {props.openingPrayer}</p>
                    <p className="card-text">Closing Prayer: {props.closingPrayer}</p>
                </div>
            </div>
        </div>
    );
}

//Make sure to export the person
export default Meeting;