import * as service from "../../services/dislikes-service";
import {useEffect, useState} from "react";
import Tuits from "../tuits";

const MyDislikes = () => {
    const [dislikedTuits, setDislikedTuis] = useState([]);
    const findTuitsIDislike = () =>
        service.findAllTuitsDisLikedByUser("me")
            .then((tuits) => setDislikedTuis(tuits));

    useEffect(findTuitsIDislike, []);

    return(
        <div>
            <Tuits tuits={dislikedTuits} refreshTuits={findTuitsIDislike}/>
        </div>
    );
};
export default MyDislikes;