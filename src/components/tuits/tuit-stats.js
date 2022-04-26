import React from "react";


const TuitStats =  ({tuit, likeTuit, dislikeTuit}) => {

    console.log(typeof tuit.isDisliked)
    console.log(tuit._id, ": ", tuit.isLiked)
    console.log(tuit._id, ": ", tuit.isDisliked)

    return (
        <div className="row mt-2">
            <div className="col">
                <i className="far fa-message me-1"></i>
                {tuit.stats &&
                    <span className="ttr-stats-replies">{tuit.stats.replies}</span>
                }
            </div>

            <div className="col">
                <i className="far fa-retweet me-1"></i>
                {tuit.stats &&
                    <span className="ttr-stats-retuits">{tuit.stats.retuits}</span>
                }
            </div>

            <div className="col">
              <span className="ttr-like-tuit-click" onClick={() => likeTuit(tuit)}>
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
                  <span className="ttr-stats-likes">{tuit.stats && tuit.stats.likes}</span>
              </span>
            </div>

            <div className="col">
              <span className="ttr-dislike-tuit-click" onClick={() => dislikeTuit(tuit)}>
                  {
                      // if user dislike this tuit, then render thumbs-down colored red
                      tuit.isDisliked &&
                      <i className="fa-solid fa-thumbs-down" style={{color: 'red'}}/>
                  }

                  {
                      !tuit.isDisliked &&
                      <i className="fa-regular fa-thumbs-down"/>
                  }
                  <span className="ttr-stats-dislikes">{tuit.stats && tuit.stats.dislikes}</span>
              </span>
            </div>


            <div className="col">
                <i className="far fa-inbox-out"></i>
            </div>
        </div>
    );
}
export default TuitStats;