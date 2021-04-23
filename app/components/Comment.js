import React, { useEffect, useState, memo } from "react";
import { getStory as getComment } from "../services/hackingNewsAPI";
import { mapTime } from "../mappers/mapTime";
import { Text } from "native-base";

import { List } from "react-native-paper";

import HTML from "react-native-render-html";
import { useWindowDimensions } from "react-native";

export const Comment = memo(function Comment(props) {
  //toggle head comment(s) expanding
  const [expanded, setExpanded] = React.useState(true);
  const handlePress = () => setExpanded(!expanded);

  //set comment
  const [comment, setComment] = useState({});

  //refreshing
  const [refreshing, setRefreshing] = React.useState(false);

  //useEffect for initialize and interval refreshing
  useEffect(() => {
    setRefreshing(true);

    getComment(props.commentId)
      .then((data) => setComment(data))
      .then(() => setRefreshing(false));
    // .then(()=>{console.log("comment auto refresh");});

    //set interval for repeating refresh
    const interval = setInterval(() => {
      setRefreshing(true);

      getComment(props.commentId)
        .then((data) => setComment(data))
        .then(() => setRefreshing(false));
      // .then(()=>{console.log("comment auto refresh");});
    }, 30000);

    //and clear it :)
    return () => clearInterval(interval);
  }, []);

  //date converting
  let date = new Date(comment.time * 1000).toDateString();

  return comment && comment.text ? (
    <List.Section
      style={{
        borderBottomColor: "#E8E8E8",
        borderBottomWidth: 2,
        // borderWidth: 1,
        // borderColor: "#20232a",
        // borderRadius: 6,
        backgroundColor: "#F5F5F5",
      }}
    >
      <List.Accordion
        expanded={expanded}
        onPress={handlePress}
        style={{
          backgroundColor: "#E8E8E8",
        }}
        title={<Text>Comment by: {comment.by}</Text>}
        description={`${date}${refreshing ? " refreshing..." : ""}`}
        left={(props) => (
          <List.Icon {...props} icon="chat-processing-outline" />
        )}
      >
        <List.Item left={() => <Text><HTML source={{ html: comment.text }} contentWidth={useWindowDimensions().width}/></Text>} />
        <List.Item
          left={() => (
            <Text>
              {" "}
              {comment.kids ? (
                <Text
                  style={{ color: "blue" }}
                  // onPress={  () => {Actions.pageTwo({comment}); }   }
                >
                  Replies({comment.kids.length})
                </Text>
              ) : (
                <Text style={{ color: "grey" }}>No replies yet</Text>
              )}
            </Text>
          )}
          right={() => <Text>{mapTime(comment.time)} ago</Text>}
        />
        {/* REPLIES */}
        {comment.kids && (
          <List.Item
            left={(props) => (
              <List.Icon
                {...props}
                style={{ margin: 0, padding: 0 }}
                icon="share-all-outline"
              />
            )}
            style={{
              margin: 0,
              padding: 0,
              justifyContent: "center",
              alignContent: "center",
            }}
            titleStyle={{ margin: 0, padding: 0, height: 0 }}
            description={() => (
              <List.Accordion
                style={{ margin: -6, padding: 0 }}
                title="toggle replies"
                titleStyle={{ margin: 0, padding: 0 }}
                descriptionStyle={{
                  margin: 0,
                  padding: 0,
                  backgroundColor: "purple",
                }}
              >
                {/* HERE COMES THE RECURSION */}
                {comment.kids &&
                  comment.kids.map((kid) => (
                    <Comment key={kid} commentId={kid} />
                  ))}
                {/* HERE COMES THE RECURSION */}
              </List.Accordion>
            )}
          />
        )}
      </List.Accordion>
    </List.Section>
  ) : null;
});
