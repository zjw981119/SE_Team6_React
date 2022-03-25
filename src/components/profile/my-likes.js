import * as service from "../../services/likes-service";
import {useEffect, useState} from "react";
import Tuits from "../tuits";

const MyLikes = () => {
    const [likedTuits, setLikedTuis] = useState([]);
    const findTuitsILike = () =>
        service.findAllTuitsLikedByUser("me")
            .then((tuits) => setLikedTuis(tuits));
    useEffect(findTuitsILike, []);

    return(
        <div>
            <Tuits tuits={likedTuits} refreshTuits={findTuitsILike}/>
        </div>
    );
};
export default MyLikes;