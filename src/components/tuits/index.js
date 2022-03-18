import React from "react";
import './tuits.css';
import Tuit from "./tuit";
import * as service from "../../services/tuits-service";
import * as likesService from "../../services/likes-service";
const Tuits = ({tuits = [], refreshTuits}) => {

    const likeTuit = (tuit) =>
        likesService.userLikesTuit("me", tuit._id)
            .then(refreshTuits)
            .catch(e => alert(e))

    const deleteTuit = (tid) =>
        service.deleteTuit(tid)
            .then(refreshTuits);

    return (
    <div>
      <ul className="ttr-tuits list-group">
        {
            tuits.map && tuits.map(tuit => {
            return (
                <Tuit key={tuit._id}
                      deleteTuit={deleteTuit}
                      likeTuit={likeTuit}
                      tuit={tuit}/>
            );
          })
        }
      </ul>
    </div>
  );
}

export default Tuits;