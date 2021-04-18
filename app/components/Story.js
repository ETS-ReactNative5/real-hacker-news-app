
import React, { useEffect, useState, memo } from "react";
import { getStory } from "../services/hackingNewsAPI";
import { mapTime } from "../mappers/mapTime";
import { Card, CardItem, Body, 
  Text, Left,  Icon, 
  // Accordion, Content, Thumbnail  
} from "native-base";

import {RefreshControl} from "react-native";

import { Actions } from "react-native-router-flux";
import RNUrlPreview from "react-native-url-preview";
// import { getLinkPreview, getPreviewFromContent } from "link-preview-js";

export const Story = memo(function Story(props) {

  //set story 
  const [story, setStory] = useState({});
  
  //refreshing 
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // console.log("story refresh");

    getStory(props.storyId).then(data =>  data && data.url && setStory(data))
      .then(() => setRefreshing(false));
  }, []);


  //useEffect for initialize and interval refreshing
  useEffect(() => {
    setRefreshing(true);

    getStory(props.storyId).then(data =>  data && data.url && setStory(data))
      .then(() => setRefreshing(false));
    // .then(()=>{console.log("story useEffect refresh");});

    //set interval for repeating refresh
    const interval=setInterval(()=>{
      setRefreshing(true);

      getStory(props.storyId).then(data =>  data && data.url && setStory(data))
        .then(() => setRefreshing(false));
      // .then(()=>{console.log("story auto refresh");});
    },45000);  

    //and clear it :)
    return()=>clearInterval(interval);

  }, []);

  //date converting
  let date = new Date(story.time*1000).toDateString();

  return (story && story.url ? (
    <Card  refreshControl={
      <RefreshControl
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    } >

      {/* HEADER OF A STORY */}
      <CardItem header >
        <Left>
          <Icon name="newspaper-outline" />
          <Body>
            <Text style={{fontWeight: "bold"}}>{story.title}</Text>
            <Text note>By: {story.by}</Text>
            <Text note >Rating: {story.score}</Text>
            <Text note>{date}</Text>
          </Body>
        </Left>
      </CardItem>
      {/* END HEADER OF A STORY */}
       
      {/* BODY OF A STORY */}
      <CardItem>
        <Body style={{ color: "blue" }}>
          <RNUrlPreview text={story.url}/>
          {/* <Text>Press to open in browser</Text> */}
        </Body>
      </CardItem>
      {/* END BODY OF A STORY */}

      {/* FOOTER OF A STORY */}
      <CardItem footer bordered style={{ justifyContent: "space-between" }}>
        {story.kids ?
          <Text style={{ color: "blue" }}
            onPress={() => {Actions.pageTwo({story}); }}>Show comments({story.kids.length})</Text>
          : <Text style={{ color: "grey" }}>No comments yet</Text>}

        {/* onPress={() => Linking.openURL(story.url)}>link</Text> */}
        <Text>{mapTime(story.time)} ago</Text>
        {/* <Accordion dataArray={dataArray} expanded={0}/> */}
      </CardItem>
      {/* FOOTER OF A STORY */}

    </Card>
  ) : null);
});

//=-=-=-=-=--=-=-=--=-=-=--=-=-=--=-=-=--=-=-=--=-=-=--=-=-=--=-=-
// import { View, Linking, Dimensions, RefreshControl, TouchableOpacity} from "react-native";

// import React, { useEffect, useState, memo } from "react";
// import { getStory } from "../services/hackingNewsAPI";
// import { mapTime } from "../mappers/mapTime";
// import { Card, CardItem, Body, Text, Thumbnail, Left, Accordion, Content  } from "native-base";

// import { Actions } from "react-native-router-flux";
// import RNUrlPreview from "react-native-url-preview";
// // import { getLinkPreview, getPreviewFromContent } from "link-preview-js";
// const dataArray = [
//   { title: "First Element", content: "Lorem ipsum dolor sit amet" },
//   { title: "Second Element", content: "Lorem ipsum dolor sit amet" },
//   { title: "Third Element", content: "Lorem ipsum dolor sit amet" }
// ];
// export const Story = memo(function Story(props) {
//   const [story, setStory] = useState({});


