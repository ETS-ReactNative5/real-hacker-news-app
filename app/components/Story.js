import { Text, View, Linking, StyleSheet } from "react-native";

import React, { useEffect, useState } from "react";
import { getStory } from "../services/hackingNewsAPI";
// import { StoryWrapper } from "../styles/StoryStyles";

export const Story = (props) => {
  const [story, setStory] = useState({});

  useEffect(() => {
    getStory(props.storyId).then(data => {
      data && data.url && setStory(data);
      // console.log(data);
    }
    );
  }, []);

  return (story && story.url ? (
    <View style={styles.storyWrapper}>
      <Text>===========</Text>

      <Text>Id: {story.id}</Text>
      <Text>Title: {story.title}</Text>
      <Text>By: {story.by}</Text>
      <Text>Posted: {story.time}</Text>
      <Text style={{ color: "blue" }}
        onPress={() => Linking.openURL(story.url)}>link</Text>
      <Text>===========</Text>
    </View>) : null);
};
 
// export const StoryWrapper = styled.View`
// padding-top: 10px;
// margin-bottom: 20px;
// border-top: 1px solid #cccccc;

// &:first-of-type{
//     border-top:0;
// }

// &:last-of-type{
//     margin-bottom:0;
//     padding-bottom:0;
// }
// `;

const styles = StyleSheet.create({
  storyWrapper: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
    
  storyTitle: {
    // margin-bottom: 5px;
    // font-size:18 px;
    // line-height:1.8;
    // margin: 0;
    // text-decoration:none;
  },
  link: {
    //   color:#2e2e2c;
    //   backgroundColor:#f8dc3d;
    //   text-decoration: none;
  }

});