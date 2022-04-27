import React from "react";
import "./tuits.css";
const TuitStats = ({ tuit, likeTuit, dislikeTuit, bookmarkTuit }) => {
  console.log(typeof tuit.isDisliked);
  console.log(tuit._id, ": ", tuit.isLiked);
  console.log(tuit._id, ": ", tuit.isDisliked);

  return (
    <div className="row mt-2 icons " style={{ width: "370px" }}>
      <div className="col">
        <i className="far fa-message me-1"></i>
        {tuit.stats && (
          <span className="ttr-stats-replies mx-1">{tuit.stats.replies}</span>
        )}
      </div>

      <div className="col">
        <i className="far fa-retweet me-1"></i>
        {tuit.stats && (
          <span className="ttr-stats-retuits mx-1">{tuit.stats.retuits}</span>
        )}
      </div>

      <div className="col">
        <span className="ttr-like-tuit-click" onClick={() => likeTuit(tuit)}>
          {
            // if user like this tuit, then render thumbs-up coloblack black
            tuit.isLiked && (
              <i className="fa-solid fa-thumbs-up" style={{ color: "black" }} />
            )
            //<i className="far fa-thumbs-up me-1" style={{color: 'black'}}></i>
          }
          {
            // user doesn't like this tuit
            !tuit.isLiked && <i className="fa-regular fa-thumbs-up" />
          }
          <span className="ttr-stats-likes mx-1">
            {tuit.stats && tuit.stats.likes}
          </span>
        </span>
      </div>

      <div className="col">
        <span
          className="ttr-dislike-tuit-click"
          onClick={() => dislikeTuit(tuit)}
        >
          {
            // if user dislike this tuit, then render thumbs-down coloblack black
            tuit.isDisliked && (
              <i
                className="fa-solid fa-thumbs-down"
                style={{ color: "black" }}
              />
            )
          }

          {!tuit.isDisliked && <i className="fa-regular fa-thumbs-down" />}
          <span className="ttr-stats-dislikes mx-1">
            {tuit.stats && tuit.stats.dislikes}
          </span>
        </span>
      </div>

      <div className="col">
        <span
          className="ttr-bookmark-tuit-click"
          onClick={() => bookmarkTuit(tuit)}
        >
          {
            // if user bookmarks this tuit, then render shaded bookmark icon
            tuit.isBookmarked && (
              <i className="fa-solid fa-bookmark" style={{ color: "black" }} />
            )
            //<i className="far fa-thumbs-up me-1" style={{color: 'black'}}></i>
          }
          {
            // user doesn't bookmark this tuit
            !tuit.isBookmarked && <i class="fa-regular fa-bookmark"></i>
          }
          <span className="ttr-stats-likes mx-1 ">
            {tuit.stats && tuit.stats.bookmarks}
          </span>
        </span>
      </div>

      <div className="col">
        <i className="far fa-inbox-out"></i>
      </div>
    </div>
  );
};
export default TuitStats;