//   useEffect(() => {
//     getStory(props.storyId).then(data =>  data && data.url && setStory(data));
//   }, []);

//   let date = new Date(story.time*1000).toDateString();

//   return (story && story.url  ? (
  
//     <Card >
//       <CardItem header >
//         <Left>
//           <Body>
//             <Text style={{fontWeight: "bold"}}>{story.title}</Text>
//             <Text note>{date}</Text>
//           </Body>
//         </Left>
       
//       </CardItem>
//       <CardItem>
//         <Body style={{ color: "blue" }}>
//           <RNUrlPreview text={story.url}/>
//           <Text>Press to open in browser</Text>
//           {/* <Text>By: {story.by}</Text> */}
//         </Body>
//       </CardItem>
//       <CardItem footer bordered style={{ justifyContent: "space-between" }}>
//         {story.kids ?
//           <Text style={{ color: "blue" }}
//             onPress={  () => {Actions.pageTwo({story}); }   }>Show comments({story.kids.length})</Text>
//           : <Text style={{ color: "grey" }}>No comments yet</Text>}

//         {/* onPress={() => Linking.openURL(story.url)}>link</Text> */}
//         <Text>{mapTime(story.time)} ago</Text>
//         {/* <Accordion dataArray={dataArray} expanded={0}/> */}
//       </CardItem>
//       {/* <Content padder> */}
//       {/* </Content> */}
//     </Card>

//   ) : null);


// });


//=-=-=-=-=--=-=-=--=-=-=--=-=-=--=-=-=--=-=-=--=-=-=--=-=-=--=-=-
// // import { View, Linking, Dimensions, RefreshControl, TouchableOpacity} from "react-native";

// import React, { useEffect, useState, memo } from "react";
// import { getLinkMeta, getStory } from "../services/hackingNewsAPI";
// import { mapTime } from "../mappers/mapTime";
// import { Card, CardItem, Body, Text, Thumbnail, Left } from "native-base";

// import { Actions } from "react-native-router-flux";

// import { getLinkPreview, getPreviewFromContent } from "link-preview-js";

// export const Story = memo(function Story(props) {
//   const [story, setStory] = useState({});


//   useEffect(() => {
//     getStory(props.storyId).then(data => {
//       data && data.url && setStory(data);
     
//     }
//     )
//       .then(()=>{
//         getLinkPreview(story.url,  {
//           imagesPropertyType: "og", // fetches only open-graph images
//           headers: {
//             "user-agent": "googlebot" // fetches with googlebot crawler user agent
//           }
//         }).then((data) => data.images[0] && setStory({...story, preview: data.images[0], description: data.description}));

//       });
      
//   }, []);


//   let date = new Date(story.time*1000).toDateString();
  

//   return (story && story.url && story.description ? (


  
//     <Card >
//       {/* <TouchableOpacity onPress= {  () => {Actions.pageTwo({story}); }   }> */}
//       <CardItem header >
//         <Left>
//           <Body>
//             <Text style={{fontWeight: "bold"}}>{story.title}</Text>
        
//             <Text note>{date}</Text>
//           </Body>
//           { story.preview && <Thumbnail square large source={{uri: story.preview}} />}
//         </Left>
       
//       </CardItem>
//       <CardItem>
//         <Body style={{ color: "blue" }}>
//           {story.description && <Text>{story.description}</Text>}
//           <Text>By: {story.by}</Text>
//         </Body>
//       </CardItem>
//       <CardItem footer bordered style={{ justifyContent: "space-between" }}>
//         <Text style={{ color: "blue" }}
//           onPress={  () => {Actions.pageTwo({story}); }   }>Show more</Text>
//         {/* onPress={() => Linking.openURL(story.url)}>link</Text> */}
//         <Text>{mapTime(story.time)} ago</Text>
//       </CardItem>
//       {/* </TouchableOpacity> */}
//     </Card>

//   ) : null);



    

// });
