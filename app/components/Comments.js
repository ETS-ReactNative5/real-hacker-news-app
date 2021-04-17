import React, { useEffect, useState, Component } from "react";
import { Image,  TouchableOpacity,  } from "react-native";
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from "native-base";
import { Actions } from "react-native-router-flux";

import RNUrlPreview from "react-native-url-preview";

import { getStory as getCommentsArray} from "../services/hackingNewsAPI";

import { LinkPreview } from "@flyerhq/react-native-link-preview";
import { Comment } from "./Comment";

export default function Comments(props) {
  // console.log(props.story.kids);
  //get comments
  const [comments, setComments] = useState({});

  


  useEffect(() => {
    // getCommentsArray(props.story.kids).then(data => setComments(data))
    //   .then((data)=> console.log(data));
    setComments(props.story.kids);
  }, []);
  
  let date = new Date(props.story.time*1000).toDateString();

  return(

    <Container>
     
      {/* <RNUrlPreview text={props.story.url}/> */}

    
      <Content>
        <CardItem>
          <Left>
            <Icon name="newspaper-outline" />
            <Body>
              <Text>{props.story.title}</Text>
              <Text note>{date}</Text>
            </Body>
          </Left>
        </CardItem>
        <Card style={{ justifyContent: "center", alignItems: "center"}}>
          
          <CardItem>
            
            <LinkPreview text={props.story.url}  />
            {/* <Text>test</Text> */}
          </CardItem>
          <Button   style ={{ alignSelf: "center", margin: 30}}
            onPress= {() => {Actions.pop(); }}>
            <Text>Goto main page</Text>
          </Button>
        </Card>
        {/* <Text>Something</Text> */}
        {comments && comments.length > 0 && comments.map(commentId => <Comment key={commentId} commentId={commentId}/> )}
        {/* {comments && comments.length > 0 && comments.map(commentId =>  <Text key={commentId}>{commentId}</Text>)} */}
        {/* <TouchableOpacity key={commentId}
             style={styles.button}
           onPress= {() => {Actions.pageTwo({storyId: storyId}); }}
           >  */}
        {/* <Comment commentId={commentId}/> */}
           
        {/* </TouchableOpacity> */}
        {/* )} */}
        {/* {storyIds.slice(0, 50).map(storyId => 
          <TouchableOpacity key={storyId}
            // style={styles.button}
          // onPress= {() => {Actions.pageTwo({storyId: storyId}); }}
          > 
            <Story key={storyId} storyId={storyId}/>
          </TouchableOpacity>
        )} */}
      </Content>

    </Container>
    
    
    

  // <Container>
     
  //   <RNUrlPreview text={props.story.url}/>

      
  //   <Content>
  //     <Card style={{flex: 0}}>
  //       <CardItem>
  //         <Left>
  //           <Icon name="newspaper-outline" />
  //           <Body>
  //             <Text>{props.story.title}</Text>
  //             <Text note>{date}</Text>
  //           </Body>
  //         </Left>
  //       </CardItem>
  //       <CardItem>
  //         <Body style={{ alignItems: "center", justifyContent: "center"}}>
  //           <Image source={{uri: props.story.preview}} style={{height: 200, width: 200, flex: 1}}/>
  //           <LinkPreview text={props.story.url}  />
  //           <Text>
  //             {props.story.description}
  //           </Text>
  //         </Body>
  //       </CardItem>
  //       <CardItem>
  //         <Left>
  //           <Button   style ={{ alignSelf: "center", margin: 30}}
  //             onPress= {() => {Actions.pop(); }}>
  //             <Text>Goto main page</Text>
  //           </Button>
  //         </Left>
  //       </CardItem>
  //     </Card>
  //   </Content>

  // </Container>





  // <Icon name="logo-github" /> 
  // <Container>
  //   <Header />
  //   <Content>
  //     <Card>

  //       <Button dark bordered style ={{ alignSelf: "center", margin: 30}}
  //         onPress= {() => {Actions.pop(); }}>
  //         <Text>Goto main page</Text>
  //       </Button>

  //       <CardItem>
  //         <Left>
  //           {/* <Thumbnail source={{uri: "Image URL"}} /> */}
  //           <Body>
  //             <Text>{props.story.title}</Text>
  //             <Text note>By: {props.story.by}</Text>
  //           </Body>
  //         </Left>
  //       </CardItem>

  //       <CardItem cardBody>
  //         <Image source={{uri: props.story.preview}} style={{height: 200, width: null, flex: 1}}/>
  //         <Body>


  //         </Body>
  //       </CardItem>

  //       <CardItem>

  //         <Left>
  //           <Button transparent>
  //             <Icon active name="thumbs-up" />
  //             <Text>12 Likes</Text>
  //           </Button>
  //         </Left>

  //         <Body>
  //           <Button transparent>
  //             <Icon active name="chatbubbles" />
  //             <Text>4 Comments</Text>
  //           </Button>
  //         </Body>

  //         <Right>
  //           <Text>11h ago</Text>
  //         </Right>

  //       </CardItem>

          

  //     </Card>
  //   </Content>
  // </Container>


  // <Container>
  //   {/* <Header>
  //       <Body>
  //         <Title>PageTwo</Title>
  //       </Body>
  //     </Header> */}
  //   <Content padder>
  //     <Card>
  //       <CardItem>
  //         <Body>
  //           <Text>{props.story.description}</Text>
  //         </Body>
  //       </CardItem>
  //     </Card>
  //     <Button dark bordered style ={{ alignSelf: "center", margin: 30}}
  //       onPress= {() => {Actions.pop(); }}>
  //       <Text>Goto main page</Text>
  //     </Button>
  //   </Content>
  // </Container>
  );
}
