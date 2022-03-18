import {useEffect, useState} from "react";
import * as service from "../../services/tuits-service";
import Tuits from "../tuits";

const MyTuits = () => {
    const [tuits, setTuits] = useState([]);
    const findMyTuits = () =>
        service.findTuitsByUser("my")
            .then(tuits => setTuits(tuits));
    console.log(tuits)
    // on load invoke findMyTuits
    useEffect(findMyTuits, []);
    return(
        // render my tuits and pass refresh(findMyTuits) event handler
        <Tuits tuits={tuits}
               refreshTuits={findMyTuits}/>
    );
};

export default MyTuits;