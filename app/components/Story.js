import { View, Linking} from "react-native";

import React, { useEffect, useState, memo } from "react";
import { getStory } from "../services/hackingNewsAPI";
import { mapTime } from "../mappers/mapTime";
import { Card, CardItem, Body, Text } from "native-base";

export const Story = memo(function Story(props) {
  const [story, setStory] = useState({});

  useEffect(() => {
    getStory(props.storyId).then(data => {
      data && data.url && setStory(data);
    }
    );
  }, []);
  let date = new Date(story.time*1000).toDateString();

  return (story && story.url ? (
    <Card >
      <CardItem>
        <Body>
          <View >
            <Text style={{fontWeight: "bold"}}>{story.title}</Text>
            {/* <Text>Rating:  {(() => {
              switch (true) {
              case (story.score===1):   return ` (${story.score})⭐`;
              case (story.score===2): return  `(${story.score})⭐⭐`;
              case (story.score===3):  return  `(${story.score})⭐⭐⭐`;
              case (story.score===4):  return  `(${story.score})⭐⭐⭐⭐`;
              case (story.score===5):  return `(${story.score})⭐⭐⭐⭐⭐`;
              case (story.score>5):  return `(${story.score})⭐⭐⭐⭐⭐+`;
              default:      return "=)";
              }
            })()}</Text>  */}
            <Text>Rating: {story.score}</Text> 
            <Text>By: {story.by}</Text>
            <Text>Id: {story.id}</Text> 
            <Text>Publish date: {date} </Text>
            <Text>Posted: {mapTime(story.time)} ago</Text>
            <Text style={{ color: "blue" }}
              onPress={() => Linking.openURL(story.url)}>link</Text>
          </View>
        </Body>
      </CardItem>
    </Card>) : null);

});
