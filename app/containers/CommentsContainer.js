import React, { useEffect, useState } from "react";

import {
  Container,
  Content,
  Card,
  CardItem,
  Text,
  Button,
  Icon,
  Left,
  Body,
  // Right,
  // Thumbnail,
  Spinner,
} from "native-base";

import { WebView } from "react-native-webview";

// import Microlink from "@microlink/react"; // might work someday

import { Comment } from "../components/Comment";
import { getStory, getMeta } from "../services/hackingNewsAPI";
import { RefreshControl, Image, Linking } from "react-native";
// import axios from "axios";

import HTML from "react-native-render-html";

//SCROLLVIEW INFINITE SCROLL (+100 causes earlier scroll update)
const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
  // console.log({ layoutMeasurement, contentOffset, contentSize });
  const paddingToBottom = 20;
  return (
    layoutMeasurement.height + contentOffset.y + 100 >=
    contentSize.height - paddingToBottom
  );
};
//SCROLLVIEW INFINITE SCROLL

// export const getMeta = async (holyUrl) => {
//   console.log("holyUrl", holyUrl);
//   const result = await axios
//     .get(
//       `https://api.microlink.io/?url=${holyUrl}&audio=false&iframe=false&palette=false&screenshot=false&video=falses`
//     )
//     .catch((data) => console.log(data))
//     .then(({ data }) => data);
//   // .then((data) => console.log(data));
//   return result;
// };

export default function CommentsContainer({ route, navigation }) {
  let props = route.params;

  //set preview
  const [previewData, setPreviewData] = useState({});

  //set number comments to show
  const [commentsToShow, setCommentsToShow] = useState(5);

  const handleSetCommentsToShow = () => {
    if (props.story.kids) {
      if (commentsToShow < props.story.kids.length) {
        setCommentsToShow(commentsToShow + 5);
      } else {
        setCommentsToShow(props.story.kids.length);
      }
    }
  };

  //get id array from props and set
  const [comments, setComments] = useState({});

  // refreshing
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // console.log("story refresh");

    getStory(props.story.id)
      .then((data) => data.kids && setComments(data.kids))
      // .then((data) => console.log(data))
      .then(() => setRefreshing(false));
  }, []);

  //get meta once
  useEffect(() => {
    setRefreshing(true);

    getMeta(props.story.url)
      .catch((data) => {
        console.log("datac", data);
        setPreviewData({
          status:
            "The description is unavailable because the limit of requests is exceeded :(",
        });
        return {
          status:
            "The description is unavailable because the limit of requests is exceeded :(",
        };
      })
      .then((data) => {
        console.log("not parsed", data);
        setPreviewData(data);
      })
      .then(() => setRefreshing(false));
    return () => {
      console.log("oops i did it again");
      setPreviewData({});
    };
  }, []);

  //useEffect for initialize and interval refreshing
  useEffect(() => {
    //extrastep for exclude error of empty array of comments
    setComments(props.story.kids);

    setRefreshing(true);

    getStory(props.story.id)
      .then((data) => data.kids && setComments(data.kids))
      .then(() => setRefreshing(false));

    //set interval for repeating refresh
    const interval = setInterval(() => {
      setRefreshing(true);

      getStory(props.story.id)
        .then((data) => data.kids && setComments(data.kids))
        .then(() => setRefreshing(false));
      // .then(()=>{console.log("story auto refresh");});
      console.log(previewData);
    }, 15000);

    //and clear it :)
    return () => clearInterval(interval);
  }, []);

  //alternate useEffect
  // useEffect(() => {
  //   setComments(props.story.kids);
  // }, []);

  //date converting
  let date = new Date(props.story.time * 1000).toDateString();

  return (
    <Container>
      <Content
        onScroll={({ nativeEvent }) => {
          if (isCloseToBottom(nativeEvent)) {
            handleSetCommentsToShow();
          }
        }}
        scrollEventThrottle={400}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Card>
          <CardItem>
            <Left>
              <Icon name="newspaper-outline" />
              <Body>
                <Text style={{ fontWeight: "bold" }}>{props.story.title}</Text>
                <Text note>{date}</Text>
              </Body>
            </Left>
            {/* {previewData.status !==
              "The description is unavailable because the limit of requests is exceeded :(" &&
              previewData.data && (
                <Right>
                  <Thumbnail square small source={previewData.data.logo.url} />
                </Right>
              )} */}
          </CardItem>
          {previewData.status !==
            "The description is unavailable because the limit of requests is exceeded :(" &&
            previewData.data && (
              <CardItem>
                <Text
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                  }}
                >
                  {previewData.data.title}
                </Text>
              </CardItem>
            )}
          <CardItem cardBody>
            {previewData.status !==
              "The description is unavailable because the limit of requests is exceeded :(" &&
              previewData.data &&
              previewData.data.image && (
                <Image
                  source={{ uri: previewData.data.image.url }}
                  style={{
                    height: 200,
                    width: 200,
                    flex: 1,
                    resizeMode: "cover",
                  }}
                />
              )}
            {!previewData.data &&
              previewData.status !==
                "The description is unavailable because the limit of requests is exceeded :(" && (
                <Body
                  style={{
                    justifyContent: "center",
                    textAlign: "center",
                    alignItems: "center",
                    alignContent: "center",
                  }}
                >
                  <Spinner color="blue" />
                </Body>
              )}
          </CardItem>
          <CardItem
            bordered
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            <Body>
              {previewData.data && (
                <Text>{previewData.data.description} </Text>
                // <HTML source={{ html: previewData.data.description }} />
              )}
              {previewData.status ===
                "The description is unavailable because the limit of requests is exceeded :(" && (
                <Text>{previewData.status}</Text>
              )}
              {props.story.kids ? (
                <Text style={{ color: "grey" }}>
                  Total comments: {props.story.kids.length}
                </Text>
              ) : (
                <Text style={{ color: "grey" }}>No comments yet</Text>
              )}
            </Body>
          </CardItem>
          <CardItem footer bordered style={{ justifyContent: "space-between" }}>
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
                onPress={() => Linking.openURL(props.story.url)}
              >
                <Text>Open link</Text>
              </Button>
              <Button
                style={{ margin: 0, padding: 0 }}
                danger
                onPress={() => {
                  navigation.pop();
                }}
              >
                <Text>Back to news page</Text>
              </Button>
            </Body>
          </CardItem>
        </Card>
        {comments &&
          comments.length > 0 &&
          comments
            .slice(0, commentsToShow)
            .map((commentId) => (
              <Comment key={commentId} commentId={commentId} />
            ))}
      </Content>
    </Container>
  );
}
