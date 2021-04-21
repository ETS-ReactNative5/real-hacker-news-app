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
  let newsType =
    type === 1
      ? newStoriesUrl
      : type === 2
      ? bestStoriesUrl
      : type === 2
      ? topStoriesUrl
      : newStoriesUrl;
  const result = await axios.get(newsType).then(({ data }) => data);
  return result;
};
