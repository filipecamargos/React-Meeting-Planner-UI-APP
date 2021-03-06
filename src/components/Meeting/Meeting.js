import React from 'react';

//Import CSS 
import './Meeting.css'

//Create Person Component that takes issues from App and map to display all the data
const Meeting = (props) => { 

    return (
        <div>
            <div className="card" className="overEffect" onClick={props.clickRefMeetingDetail}>
                <div className="card-body">
                    <h5 className="card-title">Meeting Date: {props.date}</h5>
                    <p className="card-text"><i className="glyphicon glyphicon-user"></i> Conductor: {props.conductor}</p>
                    <p className="card-text"><i className="glyphicon glyphicon-user"></i> Opening Prayer: {props.openingPrayer}</p>
                    <p className="card-text"><i className="glyphicon glyphicon-user"></i> Closing Prayer: {props.closingPrayer}</p>
                </div>
            </div>
        </div>
    );
}

//Make sure to export the person
export default Meeting;