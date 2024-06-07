import { React, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { Typography, Box, Stack, CircularProgress } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import { fetchFromAPI } from "../utils/fetchFromAPI";
import Videos from "./Videos";
import VideoComments from "./VideoComments";
import { BiLike } from "react-icons/bi";

const VideoDetail = () => {
  const [videoDetail, setVideoDetail] = useState(null);
  const [videos, setVideos] = useState(null);
  const [loading, setLoading] = useState(true);
  const [follow, setFollow] = useState(false);
  const { id } = useParams();

  // console.log(videoDetail);

  useEffect(() => {
    fetchFromAPI(`videos?part=snippet&statistics&id=${id}`).then((data) => {
      setVideoDetail(data.items[0]);
      setLoading(false);
    });

    fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`).then(
      (data) => setVideos(data.items)
    );
  }, [id]);

  const handleFollow = () => {
    !follow ? setFollow(true) : setFollow(false);
  };

  if (loading) {
    return (
      <Box
        minHeight="95vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!videoDetail?.snippet) {
    return "loading...";
  }

  const {
    snippet: { title, channelId, channelTitle },
    statistics: { viewCount, likeCount },
  } = videoDetail;

  return (
    <Box minHeight="95vh" fontFamily="sans-serif">
      <Stack direction={{ xs: "column", md: "row" }}>
        <Box flex={1}>
          <Box
            sx={{ width: "100%", top: "86px" }}
            borderBottom="1px solid white"
          >
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${id}`}
              className="react-player"
              controls
            />

            <Typography color="white" variant="h5" fontWeight="bold" p={2}>
              {title}
            </Typography>
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ color: "#fff" }}
              py={1}
              px={2}
            >
              <div>
                <Link to={`/channel/${channelId}`}>
                  <Typography
                    variant={{ sm: "subtitle1", md: "h6" }}
                    color="#fff"
                  >
                    {" "}
                    {channelTitle}
                    <CheckCircle
                      sx={{ fontSize: "12px", color: "grey", ml: "5px" }}
                    />
                  </Typography>
                </Link>

                <button
                  onClick={handleFollow}
                  type="button"
                  style={{
                    padding: "5px 10px",
                    fontWeight: "bold",
                    borderRadius: "5px",
                    outline: "none",
                    border: "none",
                    marginLeft: "15px",
                    cursor: "pointer",
                  }}
                >
                  {!follow ? "follow" : "following"}
                </button>
              </div>

              <Stack direction="row" gap="20px" alignItems="center">
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  {parseInt(likeCount).toLocaleString()}{" "}
                  <BiLike fontWeight="bold" />
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ opacity: 0.7, fontWeight: "bold" }}
                >
                  {parseInt(viewCount).toLocaleString()} views
                </Typography>
              </Stack>
            </Stack>
          </Box>
          <Box px={2} py={{ md: 1, xs: 5 }}>
            <VideoComments id={id} />
          </Box>
        </Box>
        <Box
          px={2}
          py={{ md: 1, xs: 5 }}
          justifyContent="center"
          alignItems="center"
        >
          <Videos videos={videos} direction="column" />
        </Box>
      </Stack>
    </Box>
  );
};

export default VideoDetail;
