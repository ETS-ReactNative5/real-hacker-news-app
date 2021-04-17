import React, { useEffect, useState, memo } from "react";
import { getStory as getComment } from "../services/hackingNewsAPI";
import { mapTime } from "../mappers/mapTime";
import { Card, CardItem, Body, 
  Text,  Left, Icon, 
  // Accordion, Content, Thumbnail
} from "native-base";

import HTML from "react-native-render-html";

import {RefreshControl} from "react-native";

// import { Actions } from "react-native-router-flux";
// import RNUrlPreview from "react-native-url-preview";
// import { getLinkPreview, getPreviewFromContent } from "link-preview-js";

export const Comment = memo(function Comment(props) {

  //set comment
  const [comment, setComment] = useState({});

  //refreshing 
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // console.log("swipe refresh refresh");

    getComment(props.commentId).then(data => setComment(data))
      .then(() => setRefreshing(false));
  }, []);

  //useEffect for initialize and interval refreshing
  useEffect(() => {
    setRefreshing(true);

    getComment(props.commentId).then(data => setComment(data))
      .then(() => setRefreshing(false));
    // .then(()=>{console.log("comment auto refresh");});

    //set interval for repeating refresh
    const interval=setInterval(()=>{
      setRefreshing(true);

      getComment(props.commentId).then(data =>  setComment(data))
        .then(() => setRefreshing(false));
      // .then(()=>{console.log("comment auto refresh");});
    },10000);  

    //and clear it :)
    return()=>clearInterval(interval);

  }, []);

  //date converting
  let date = new Date(comment.time*1000).toDateString();

  return (comment && comment.text  ? (
  
    <Card  refreshControl={
      <RefreshControl
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    } >
      {/* COMMENT HEADER */}
      <CardItem header >
        <Left>
          <Icon name="chatbubble-outline" />
          <Body>
           
            <Text style={{fontWeight: "bold"}}>{comment.by}</Text>
            <Text note>{date}</Text>
          </Body>
        </Left>
      </CardItem>
      {/* END COMMENT HEADER */}

      {/* COMMENT BODY */}
      <CardItem>
        <Body style={{ color: "blue" }}>
          <HTML source={{ html: comment.text }}  />
          {/* <Text>{comment.text}</Text> */}
        </Body>
      </CardItem>
      {/* END COMMENT BODY */}

      {/* COMMENT FOOTER */}
      <CardItem footer bordered style={{ justifyContent: "space-between" }}>
        {comment.kids ?
          <Text style={{ color: "blue" }}
            // onPress={  () => {Actions.pageTwo({comment}); }   }
          >Replies({comment.kids.length})</Text>
          : <Text style={{ color: "grey" }}>No replies yet</Text>}
        <Text>{mapTime(comment.time)} ago</Text>
      </CardItem>
      {/* END COMMENT FOOTER */}

    </Card>

  ) : null);


});