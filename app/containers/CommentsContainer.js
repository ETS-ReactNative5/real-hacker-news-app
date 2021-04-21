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
  Right,
  Thumbnail,
  Spinner,
  Image,
} from "native-base";

// import { Actions } from "react-native-router-flux";!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// import { LinkPreview } from "@flyerhq/react-native-link-preview";
// import { getLinkPreview, getPreviewFromContent } from "link-preview-js";
// import { ReactTinyLink } from "react-tiny-link";
// import LinkPreviewCus from "../utils/LinkPreview";
// import Microlink from "@microlink/react"; // might work someday
// import { useScrapper } from "react-tiny-link";

import { Comment } from "../components/Comment";
import { getStory, getMeta } from "../services/hackingNewsAPI";
import { RefreshControl } from "react-native";

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

export default function CommentsContainer({ route, navigation }) {
  // const [previewContainer, setPreviewContainer] = useState({});
  // console.log(navigation);

  let props = route.params;

  // console.log(props.story.id);
  const [previewData, setPreviewData] = useState({});

  //set number comments to show
  const [commentsToShow, setCommentsToShow] = useState(5);

  const handleSetCommentsToShow = () => {
    if (commentsToShow < props.story.kids.length) {
      setCommentsToShow(commentsToShow + 5);
    } else {
      setCommentsToShow(props.story.kids.length);
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

  //useEffect for initialize and interval refreshing
  useEffect(() => {
    //extrastep for exclude error of empty array of comments
    setComments(props.story.kids);

    setRefreshing(true);

    //!!!!!!!!!!!!!!!
    getStory(props.story.id)
      .then(function (data) {
        data.kids && setComments(data.kids);
        return data;
      })
      .then((data) => {
        data && getMeta(props.story.url).then((res) => setPreviewData(res));
      })
      .then(() => setRefreshing(false));
    // .then((res) => console.log(res));
    //!!!!!!!!!!!!!!!

    //that
    // getStory(props.story.id)
    //   .then((data) => data.kids && setComments(data.kids))
    //   .then(() => setRefreshing(false));
    //that

    // .then(()=>{console.log("story useEffect refresh");});

    // getLinkPreview("https://www.youtube.com/watch?v=MejbOFk7H6c").then(
    //   (data) => {
    //     console.log(data);
    //     setPreviewContainer(data);
    //   }
    // );

    //set interval for repeating refresh
    const interval = setInterval(() => {
      setRefreshing(true);

      getStory(props.story.id)
        .then((data) => data.kids && setComments(data.kids))
        .then(() => setRefreshing(false));
      // .then(()=>{console.log("story auto refresh");});
    }, 45000);

    //and clear it :)
    return () => clearInterval(interval);
  }, []);

  //alternate useEffect
  // useEffect(() => {
  //   setComments(props.story.kids);
  // }, []);

  //date converting
  let date = new Date(props.story.time * 1000).toDateString();

  //preview
  // const [result, loading, error] = useScrapper({
  //   url:
  //     "https://www.amazon.com/Steve-Madden-Mens-Jagwar-10-5/dp/B016X44MKA/ref=lp_18637582011_1_1?srs=18637582011&ie=UTF8&qid=1550721409&sr=8-1",
  // });
  //preview

  return (
    <Container>
      <Content
        onScroll={({ nativeEvent }) => {
          if (isCloseToBottom(nativeEvent)) {
            // console.log(commentsToShow);
            // console.log("bikini bottom");
            handleSetCommentsToShow();
          }
        }}
        scrollEventThrottle={400}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* STORY CARD */}
        <Card>
          <CardItem>
            <Left>
              <Icon name="newspaper-outline" />
              <Body>
                <Text style={{ fontWeight: "bold" }}>{props.story.title}</Text>
                <Text note>{date}</Text>
              </Body>
            </Left>
            <Right>
              {previewData.logo && <Thumbnail source={previewData.logo.url} />}
              {/* {previewData.logo.url && (
                  <Thumbnail source={{ uri: previewData.logo.url }} />
                )} */}
            </Right>
          </CardItem>
          {/* PREVIEW */}
          <CardItem
            bordered
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            {/* <Text>{previewContainer.description}</Text> */}
            {/* <LinkPreview text={props.story.url} /> */}
            {/* <ReactTinyLink
              cardSize="small"
              showGraphic={false}
              maxLine={2}
              minLine={1}
              url={"https://github.com/"}
            /> */}
            {/* <LinkPreviewCus /> */}
            {/* <Microlink url="https://github.com/" media="image" /> */}
            {/* {JSON.stringify(result)} */}
            <Body>
              {previewData.image !== undefined ? (
                <Image
                  source={previewData.image.url}
                  style={{
                    height: 200,
                    width: null,
                    flex: 1,
                    resizeMode: "cover",
                  }}
                />
              ) : null}
              {previewData.description && (
                <Text> {previewData.description} </Text>
              )}
            </Body>
          </CardItem>
          {/* END PREVIEW */}
          <CardItem footer bordered style={{ justifyContent: "space-between" }}>
            <Text style={{ color: "grey" }}>
              Total comments: {props.story.kids.length}
            </Text>
            <Button
              danger
              onPress={() => {
                navigation.pop();
                // Actions.pop();!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
              }}
            >
              <Text>Back to news page</Text>
            </Button>
          </CardItem>
        </Card>
        {/* END STORY CARD */}

        {/* MAP COMMENTS */}
        {comments &&
          comments.length > 0 &&
          comments
            .slice(0, commentsToShow)
            .map((commentId) => (
              <Comment key={commentId} commentId={commentId} />
            ))}
        {/* MAP COMMENTS */}
      </Content>
    </Container>
  );
}
