import React from "react";


const TuitStats =  ({tuit, likeTuit, dislikeTuit}) => {

    console.log(typeof tuit.isDisliked)
    console.log(tuit._id, ": ", tuit.isLiked)
    console.log(tuit._id, ": ", tuit.isDisliked)

    return (
        <div className="row mt-2">
            <div className="col">
                <i className="far fa-message me-1"></i>
                {tuit.stats && tuit.stats.replies}
            </div>

            <div className="col">
                <i className="far fa-retweet me-1"></i>
                {tuit.stats && tuit.stats.retuits}
            </div>

            <div className="col">
              <span onClick={() => likeTuit(tuit)}>
                  {
                      // if user like this tuit, then render thumbs-up colored red
                      tuit.isLiked &&
                      <i className="fa-solid fa-thumbs-up" style={{color: 'red'}}/>
                      //<i className="far fa-thumbs-up me-1" style={{color: 'red'}}></i>
                  }
                  {
                      // user doesn't like this tuit
                      !tuit.isLiked &&
                      <i className="fa-regular fa-thumbs-up"/>
                  }

                  {
                      // display actual likes count
                      tuit.stats && tuit.stats.likes
                  }
              </span>
            </div>

            <div className="col">
              <span onClick={() => dislikeTuit(tuit)}>
                  {
                      // if user dislike this tuit, then render thumbs-down colored red
                      tuit.isDisliked &&
                      <i className="fa-solid fa-thumbs-down" style={{color: 'red'}}/>
                  }

                  {
                      !tuit.isDisliked &&
                      <i className="fa-regular fa-thumbs-down"/>
                  }

                  {
                      // display actual likes count
                      tuit.stats && tuit.stats.dislikes
                  }
              </span>
            </div>


            <div className="col">
                <i className="far fa-inbox-out"></i>
            </div>
        </div>
    );
}
export default TuitStats;