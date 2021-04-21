import React, { useEffect, useState, memo } from "react";
import {
  getStory,
  // getMeta
} from "../services/hackingNewsAPI";
import { mapTime } from "../mappers/mapTime";
import {
  Card,
  CardItem,
  Body,
  Text,
  Left,
  Icon,
  Button,
  // Right,
  // Thumbnail,
  // Spinner,
} from "native-base"; // Right,

import { Linking, RefreshControl } from "react-native";

// import { Actions } from "react-native-router-flux"; !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1
// import RNUrlPreview from "react-native-url-preview"; //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

export const Story = memo(function Story(props) {
  //setPreview
  // const [previewData, setPreviewData] = useState({});

  //set story
  const [story, setStory] = useState({});

  //refreshing
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // console.log("story refresh");

    // getMeta(story.url).then((res) => setPreviewData(res));

    getStory(props.storyId)
      .then((data) => data && data.url && setStory(data))
      .then(() => setRefreshing(false));
  }, []);

  //useEffect for initialize and interval refreshing
  useEffect(() => {
    setRefreshing(true);

    // getMeta(story.url).then((res) => setPreviewData(res));

    // getStory(props.storyId)
    //   .then(function (data) {
    //     data && data.url && setStory(data);
    //     return data;
    //   })
    //   .then((data) => {
    //     data &&
    //       data.url &&
    //       getMeta(data.url).then((res) => setPreviewData(res));
    //   })

    //   .then(() => setRefreshing(false));

    getStory(props.storyId)
      .then((data) => data && data.url && setStory(data))
      .then(() => setRefreshing(false));
    // .then(()=>{console.log("story useEffect refresh");});

    //set interval for repeating refresh
    const interval = setInterval(() => {
      setRefreshing(true);

      // getMeta(story.url).then((res) => setPreviewData(res));

      getStory(props.storyId)
        .then((data) => data && data.url && setStory(data))
        .then(() => setRefreshing(false));
      // .then(()=>{console.log("story auto refresh");});
    }, 45000);

    //and clear it :)
    return () => clearInterval(interval);
  }, []);

  //date converting
  let date = new Date(story.time * 1000).toDateString();

  return story && story.url ? (
    <Card
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* HEADER OF A STORY */}
      <CardItem header>
        <Left>
          <Icon name="newspaper-outline" />
          <Body>
            <Text style={{ fontWeight: "bold" }}>{story.title}</Text>
            <Text note>By: {story.by}</Text>
            <Text note>Rating: {story.score}</Text>
            <Text note>{date}</Text>
          </Body>
        </Left>
      </CardItem>
      {/* END HEADER OF A STORY */}

      {/* BODY OF A STORY */}
      <CardItem></CardItem>
      <CardItem style={{ justifyContent: "flex-end" }}>
        {/* <Body style={{ color: "blue" }}> */}
        {/* <Right> */}
        {/* <RNUrlPreview text={story.url} /> */}
        {/* <Text>Press to open in browser</Text> */}
        <Button
          style={{ alignSelf: "flex-end" }}
          info
          onPress={() => Linking.openURL(story.url)}
        >
          <Text>Open link</Text>
        </Button>
        {/* </Right> */}
        {/* </Body> */}
      </CardItem>
      {/* END BODY OF A STORY */}

      {/* FOOTER OF A STORY */}
      <CardItem footer bordered style={{ justifyContent: "space-between" }}>
        {story.kids ? (
          <Text
            style={{ color: "blue" }}
            onPress={() => {
              props.navigation.navigate("Comments", {
                story,
              });
              // Actions.pageTwo({ story });!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            }}
          >
            Show comments({story.kids.length})
          </Text>
        ) : (
          <Text style={{ color: "grey" }}>No comments yet</Text>
        )}

        {/* onPress={() => Linking.openURL(story.url)}>link</Text> */}
        <Text>{mapTime(story.time)} ago</Text>
        {/* <Accordion dataArray={dataArray} expanded={0}/> */}
      </CardItem>
      {/* FOOTER OF A STORY */}
    </Card>
  ) : null;
});
