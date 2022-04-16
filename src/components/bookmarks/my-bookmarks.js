//import * as service from "../../services/bookmarks-service.js"
import * as service from "../../services/tuits-service.js"
import {useEffect, useState} from "react";
import Tuits from "../tuits";

const MyBookmarks = ({profile}) => {
    const [bookmarkedTuits, setBookmarkedTuits] = useState([]);
    const findTuitsIBookmarked = () =>{
    console.log("find tuits bookmark");
//        service.findAllTuitsBookmarkedByUser("me")
//            .then((tuits) => setBookmarkedTuits(tuits));
        service.findAllTuits()
            .then((tuits) => setBookmarkedTuits(tuits));

            }
    useEffect(findTuitsIBookmarked, []);

    return(
        <div>
            <Tuits tuits={bookmarkedTuits} refreshTuits={findTuitsIBookmarked}/>
        </div>
    );
};
export default MyBookmarks;