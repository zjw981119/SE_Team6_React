import React from "react";
import './tuits.css';
import Tuit from "./tuit";
import * as service from "../../services/tuits-service";
const Tuits = ({tuits = [], refreshTuits}) => {

    const deleteTuit = (tid) =>
        service.deleteTuit(tid)
            .then(refreshTuits);

    return (
    <div>
      <ul className="ttr-tuits list-group">
        {
            tuits.map && tuits.map(tuit => {
            return (
              <Tuit key={tuit._id} deleteTuit={deleteTuit} tuit={tuit}/>
            );
          })
        }
      </ul>
    </div>
  );
}

export default Tuits;