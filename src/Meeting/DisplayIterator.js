import React from 'react';

//Creat  Person Component that takes issues from App and map to display all the data
const DisplayIterator = (props) => { 
    return (
        <div>
          <div className="btnsIterators">
            <button type="button" className="btn btn-info" onClick={props.refPreviousSetIssues}>Previous</button>
            <button type="button" className="btn btn-info" onClick={props.refnextSetIssues}>Next</button>
            <span>Issues {props.displayManager.startPoint + 1} -  {props.displayManager.endPoint} | {props.totalPages} </span>
          </div>
        </div>
    );
}

//Make sure to export the person
export default DisplayIterator;