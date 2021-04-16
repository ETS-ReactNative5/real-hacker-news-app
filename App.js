import React from "react";
import { Container, Header, Title, 
  Content, Footer, FooterTab, 
  Button,  Left, Right, 
  Body, Icon,  Text,  
  Card,
  CardItem,
} from "native-base";

import { Actions } from "react-native-router-flux";
import { Router, Scene } from "react-native-router-flux";

import { useFonts } from "expo-font";
import StoriesContainer from "./app/containers/StoriesContainer";
import StoryInfo from "./app/components/StoryInfo";


export default function App() {
  const [loaded] = useFonts({
    Roboto: require("native-base/Fonts/Roboto.ttf"),
    Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
  });
  
  if (!loaded) {
    return null;
  }

  return (
    <Container>
      <Header>
        <Left>
          <Button transparent onPress={() => this.props.navigation.navigate("DrawerOpen")}>
            <Icon name='menu' />
          </Button>
        </Left>
        <Body>
          <Title>Real hacker news</Title>
        </Body>
        <Right><Button transparent ><Icon name='reload' /></Button></Right>
      </Header>


      {/* <Content padder>
        <Card>
          <CardItem>
            <Body>
              <Text>Chat App to talk some awesome people!</Text>
            </Body>
          </CardItem>
        </Card>
        <Button
          full
          rounded
          dark
          style={{ marginTop: 10 }}
          onPress={() => this.props.navigation.navigate("Chat")}
        >
          <Text>Chat With People</Text>
        </Button>
        <Button
          full
          rounded
          primary
          style={{ marginTop: 10 }}
          onPress={() => this.props.navigation.navigate("ProfileScreen")}
        >
          <Text>Goto Profiles</Text>
        </Button>
      </Content> */}


      <Router hideNavBar= "true">
        <Scene key="root" hideNavBar={true} >
          <Content style={{ backgroundColor: "grey" }} >
            <Scene key="pageOne" component={StoriesContainer} title="Fresh news" initial={true} />
            <Scene key="pageTwo" component={StoryInfo} title="News info" hideNavBar={true} />
          </Content> 
        </Scene>
      </Router>
      {/* <Content style={{ backgroundColor: "grey" }} >
 
        <StoriesContainer />
       
      </Content> */}



      <Footer>
        <FooterTab>
          <Button full>
            <Text>Footer</Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  );
}
//======================================================

// function HomeScreen({ navigation }) {
//   return (
//     <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//       <Text>Home Screen</Text>
      
//       <Button
//         title="Go to Details"
//         onPress={() => navigation.navigate("Details")}
//       />
//     </View>
//   );
// }

// function DetailsScreen({ navigation }) {
//   return (
//     <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//       <Text>Details Screens</Text>
//       <Button
//         title="Go to Details... again"
//         onPress={() => navigation.push("Details")}
//       />
//       <Button title="Go to Home" onPress={() => navigation.navigate("Home")} />
//       <Button title="Go back" onPress={() => navigation.goBack()} />
//       <Button
//         title="Go back to first screen in stack"
//         onPress={() => navigation.popToTop()}
//       />
//     </View>
//   );
// }

// const Stack = createStackNavigator();

// function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Home">
//         <Stack.Screen name="Home" component={HomeScreen} />
//         <Stack.Screen name="Details" component={DetailsScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// export default App;

//======================================================
// import { StatusBar } from "expo-status-bar";
// import React, { useEffect, useState } from "react";
// import { StyleSheet, Text, View } from "react-native";
// import MainNewsScreen from "./app/screens/MainNewsScreen";
// import StoriesContainer from "./app/containers/StoriesContainer";

// export default function App() {

//   return (
//     <View style={styles.container}>
//       <View>
//         <Text>Bringing you the finest news!!!</Text>
//         <MainNewsScreen />
//         <StoriesContainer />
//         {/* <Text>Hacker news v.0.0.12</Text> */}
//       </View>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });