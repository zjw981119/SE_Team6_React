import React, { useEffect, useState } from "react";

import Tuits from "../tuits";
import MyBookmarks from "./my-bookmarks";
import "./bookmarks.css";

import Select from "react-select";
import {
  HashRouter,
  Link,
  Route,
  Routes,
  useNavigate,
  useLocation,
} from "react-router-dom";
import * as service from "../../services/security-service";
import * as bookmarkService from "../../services/bookmarks-service.js";

function Bookmarks(props) {
  const navigate = useNavigate();
  // const location = useLocation();
  const [profile, setProfile] = useState({});
  const colourStyles = {
    control: (styles) => ({ ...styles, backgroundColor: "white" }),
    option: (styles, { isDisabled }) => {
      return {
        ...styles,
        backgroundColor: isDisabled ? "#FAF5E4" : "#A85CF9",
        color: "#FFF",
        cursor: isDisabled ? "not-allowed" : "default",
      };
    },
  };
  // retrieve the currently logged in user
  useEffect(async () => {
    try {
      //            const user = await service.profile();
      //            console.log("user", user)
      //            setProfile(user);
    } catch (e) {
      navigate("/login");
    }
  }, []);

  const [bookmarkedTuits, setBookmarkedTuits] = useState([]);
  const [tags, setTags] = useState([]);
  const [filteredBookmarkedTuits, setFilteredBookmarkedTuits] = useState([]);
  const findTuitsIBookmarked = () => {
    console.log("find tuits bookmark");
    if (props.servertuitRecieved) {
      console.log(props.servertuitRecieved);
      setBookmarkedTuits(props.servertuitRecieved);
      setFilteredBookmarkedTuits(props.servertuitRecieved);
    } else {
      bookmarkService.findAllTuitsBookmarkedByUser("me").then((tuits) => {
        console.log(tuits);
        setBookmarkedTuits(tuits);
        setFilteredBookmarkedTuits(tuits);
      });

      bookmarkService.findAllTags("me").then((tags) => {
        console.log("TAGS");
        console.log(tags);
        const finalTags = tags.map((element) => {
          return { value: element, label: element };
        });
        setTags(finalTags);
      });
    }
  };
  useEffect(findTuitsIBookmarked, []);

  const [selectedOption, setSelectedOption] = useState(null);

  // Filter out the book marked tuits
  const filterBookMarkedTuits = (tag) => {
    if (tag !== "View All") {
      console.log(bookmarkedTuits);
      const filteredBookMarks = bookmarkedTuits.filter(
        (element) => element.tag === tag
      );
      setFilteredBookmarkedTuits(filteredBookMarks);
      console.log(filteredBookMarks);
    } else {
      console.log("VIEW ALL SELECTED");
      setFilteredBookmarkedTuits(bookmarkedTuits);
    }
  };
  // handle onChange event of the dropdown
  const handleChange = (e) => {
    e.label !== "View All" ? setSelectedOption(e) : setSelectedOption(null);
    filterBookMarkedTuits(e.label);
    console.log(e);
  };

  return (
    <div className="Bookmarks p-4" style={{ fontWeight: "bold" }}>
      <div className="bookmark-div">
        <h4
          style={{
            fontWeight: "bolder",

            color: "white",
            fontSize: "25px",
            paddingTop: "5px",
            textAlign: "center",
          }}
        >
          <i class="fa fa-bookmark"></i> My Bookmarks
        </h4>
        {props.tuitsData !== null ||
          (props.tuitsData !== undefined &&
            props.tuitsData.map((el) => <div> {el.tag}</div>))}

        <Tuits />
      </div>

      <div
        style={{
          marginTop: "2rem",
          width: "50%",
        }}
        className="dropdown-div"
      >
        <Select
          placeholder="Select Tag for filter"
          value={selectedOption} // set selected value
          options={tags} // set list of the data
          onChange={handleChange} // assign onChange function
          styles={colourStyles}
        />

        {selectedOption && (
          <div style={{ marginTop: 20, lineHeight: "18px" }}>
            {/* <b className="h4 mx-2">Selected tag :</b> */}
            {/* <b className="h4 mx-1">{selectedOption.label}</b> <br /> */}
            {/* <div>
              <b>Value: </b> {selectedOption.value}
            </div> */}
          </div>
        )}
      </div>
      <Tuits
        tuits={filteredBookmarkedTuits}
        refreshTuits={findTuitsIBookmarked}
      />
    </div>
  );
}

export default Bookmarks;
