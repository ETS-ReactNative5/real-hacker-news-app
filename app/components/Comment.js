import React, { useEffect, useState, memo } from "react";
import { getStory as getComment } from "../services/hackingNewsAPI";
import { mapTime } from "../mappers/mapTime";
import { Card, CardItem, Body, Text, Thumbnail, Left, Accordion, Content, Icon  } from "native-base";

import HTML from "react-native-render-html";

//^^^^^
import { 
  RefreshControl,
} from "react-native";
//^^^^^

// import { Actions } from "react-native-router-flux";
// import RNUrlPreview from "react-native-url-preview";
// import { getLinkPreview, getPreviewFromContent } from "link-preview-js";

export const Comment = memo(function Comment(props) {

  
  //^^^^^
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // console.log("swipe refresh refresh");

    getComment(props.commentId).then(data => setComment(data))
      .then(() => setRefreshing(false));
    // wait(2000).then(() => setRefreshing(false));
  }, []);
  //^^^^^


  const [comment, setComment] = useState({});


  useEffect(() => {
    setRefreshing(true);

    getComment(props.commentId).then(data => setComment(data))
      .then(() => setRefreshing(false));
    // .then(()=>{console.log("comment auto refresh");});

    const interval=setInterval(()=>{
      setRefreshing(true);

      getComment(props.commentId).then(data =>  setComment(data))
        .then(() => setRefreshing(false));
      // .then(()=>{console.log("comment auto refresh");});
    },5000);  

    //and clear it :)
    return()=>clearInterval(interval);

  }, []);

  let date = new Date(comment.time*1000).toDateString();

  return (comment && comment.text  ? (
  
    <Card  refreshControl={
      <RefreshControl
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    } >
      <CardItem header >
        <Left>
          <Icon name="chatbubble-outline" />
          <Body>
           
            <Text style={{fontWeight: "bold"}}>{comment.by}</Text>
            <Text note>{date}</Text>
          </Body>
        </Left>
       
      </CardItem>
      <CardItem>
        <Body style={{ color: "blue" }}>
          {/* <RNUrlPreview text={comment.url}/> */}
          {/* <Text>Press to open in browser</Text> */}
          <HTML source={{ html: comment.text }}  />
          {/* <Text>{comment.text}</Text> */}
        </Body>
      </CardItem>
      <CardItem footer bordered style={{ justifyContent: "space-between" }}>
        {comment.kids ?
          <Text style={{ color: "blue" }}
            // onPress={  () => {Actions.pageTwo({comment}); }   }
            
          >Replies({comment.kids.length})</Text>
          : <Text style={{ color: "grey" }}>No replies yet</Text>}

        {/* onPress={() => Linking.openURL(comment.url)}>link</Text> */}
        <Text>{mapTime(comment.time)} ago</Text>
        {/* <Accordion dataArray={dataArray} expanded={0}/> */}
      </CardItem>
      {/* <Content padder> */}
      {/* </Content> */}
    </Card>

  ) : null);


});