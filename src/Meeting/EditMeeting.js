import React, {useState, useEffect} from 'react';
import swal from 'sweetalert';

//Import CSS 
import './EditMeeting.css'

//Create Person Component that takes issues from App and map to display all the data
const EditMeeting = (props) => {

    //Set the variable in this component state
    const [date, setDate] = useState();
    const [conductor, setConductor] = useState();
    const [openingSong, setOpeningSong] = useState();
    const [sacramentHymn, setSacramentHymn] = useState();
    const [specialSong, setSpecialSong] = useState();
    const [closingSong, setClosingSong] = useState();
    const [openingPrayer, setOpeningPrayer] = useState();
    const [closingPrayer, setClosingPrayer] = useState();
    const [speakers, setSpeakers] = useState([]);

    //Track the number of speaker the user want to use to later update the DOM
    const [numberOfSpeakers, setNumberOfSpeakers] = useState();

    //Create a empty speakerField
    let speakerFields = [];

    //Instatiate the speakers based on the number of speaker
    const instatiateSpeakers = (size) => {

        setNumberOfSpeakers(size)
        let tempSpeakerHold = [];

        //Make sure old data in the state is saved
        for (let i = 0; i < size; i++){
            
            if(speakers[i]){

                tempSpeakerHold.push({
                    name: speakers[i].name,
                    topic: speakers[i].topic
                })

            } else {

                tempSpeakerHold.push({
                    name: "",
                    topic: ""
                })
            }
        }

        setSpeakers(tempSpeakerHold);
    }

    //Change hased on the speaker input
    const populateSpeakers = (index, speaker) => {

        //Set the Speakers in the state
        let speakerCopy = [...speakers];
        speakerCopy[index].name = speaker;

        setSpeakers(speakerCopy)
    }

    //Change hased on the topic input
    const populateSpeakersTopic = (index, topic) => {
        
        //Set the Speakers in the state
        let speakerCopy = [...speakers];
        speakerCopy[index].topic = topic;

        setSpeakers(speakerCopy)
    }

    //Adjust the DOM with the proper number of speakers
    if (numberOfSpeakers) {
        for (let i = 0; i < numberOfSpeakers; i++) {

           speakerFields.push(        
                <div className="speaker" key={i} id={i}>
                    <label>Speaker</label>
                    <input type="text" className="form-control" placeholder="Speaker" name="speaker"
                        onChange={e => populateSpeakers(i, e.target.value)} value={speakers[i].name} required></input>
                    <br />
                    <label>Topic</label>
                    <input type="text" className="form-control" placeholder="Topic" name="topic"
                        onChange={e => populateSpeakersTopic(i, e.target.value)} value={speakers[i].topic} required></input>
                    <br />
                </div>
            )
        }
    }

    //
    //Do the API call to add the meeting
    const createNewMeeting = (e) => {
        e.preventDefault();

        //Set the request
        const request = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                date: date,
                conductor: conductor,
                openingSong: openingSong,
                sacramentHymn: sacramentHymn,
                specialSong: specialSong,
                closingSong: closingSong,
                openingPrayer: openingPrayer,
                closingPrayer: closingPrayer,
                speakers: speakers
            })
        }

        //Call the end point
        fetch('/api/Programs', request)
        .then(
            
            //Display a confirmation message
            swal(date + " Meeting", "Sucessfully Added!", "success", {
                button: "Back to Meetings!",

            }).then((backToMeeting) => {
                
                if (backToMeeting) {

                    //Call the state reset
                    props.refToResetState();
                }
            })
        );
    }

    return (
        <div>
            <form onSubmit={e => {createNewMeeting(e)}} className="myForm">
                <div className="form-group">
                    <div className="two-inputs-div">
                        <label htmlFor="conductor">Conductor</label>
                        <input type="text" className="form-control" placeholder="Conductor" id="conductor" name="conductor"
                            onChange={e => setConductor(e.target.value)} value={conductor} required></input>
                        <br />
                        <label htmlFor="openingSong">Opening Song</label>
                        <select name="openingSong" id="openingSong" className="form-control" 
                            onChange={e => setOpeningSong(e.target.value)} value={openingSong} required>
                            <option value="" disabled selected>Select Song</option>
                            {
                                props.hymns.map((hymn, index) => (
                                    <option>{hymn}</option>
                                ))
                            }
                        </select>
                        <br />
                    </div>
                    <div className="two-inputs-div">
                        <label htmlFor="sacramentHymn">Sacrament Song</label>
                        <select name="sacramentHymn" id="sacramentHymn" className="form-control" 
                            onChange={e => setSacramentHymn(e.target.value)} required>
                            <option value="" disabled selected>Select Song</option>
                            {
                                props.hymns.map((hymn, index) => (
                                    <option>{hymn}</option>
                                ))
                            }
                        </select>
                        <br />
                        <label htmlFor="specialSong">Special Song</label>
                        <select name="specialSong" id="specialSong" className="form-control" 
                            onChange={e => setSpecialSong(e.target.value)} value={specialSong} required>
                            <option value="" disabled selected>Select Song</option>
                            {
                                props.hymns.map((hymn, index) => (
                                    <option>{hymn}</option>
                                ))
                            }
                        </select>
                        <br />
                    </div>
                    <div className="two-inputs-div">
                        <label htmlFor="closingSong">Closing Song</label>
                        <select name="closingSong" id="closingSong" className="form-control" 
                            onChange={e => setClosingSong(e.target.value)} value={closingSong} required>
                            <option value="" disabled selected>Select Song</option>
                            {
                                props.hymns.map((hymn, index) => (
                                    <option>{hymn}</option>
                                ))
                            }
                        </select>
                        <br />
                        <label htmlFor="openingPrayer">Opening Prayer</label>
                        <input type="text" className="form-control" placeholder="Opening Prayer" id="openingPrayer" name="openingPrayer"
                            onChange={e => setOpeningPrayer(e.target.value)} value={openingPrayer} required></input>
                        <br />
                    </div>
                    <div className="two-inputs-div">
                        <label htmlFor="closingPrayer">Closing Prayer</label>
                        <input type="text" className="form-control" placeholder="Closing Prayer" id="closingPrayer" name="closingPrayer"
                            onChange={e => setClosingPrayer(e.target.value)} value={closingPrayer} required></input>
                        <br />
                        <label htmlFor="date">Date</label>
                        <input type="date" className="form-control" id="date" name="date"
                            onChange={e => setDate(e.target.value)} value={date} required></input>
                    </div>
                    <div className="two-inputs-div">
                        <label htmlFor="numberOfSpeakers">Select Number of Speakers</label>
                        <select name="numberOfSpeakers" id="numberOfSpeakers" className="form-control" 
                            onChange={e => instatiateSpeakers(e.target.value)} required>
                            <option value="" disabled selected>Number of Speakers</option>
                            <option value="0">0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                        <br />
                        {speakerFields}
                        <div>
                            <button className="btn btn-success" type="submit">Add Meeting</button>
                        </div>
                    </div>
                </div>
            </form>
            <button onClick={e => props.refToResetState()} className="btn btn-secondary">
                <i className="glyphicon glyphicon-arrow-left"></i>
            </button>     
        </div>
    );
}

//Make sure to export the person
export default EditMeeting;