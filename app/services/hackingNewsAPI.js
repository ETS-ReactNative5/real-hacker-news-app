/* eslint-disable indent */
import axios from "axios";

export const baseUrl = "https://hacker-news.firebaseio.com/v0";

export const newStoriesUrl = `${baseUrl}/newstories.json`;
export const bestStoriesUrl = `${baseUrl}/beststories.json`;
export const topStoriesUrl = `${baseUrl}/topstories.json`;

export const storyUrl = `${baseUrl}/item/`;

export const commentUrl = `${baseUrl}/item/2921983.json?print=pretty`;

export const getComment = async (storyId) => {
  const result = await axios
    .get(`${storyUrl}${storyId}.json`)
    .then(({ data }) => data);
  return result;
};

export const getStory = async (storyId) => {
  const result = await axios
    .get(`${storyUrl}${storyId}.json`)
    .then(({ data }) => data);
  return result;
};

export const getStoryIds = async (type) => {
  // console.log(type);
  let newsType =
    type === "n"
      ? newStoriesUrl
      : type === "b"
      ? bestStoriesUrl
      : type === "t"
      ? topStoriesUrl
      : newStoriesUrl;
  const result = await axios.get(newsType).then(({ data }) => data);
  return result;
};

export const getMeta = async (holyUrl) => {
  // console.log("holyUrl", holyUrl);
  const result = await axios
    .get(
      `https://api.microlink.io/?url=${holyUrl}&audio=false&iframe=false&palette=false&screenshot=false&video=falses`
    )
    .catch((data) => console.log(data))
    .then(({ data }) => data);
  // .then((data) => console.log(data));
  return result;
};
