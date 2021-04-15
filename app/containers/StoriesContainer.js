const { 
  getStoryIds, 
  // getStory
} = require("../services/hackingNewsAPI");
import { 
  // StyleSheet, 
  Text,
  View } from "react-native";

import React, { useEffect, useState } from "react";
import { Story } from "../components/Story";

export default function StoriesContainer() {
  const [storyIds, setStoryIds] = useState([]);

  useEffect(() => {
    getStoryIds().then(data => {
      setStoryIds(data);
      console.log(data);
    });
  }, []);

  return (
    <View><Text>Hacker news stories</Text>
      {storyIds.map(storyId => 
        <Story key={storyId} storyId={storyId}/>
      )}
    </View>
  );
}