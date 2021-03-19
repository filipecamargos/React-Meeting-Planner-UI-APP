import React from 'react';

//Import CSS 
import './Meeting.css'

//Creat  Person Component that takes issues from App and map to display all the data
const Meeting = (props) => { 

    return (
        <div>
            <div className="card" className="overEffect" onClick={props.clickRefIssueDetail}>
                <div className="card-body">
                    <h5 className="card-title">{props.title}</h5>
                    <p className="card-text">Issue: {props.body}</p>
                    <p className="card-text">State: {props.state} | Issue Number: {props.issuNumber}</p>
                </div>
            </div>
        </div>
    );
}

//Make sure to export the person
export default Meeting;