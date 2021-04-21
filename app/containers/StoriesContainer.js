import { TouchableOpacity, RefreshControl } from "react-native";

import React, { useEffect, useState } from "react";
import { Story } from "../components/Story";

import { Content } from "native-base";

import { getStoryIds } from "../services/hackingNewsAPI";

//SCROLLVIEW INFINITE SCROLL (+100 causes earlier scroll update)
const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
  const paddingToBottom = 20;
  return (
    layoutMeasurement.height + contentOffset.y + 100 >=
    contentSize.height - paddingToBottom
  );
};
// END SCROLLVIEW INFINITE SCROLL

export default function StoriesContainer({ navigation }) {
  // console.log(navigation);
  //set number stories to show
  const [storiesToShow, setStoriesToShow] = useState(20);

  const handleSetStoriesToShow = () => {
    if (storiesToShow < 500) {
      setRefreshing(true);
      setStoriesToShow(storiesToShow + 20);
      setInterval(() => {
        setRefreshing(false);
      }, 1500);
      // setRefreshing(false);
    } else {
      setStoriesToShow(500);
    }
  };

  //set stories from API call
  const [storyIds, setStoryIds] = useState([]);

  //refreshing
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // console.log("swipe refresh");

    getStoryIds()
      .then((data) => {
        setStoryIds(data);
      })
      .then(() => setRefreshing(false));
  }, []);

  //useEffect for initialize and interval refreshing
  useEffect(() => {
    setRefreshing(true);

    getStoryIds()
      .then((data) => {
        setStoryIds(data);
      })
      .then(() => setRefreshing(false));
    // .then(()=>{console.log("the first refresh");});

    //set interval for repeating refresh
    const interval = setInterval(() => {
      setRefreshing(true);
      getStoryIds()
        .then((data) => {
          setStoryIds(data);
        })
        .then(() => setRefreshing(false));
      // .then(()=>{ console.log("another successful auto refresh"); });
    }, 60000);

    //and clear it :)
    return () => clearInterval(interval);
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
      onScroll={({ nativeEvent }) => {
        if (isCloseToBottom(nativeEvent)) {
          // console.log(storiesToShow);
          // console.log("bikini bottom");
          handleSetStoriesToShow();
        }
      }}
      scrollEventThrottle={400}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* MAP API CALL RESULT */}
      {storyIds.slice(0, storiesToShow).map((storyId) => (
        <TouchableOpacity
          key={storyId}
          onPress={() => {
            // navigation.navigate("Comments", {
            //   storyId: storyId,
            // });
          }}
          // onPress= {() => {Actions.pageTwo({storyId: storyId}); }}
        >
          <Story key={storyId} storyId={storyId} navigation={navigation} />
        </TouchableOpacity>
      ))}
      {/* END MAP API CALL RESULT */}
    </Content>
  );
}
