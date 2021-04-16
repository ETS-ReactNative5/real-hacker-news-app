import { 
  View, 
  TouchableOpacity, 
  RefreshControl, SafeAreaView, ScrollView, StyleSheet,
} from "react-native";

import React, { useEffect, useState } from "react";
import { Story } from "../components/Story";


import { Container, Content, Text,
  Card, Header, Body, 
  Button, Title, CardItem, Icon } from "native-base";
import { Actions } from "react-native-router-flux";
import { getStoryIds } from "../services/hackingNewsAPI";


//experiment
// const wait = (timeout) => {
//   return new Promise(resolve => setTimeout(resolve, timeout));
// };
//experiment



export default function StoriesContainer() {

  //experiment
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    console.log("swipe refresh refresh");

    getStoryIds().
      then(data => {
        setStoryIds(data);
      })
      .then(() => setRefreshing(false));
    // wait(2000).then(() => setRefreshing(false));
  }, []);
  //experiment
  
  
  //set stories from API call
  const [storyIds, setStoryIds] = useState([]);
  
  // useEffect(() => {
  //   getStoryIds().then(data => {
  //     setStoryIds(data);
  //   });
  
  //   //set interval for repeating refresh
  //   const interval=setInterval(()=>{
  //     getStoryIds().then(data => {
  //       setStoryIds(data);
  //       console.log("another successful auto refresh");
  //     });
  //   },60000);  

  //   //and clear it :)
  //   return()=>clearInterval(interval);
  // }, []);

  //for manual refresh BUTTON
  // const  handleRefresh = () => {
  //   getStoryIds().then(data => {
  //     setStoryIds(data);
  //     console.log("manual refresh");
  //   });
  // };
  
  return (
    <Content 
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }>
      {/* BUTTON FOR REFRESH */}
      {/* <View style={{justifyContent: "center", alignContent: "center",}}>
        <Button transparent onPress={ handleRefresh
        } 
        style={{justifyContent: "center", alignSelf: "center",}}
        >
          <Icon name='reload' /> 
          <Text>Refresh</Text>
        </Button>
      </View> */}
      {/* END BUTTON FOR REFRESH */}
      
      {/* MAP API CALL RESULT */}
      {storyIds.slice(0, 100).map(storyId => 
        <TouchableOpacity key={storyId}
        // style={styles.button}
          onPress= {() => {Actions.pageTwo({storyId: storyId}); }}
        > 
          <Story key={storyId} storyId={storyId}/>
        </TouchableOpacity>
      )}
      {/* END MAP API CALL RESULT */}

    </Content>
  );
}


// import React from 'react';

// const Component = () => {
//     const [track, setTrack] = React.useState('');

//     React.useEffect(() => {
//         let repeat;

//         async function fetchData() {
//             try {
//                 const res = await fetch(" my API url ");
//                 const json = await res.json();

//                 setTrack(json.data[0].track.title);

//                 repeat = setTimeout(fetchData, 60000); // request again after a minute
//             } catch (error) {
//                 console.error(error.message)
//             }
//         }

//         fetchData();

//         return () => {
//             if (repeat) {
//                 clearTimeout(repeat);
//             }
//         }
//     }, []);

//     return (
//         <Text>{track}</Text>
//     );
// };