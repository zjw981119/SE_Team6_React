
import React, {useEffect, useState} from "react";

import Tuits from "../tuits";
import './bookmarks.css';

import Select from 'react-select';

function Bookmarks () {


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
    setSelectedOption(e);
  }

  return (

    <div className="Bookmarks">

      <div>
          <h1> My Bookmarks</h1>
        <Tuits/>
      </div>

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
  );
}

export default Bookmarks;