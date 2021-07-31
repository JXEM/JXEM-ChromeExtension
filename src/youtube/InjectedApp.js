import React, { useState, useEffect } from "react";
import styled from "styled-components";
import queryString from "query-string";
import axios from "axios";

const YOUTUBE_API_KEY = "AIzaSyD8Sgttgum-4m11HcR0UozmI9VYkdl0Z8Q";

const Wrapper = styled.div`
  width: 100%;
  height: 360px;
  border: 2px solid black;
  padding: 10px;
  box-sizing: border-box;
  margin-bottom: 20px;
`;

const FlexControl = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: scroll;
`;

const VideoInfo = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 24px;
  border-bottom: 1px solid #363636;
  margin-bottom: 24px;
`;

const Title = styled.div`
  width: 100%;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;
`;

const ViewCount = styled.div`
  width: 100%;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 16px;
`;

const Tags = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: flex-start;
`;

const Tag = styled.div`
  font-size: 16px;
  height: 24px;
  display: flex;
  align-items: center;
  padding: 0px 8px;
  margin-right: 4px;
  margin-bottom: 4px;
  border: 1px solid #e6e6e6;
  border-radius: 12px;
`;

const Comment = styled.div`
  font-size: 16px;
  border: 1px solid black;
  background-color: #f3e5ab;
  margin-bottom: 8px;
  padding: 8px;
  border-radius: 4px;
`;

const InjectedApp = () => {
  const [videoId, setVideoId] = useState("");
  const [videoInfo, setVideoInfo] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const { v } = queryString.parse(location.search);
    setVideoId(v);
    console.log(process.env);
  }, [location.search]);

  useEffect(() => {
    async function getVideoInfo() {
      const url = "https://www.googleapis.com/youtube/v3/videos";
      const {
        data: { items },
      } = await axios(url, {
        method: "GET",
        params: {
          key: YOUTUBE_API_KEY,
          id: videoId,
          part: "snippet,statistics",
        },
      });

      const result = items[0];

      const newVideoInfo = {
        title: result.snippet.title,
        viewCount: Number(result.statistics.viewCount),
        tags: result.snippet.tags,
      };

      setVideoInfo(newVideoInfo);
      console.log(items[0]);
    }
    async function getComments() {
      const url = "https://www.googleapis.com/youtube/v3/commentThreads";
      const {
        data: { items },
      } = await axios(url, {
        method: "GET",
        params: {
          key: YOUTUBE_API_KEY,
          videoId: videoId,
          part: "snippet",
        },
      });

      setComments(
        items.map((item) => item.snippet.topLevelComment.snippet.textOriginal)
      );
      console.log(items);
    }

    if (videoId !== "") {
      getVideoInfo();
      getComments();
    }
  }, [videoId]);

  function AddComma(num) {
    var regexp = /\B(?=(\d{3})+(?!\d))/g;
    return num.toString().replace(regexp, ",");
  }

  return (
    <Wrapper id="JXEM-memo">
      <FlexControl>
        {videoInfo !== null && (
          <VideoInfo>
            <Title>{videoInfo.title}</Title>
            <ViewCount>조회수 : {AddComma(videoInfo.viewCount)}</ViewCount>
            <Tags>
              {videoInfo.tags.map((tag) => (
                <Tag>{tag}</Tag>
              ))}
            </Tags>
          </VideoInfo>
        )}
        {comments.map((comment) => (
          <Comment>{comment}</Comment>
        ))}
      </FlexControl>
    </Wrapper>
  );
};

export default InjectedApp;
