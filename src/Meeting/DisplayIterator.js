import React from 'react';

//Creat  Person Component that takes issues from App and map to display all the data
const DisplayIterator = (props) => { 
    return (
        <div>
          <div className="btnsIterators">
            <button type="button" className="btn btn-info" onClick={props.refPreviousSetMeetings}>Previous</button>
            <button type="button" className="btn btn-info" onClick={props.refnextSetMeetings}>Next</button>
            <span>Meetings {props.displayManager.startPoint + 1} -  {props.displayManager.endPoint} | {props.totalPages} </span>
          </div>
        </div>
    );
}

//Make sure to export the person
export default DisplayIterator;