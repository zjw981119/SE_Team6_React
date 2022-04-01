import Tuit from "./tuit";

const Tuits = ({tuits = []}) => {
    return (
        <div>
            {
                tuits.map(tuit =>
                    <Tuit
                        key={tuit._id}
                        tuit={tuit}
                    />
                )
            }
        </div>
    )
}
export default Tuits;