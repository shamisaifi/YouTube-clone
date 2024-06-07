import { Box, CardContent, CardMedia, Typography } from "@mui/material";

const VideoCommentProfile = ({ channelDetail }) => {
  return (
    <Box>
      <CardContent>
        <CardMedia
          image={
            channelDetail?.snippet?.topLevelComment?.snippet
              ?.authorProfileImageUrl
          }
          sx={{
            borderRadius: "50%",
            height: "40px",
            width: "40px",
            border: "1px solid white",
          }}
        />
      </CardContent>
    </Box>
  );
};

export default VideoCommentProfile;
