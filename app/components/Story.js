import { View, Linking, Dimensions} from "react-native";

import React, { useEffect, useState, memo } from "react";
import { getStory } from "../services/hackingNewsAPI";
import { mapTime } from "../mappers/mapTime";
import { Card, CardItem, Body, Text, Thumbnail, Left } from "native-base";

import Image from "react-native-image-progress";
import ProgressBar from "react-native-progress/Bar";

const w = Dimensions.get("window");


import { getLinkPreview, getPreviewFromContent } from "link-preview-js";

// pass the link directly
// getLinkPreview("https://www.youtube.com/watch?v=MejbOFk7H6c",  {
//   imagesPropertyType: "og", // fetches only open-graph images
//   headers: {
//     "user-agent": "googlebot" // fetches with googlebot crawler user agent
//   }
// })
//   .then((data) => console.debug(data.images));




export const Story = memo(function Story(props) {
  const [story, setStory] = useState({});


  
  //NEW USEFFECT #2
  useEffect(() => {
    getStory(props.storyId).then(data => {
      data && data.url && setStory(data);
     
    }
    )
      .then(()=>{
        getLinkPreview(story.url,  {
          imagesPropertyType: "og", // fetches only open-graph images
          headers: {
            "user-agent": "googlebot" // fetches with googlebot crawler user agent
          }
        }).then((data) => data.images[0] && setStory({...story, preview: data.images[0], description: data.description}))
        // }).then((data) => data.images[0] ? setStory({...story, preview: data.images[0]}) : setStory({...story, preview: data.favicons[0]}))
        // }).then((data) => data.images[0] ? console.debug(data.images[0]) : console.debug(data.favicons[0]));
        // }).then((data) =>  console.debug(data))
        // .then(()=>setStory(...story, {preview: data.images[0]}));
          .then(()=>console.log(story));
      });
      

    //NEW USEFFECT
    // useEffect(() => {
    //   getStory(props.storyId).then(data => {
    //     data && data.url && setStory(data);
    //     getLinkPreview(data.url,  {
    //       imagesPropertyType: "og", // fetches only open-graph images
    //       headers: {
    //         "user-agent": "googlebot" // fetches with googlebot crawler user agent
    //       }
    //     })
    //       .then((data) => data.images? console.debug(data.images): data);
    //   }
    //   );


    

  }, []);
  let date = new Date(story.time*1000).toDateString();
  
  
  //OLD USEFFECT
  // useEffect(() => {
  //   getStory(props.storyId).then(data => {
  //     data && data.url && setStory(data);
  //   }
  //   );

  // }, []);
  // let date = new Date(story.time*1000).toDateString();

  return (story && story.url ? (
    <Card  >
      <CardItem header >
        <Left>
          <Body>
            <Text style={{fontWeight: "bold"}}>{story.title}</Text>
        
            <Text note>{date}</Text>
          </Body>
          { story.preview && <Thumbnail square large source={{uri: story.preview}} />}
        </Left>
       
      </CardItem>
      <CardItem>
        <Body style={{ color: "blue" }}>
          {story.description && <Text>{story.description}</Text>}
          {/* { story.preview && <Thumbnail square large source={{uri: story.preview}} />} */}
          {/* <View  style={{height: 200, width: "100%"}} >
            { story.preview &&  <Image
              indicator={ProgressBar} 
              style={{height: 200, width: null, resizeMode: "cover"}}
              source={{
                uri: story.preview,
              }}
            />}
          </View> */}
          <Text>By: {story.by}</Text>
          {/* <Text>Id: {story.id}</Text>  */}
          {/* <Text>Publish date: {date} </Text> */}
        </Body>
      </CardItem>
      <CardItem footer bordered style={{ justifyContent: "space-between" }}>
        <Text style={{ color: "blue" }}
          onPress={() => Linking.openURL(story.url)}>link</Text>
        <Text>{mapTime(story.time)} ago</Text>
      </CardItem>
    </Card>) : null);

});
