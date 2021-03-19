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
                    <p className="card-text">Url: <a href={props.url}>{props.url}</a></p>
                    <p className="card-text">Created: {props.created_at}</p>
                    <p className="card-text">User: {props.user}</p>
                    <p className="card-text">Updated: {props.updated_at}</p>
                    <p className="card-text">State: {props.state}</p>
                </div>
                <button onClick={props.backToIssueList} className="btn btn-primary">Back to Issues</button> 
            </div>
            
        </div>
    );
}

//Make sure to export the person
export default MeetingDetails;