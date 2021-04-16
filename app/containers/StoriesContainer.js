import { 
  View, 
  TouchableOpacity
} from "react-native";

import React, { useEffect, useState } from "react";
import { Story } from "../components/Story";


import { Container, Content, Text, Card, Header, Body, Button, Title, CardItem } from "native-base";
import { Actions } from "react-native-router-flux";



const { 
  getStoryIds, 
  // getStory
} = require("../services/hackingNewsAPI");

export default function StoriesContainer() {

  const [storyIds, setStoryIds] = useState([]);
  
  useEffect(() => {
    getStoryIds().then(data => {
      setStoryIds(data);
    });
    setInterval(() => {
      console.log("df");
    }, 10000);
  }, []);

  return (
    <View>
      {storyIds.slice(0, 100).map(storyId => 
        <TouchableOpacity key={storyId}
        // style={styles.button}
          onPress= {() => {Actions.pageTwo(); }}
        > 
          <Story key={storyId} storyId={storyId}/>
        </TouchableOpacity>
      )}
    </View>
  );
}
