import * as service from "../../services/bookmarks-service.js"
import {useEffect, useState} from "react";
import Tuits from "../tuits";

const MyBookmarks = () => {
    const [bookmarkedTuits, setBookmarkedTuits] = useState([]);
    const findTuitsIBookmarked = () =>
        service.findAllTuitsBookmarkedByUser("me")
            .then((tuits) => setBookmarkedTuits(tuits));
    useEffect(findTuitsIBookmarked, []);

    return(
        <div>
            <Tuits tuits={bookmarkedTuits} refreshTuits={findTuitsIBookmarked}/>
        </div>
    );
};
export default MyBookmarks;