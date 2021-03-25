import React from 'react';

//Creat  Person Component that takes issues from App and map to display all the data
const DisplayIterator = (props) => { 
    return (
        <div>
          <div className="btnsIterators">
            <button type="button" className="btn btn-info" onClick={props.refPreviousSetMeetings}>
              <i className="glyphicon glyphicon-chevron-left"></i> 
            </button>
            <button type="button" className="btn btn-info" onClick={props.refnextSetMeetings}>
              <i className="glyphicon glyphicon-chevron-right"></i>
            </button>
            <span>Meetings {props.displayManager.startPoint + 1} -  {props.displayManager.endPoint} | {props.totalPages} </span>
            <button type="button" class="btn btn-outline-info"><i class="glyphicon glyphicon-plus"></i> New</button>
          </div>
        </div>
    );
}

//Make sure to export the person
export default DisplayIterator;