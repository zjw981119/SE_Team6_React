import React, {useEffect, useState} from "react";

import Tuits from "../tuits";
import './bookmarks.css';

import Select from 'react-select';
import {useNavigate} from "react-router-dom";
import * as service from "../../services/security-service"
import * as bookmarkService from "../../services/bookmarks-service.js"


function Bookmarks() {

    const navigate = useNavigate();
    // const location = useLocation();
    const [profile, setProfile] = useState({});
    const [selectedOption, setSelectedOption] = useState('default');
    const [bookmarkedTuits, setBookmarkedTuits] = useState([]);
    const data = [
        { value: 'default', label: 'View All' },
        { value: 'action', label: 'action' },
        { value: 'sports', label: 'sports' },
        { value: 'travel', label: 'travel' },
    ];

    // retrieve the currently logged in user
    useEffect(async () => {
        try {
           const user = await service.profile();
           setProfile(user);
        } catch (e) {
            navigate('/login');
        }
    }, []);

    const findTuitsIBookmarked = () => {
        // find all bookmarked tuits
        if(selectedOption === 'default'){
            bookmarkService.findAllTuitsBookmarkedByUser("me")
                .then((tuits) => setBookmarkedTuits(tuits));
        } else {
            // retrieve all tuits bookmarked by login user with tag(selectedOption)
            bookmarkService.findAllBookmarkedTuitsByTag("me", selectedOption)
                .then(tuits => setBookmarkedTuits(tuits))
        }
        console.log(bookmarkedTuits)
    }
    useEffect(findTuitsIBookmarked, [selectedOption]);

    return (
        <div className="Bookmarks">

            <div>
                <h1> My Bookmarks</h1>
                <Tuits/>
            </div>

            <div style={{marginBottom: '2rem'}}>
                <Select
                    placeholder="Select Option"
                    defaultValue={selectedOption} // set selected value
                    options={data} // set list of the data
                    onChange={setSelectedOption} // update selected value
                />

                {selectedOption && <div style={{marginTop: 20, lineHeight: '25px'}}>
                    <b>Selected Option</b><br/>
                    <div style={{marginTop: 10}}><b>{selectedOption.label}</b></div>
                    <div><b>Value: </b> {selectedOption.value}</div>
                </div>}
            </div>
            <Tuits tuits={bookmarkedTuits}
                   refreshTuits={findTuitsIBookmarked}/>

        </div>
    );
}

export default Bookmarks;