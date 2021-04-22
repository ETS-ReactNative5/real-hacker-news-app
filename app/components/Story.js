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
  Right,
} from "native-base"; // Right,

import { Linking, RefreshControl } from "react-native";

export const Story = memo(function Story(props) {
  //set story
  const [story, setStory] = useState({});

  //refreshing
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // console.log("story refresh");

    getStory(props.storyId)
      .then((data) => data && data.url && setStory(data))
      .then(() => setRefreshing(false));
  }, []);

  //useEffect for initialize and interval refreshing
  useEffect(() => {
    setRefreshing(true);

    getStory(props.storyId)
      .then((data) => data && data.url && setStory(data))
      .then(() => setRefreshing(false));
    // .then(()=>{console.log("story useEffect refresh");});

    //set interval for repeating refresh
    const interval = setInterval(() => {
      setRefreshing(true);

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
      <CardItem
        header
        style={{
          flexDirection: "row",
          margin: 0,
          padding: 0,
          backgroundColor: "#ecf0f1",
        }}
      >
        <Left
          style={{
            margin: -10,
            padding: 0,
          }}
        >
          <Icon name="newspaper-outline" style={{ fontSize: 48 }} />
          <Body>
            <Text style={{ fontWeight: "bold" }}>{story.title}</Text>
          </Body>
        </Left>
      </CardItem>
      <CardItem header>
        <Right style={{ alignItems: "flex-start", margin: -10, padding: 0 }}>
          <Text note>By: {story.by}</Text>
          <Text note>Rating: {story.score}</Text>
          <Text note>{date}</Text>
        </Right>
        <Right
          style={{
            justifyContent: "flex-start",
            margin: -10,
            padding: 0,
          }}
        >
          <Text note>Type: {story.type}</Text>
          <Text note>{mapTime(story.time)} ago</Text>
          {story.kids ? (
            <Text note style={{ color: "grey" }}>
              Total comments: {story.kids.length}
            </Text>
          ) : (
            <Text note>No comments yet</Text>
          )}
        </Right>
      </CardItem>
      {/* END HEADER OF A STORY */}

      {/* FOOTER OF A STORY */}
      <CardItem footer bordered>
        <Body
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            margin: -10,
            padding: 0,
          }}
        >
          <Button
            style={{ margin: 0, padding: 0 }}
            info
            onPress={() => Linking.openURL(story.url)}
          >
            <Text>Open link</Text>
          </Button>
          <Button
            disabled={false}
            style={{ margin: 0, padding: 0 }}
            warning
            onPress={() => {
              props.navigation.navigate("Comments", {
                story,
              });
            }}
          >
            <Text>Show more</Text>
          </Button>
        </Body>
      </CardItem>
      {/* FOOTER OF A STORY */}
    </Card>
  ) : null;
});
