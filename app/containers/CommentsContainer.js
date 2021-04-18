import React, { useEffect, useState} from "react";

import { Container, Content, Card, 
  CardItem, Text, Button, 
  Icon, Left, Body, 
} from "native-base";

import { Actions } from "react-native-router-flux";
import { LinkPreview } from "@flyerhq/react-native-link-preview";
import { Comment } from "../components/Comment";
import { getStory } from "../services/hackingNewsAPI";
import {RefreshControl} from "react-native";

//SCROLLVIEW INFINITE SCROLL
const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
  const paddingToBottom = 20;
  return layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom;
};
//SCROLLVIEW INFINITE SCROLL

export default function CommentsContainer(props) {

  // console.log(props.story.id);

  //set number comments to show
  const [commentsToShow, setCommentsToShow] = useState(5);

  const handleSetCommentsToShow = () => {
    if( commentsToShow < props.story.kids.length){
      setCommentsToShow(commentsToShow+5);
    }else {
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

    getStory(props.story.id).then(data =>  data.kids && setComments(data.kids))
      .then((data) => console.log(data))
      .then(() => setRefreshing(false));
  }, []);


  //useEffect for initialize and interval refreshing
  useEffect(() => {
    
    //extrastep for exclude error of empty array of comments
    setComments(props.story.kids);

    setRefreshing(true);

    getStory(props.story.id).then(data =>  data.kids && setComments(data.kids))
      .then(() => setRefreshing(false));
    // .then(()=>{console.log("story useEffect refresh");});

    //set interval for repeating refresh
    const interval=setInterval(()=>{
      setRefreshing(true);

      getStory(props.story.id).then(data =>  data.kids && setComments(data.kids))
        .then(() => setRefreshing(false));
    // .then(()=>{console.log("story auto refresh");});
    },45000);  

    //and clear it :)
    return()=>clearInterval(interval);

  }, []);
 
  //alternate useEffect
  // useEffect(() => {
  //   setComments(props.story.kids);
  // }, []);
  
  //date converting
  let date = new Date(props.story.time*1000).toDateString();

  return(
    <Container 
    
    >
      <Content 
        onScroll={({nativeEvent}) => {
          if (isCloseToBottom(nativeEvent)) {
            console.log(commentsToShow);
            console.log("bikini bottom");
            handleSetCommentsToShow();
          }
        }}
        scrollEventThrottle={400}
        

        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        } >

        {/* STORY CARD */}
        <Card >
          <CardItem  >
            <Left>
              <Icon name="newspaper-outline" />
              <Body >
                <Text style={{fontWeight: "bold"}}>{props.story.title}</Text>
                <Text note>{date}</Text>
              </Body>
            </Left>
          </CardItem>
          {/* PREVIEW */}
          <CardItem bordered style={{ justifyContent: "center", alignItems: "center"}}>
            <LinkPreview text={props.story.url}  />
          </CardItem>
          {/* END PREVIEW */}
          <CardItem footer bordered style={{ justifyContent: "space-between"}}>
            <Text style={{ color: "grey" }}>Total comments: {props.story.kids.length}</Text>
            <Button info 
              onPress= {() => {Actions.pop(); }}>
              <Text>Back to news page</Text>
            </Button>
          </CardItem>
        </Card>
        {/* END STORY CARD */}

        {/* MAP COMMENTS */}
        {comments && comments.length > 0 && comments.slice(0,commentsToShow).map(commentId => <Comment key={commentId} commentId={commentId}/> )}
        {/* MAP COMMENTS */}
 
      </Content>
    </Container>
  );
}
