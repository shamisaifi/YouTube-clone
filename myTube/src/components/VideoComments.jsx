import { React, useState, useEffect } from "react";
import { fetchFromAPI } from "../utils/fetchFromAPI";
import VideoCommentProfile from "./VideoCommentProfile";
import { BiLike } from "react-icons/bi";
import { Link } from "react-router-dom";

const VideoComments = ({ id }) => {
  const [videoComment, setVideoComment] = useState([]);
  // console.log("comments: ", videoComment);

  useEffect(() => {
    fetchFromAPI(`commentThreads?part=snippet&videoId=${id}`).then((data) => {
      setVideoComment(data.items);
    });
  });

  if (!videoComment) {
    return "loading";
  }

  return (
    <div style={{ color: "white", fontFamily: "sans-serif", padding: "20px " }}>
      <h3 style={{ margin: "0 0 20px 20px" }}>Comments</h3>
      {videoComment.map((res, idx) => (
        <div
          key={idx}
          style={{
            padding: "10px ",
            margin: "10px",
            display: "flex",
            fontSize: ".8rem",
            border: "1px solid white",
            borderRadius: "10px",
          }}
        >
          <div style={{ paddingRight: "15px", padding: "0" }}>
            <VideoCommentProfile channelDetail={res} />
          </div>
          <div>
            <Link
              to={`${res.snippet.topLevelComment.snippet.authorChannelUrl}`}
              style={{ color: "white" }}
            >
              <h4 style={{ marginBottom: "8px" }}>
                {`${res.snippet.topLevelComment.snippet.authorDisplayName}`}
              </h4>
            </Link>
            <p>{res.snippet.topLevelComment.snippet.textDisplay}</p>
            <div
              style={{
                marginTop: "8px",
                display: "flex",
                // flexDirection: "column",
              }}
            >
              <BiLike style={{ fontSize: "1.2rem" }} />
              <p style={{ fontSize: "1rem", marginLeft: "5px" }}>
                {res.snippet.topLevelComment.snippet.likeCount}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VideoComments;
