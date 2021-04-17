import { 
  TouchableOpacity, 
  RefreshControl,
} from "react-native";

import React, { useEffect, useState } from "react";
import { Story } from "../components/Story";

import { Content} from "native-base";

import { getStoryIds } from "../services/hackingNewsAPI";

export default function StoriesContainer() {
  //set stories from API call
  const [storyIds, setStoryIds] = useState([]);

  //refreshing 
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // console.log("swipe refresh");

    getStoryIds().
      then(data => {
        setStoryIds(data);
      })
      .then(() => setRefreshing(false));
  }, []);

  
  //useEffect for initialize and interval refreshing
  useEffect(() => {
    setRefreshing(true);
    
    getStoryIds()
      .then(data => {
        setStoryIds(data);
      })
      .then(() => setRefreshing(false));
    // .then(()=>{console.log("the first refresh");});
  
    //set interval for repeating refresh
    const interval=setInterval(()=>{
      setRefreshing(true);
      getStoryIds()
        .then(data => {
          setStoryIds(data);
        })
        .then(() => setRefreshing(false));
      // .then(()=>{ console.log("another successful auto refresh"); });
    },60000);  

    //and clear it :)
    return()=>clearInterval(interval);
  }, []);

  // for manual refresh BUTTON
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
      
      {/* MAP API CALL RESULT */}
      {storyIds.slice(0, 30).map(storyId => 
        <TouchableOpacity key={storyId}
          // onPress= {() => {Actions.pageTwo({storyId: storyId}); }}
        > 
          <Story key={storyId} storyId={storyId}/>
        </TouchableOpacity>
      )}
      {/* END MAP API CALL RESULT */}

    </Content>
  );
}

