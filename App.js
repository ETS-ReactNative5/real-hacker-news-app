import React from "react";
import {
  Container,
  Header,
  Title,
  // Content,
  Body,
} from "native-base";

// import { Router, Scene } from "react-native-router-flux";!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

import { useFonts } from "expo-font";
import StoriesContainer from "./app/containers/StoriesContainer";
import CommentsContainer from "./app/containers/CommentsContainer";

// NAV
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
// NAV

// NAV
// const Stack = createStackNavigator();
const StoriesStack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();
// NAV

function StoriesStackScreen(props) {
  // console.log(props.navigation.dangerouslyGetParent());
  // console.log(props.route.params[0]);
  // console.log(props.route.params.type);
  // console.log(props);
  return (
    <StoriesStack.Navigator>
      <StoriesStack.Screen
        // tabBarVisible={false}
        options={{ header: () => null }} //hides the title
        name="Stories"
        component={StoriesContainer}
        initialParams={{ type: props.route.params.type }}
        // type={props.route.params[0]}
      />
      <StoriesStack.Screen
        name="Comments"
        component={CommentsContainer}
        options={{ header: () => null }}
      />
    </StoriesStack.Navigator>
  );
}

export default function App() {
  //for fonts
  const [loaded] = useFonts({
    Helvetica: require("native-base/Fonts/Roboto.ttf"),
    Roboto: require("native-base/Fonts/Roboto.ttf"),
    Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <Container>
        <Header style={{ backgroundColor: "#003133" }}>
          <Body>
            <Title style={{ alignSelf: "center", margin: 10, color: "white" }}>
              Real hacker news
            </Title>
          </Body>
        </Header>
        <Tab.Navigator>
          <Tab.Screen
            testProps={"123"}
            initialParams={{ type: "n" }}
            name="New"
            component={StoriesStackScreen}
          />
          <Tab.Screen
            testProps={"456"}
            initialParams={{ type: "t" }}
            name="Top"
            component={StoriesStackScreen}
          />
          <Tab.Screen
            testProps={"789"}
            initialParams={{ type: "b" }}
            name="Best"
            component={StoriesStackScreen}
          />
        </Tab.Navigator>
        {/* <Stack.Navigator>
          <Stack.Screen name="Stories" component={StoriesContainer} />
          <Stack.Screen name="Comments" component={CommentsContainer} />
        </Stack.Navigator> */}
        {/* <Router hideNavBar="true">
        <Scene key="root" hideNavBar={true}>
          <Content style={{ backgroundColor: "grey" }}>
            <Scene
              key="pageOne"
              component={StoriesContainer}
              title="Fresh news"
              initial={true}
              hideNavBar={true}
            />
            <Scene
              key="pageTwo"
              component={CommentsContainer}
              title="News info"
              hideNavBar={true}
            />
          </Content>
        </Scene>
      </Router> */}
      </Container>
    </NavigationContainer>
  );
}
