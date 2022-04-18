
import React, {useEffect, useState} from "react";

import Tuits from "../tuits";
import MyBookmarks from "./my-bookmarks";
import './bookmarks.css';

import Select from 'react-select';
import {HashRouter, Link, Route, Routes, useNavigate, useLocation} from "react-router-dom";
import * as service from "../../services/security-service"
import * as bookmarkService from "../../services/bookmarks-service.js"


function Bookmarks () {

    const navigate = useNavigate();
    // const location = useLocation();
    const [profile, setProfile] = useState({});

    // retrieve the currently logged in user
    useEffect(async () => {
        try {
//            const user = await service.profile();
//            console.log("user", user)
//            setProfile(user);
        } catch (e) {
            navigate('/login');
        }
    }, []);

    const [bookmarkedTuits, setBookmarkedTuits] = useState([]);
        const findTuitsIBookmarked = () =>{
        console.log("find tuits bookmark");
            bookmarkService.findAllTuitsBookmarkedByUser("me")
                .then((tuits) => setBookmarkedTuits(tuits));
    //        service.findAllTuits()
    //            .then((tuits) => setBookmarkedTuits(tuits));

                }
        useEffect(findTuitsIBookmarked, []);


  const data = [
    {
      value: '',
      label: "View All"
    },

    {
      value: 1,
      label: "action"
    },
    {
      value: 2,
      label: "sports"
    },
    {
      value: 3,
      label: "travel"
    }
  ];

  const [selectedOption, setSelectedOption] = useState(null);

  // handle onChange event of the dropdown
  const handleChange = e => {
    e.label!=="View All"?setSelectedOption(e):setSelectedOption(null);
    console.log(e)
  }

  return (

    <div className="Bookmarks">

      <div>
          <h1> My Bookmarks</h1>
        <Tuits/>
      </div>

<div style={{marginBottom:'2rem'}}>
      <Select
        placeholder="Select Option"
        value={selectedOption} // set selected value
        options={data} // set list of the data
        onChange={handleChange} // assign onChange function

      />

      {selectedOption && <div style={{ marginTop: 20, lineHeight: '25px' }}>
        <b>Selected Option</b><br />
        <div style={{ marginTop: 10 }}> <b>{selectedOption.label}</b> </div>
        <div><b>Value: </b> {selectedOption.value}</div>
      </div>}
</div>
        <Tuits tuits={bookmarkedTuits}
        refreshTuits={findTuitsIBookmarked}/>

    </div>
  );
}

export default Bookmarks;