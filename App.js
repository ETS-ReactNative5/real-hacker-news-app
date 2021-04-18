import React from "react";
import { Container, Header, Title, 
  Content, Body,
  // Footer, FooterTab, 
  // Button, Text, 
  // Left, Right,  Icon,   
} from "native-base";

// import { Actions } from "react-native-router-flux";
import { Router, Scene } from "react-native-router-flux";

import { useFonts } from "expo-font";
import StoriesContainer from "./app/containers/StoriesContainer";
import CommentsContainer from "./app/containers/CommentsContainer";
// import { getStoryIds } from "./app/services/hackingNewsAPI";

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
    <Container >
      <Header style={{backgroundColor: "#003133"}}>
        {/* <Left>
          <Button transparent onPress={() =>}>
            <Icon name='menu' />
          </Button>
        </Left> */}
        <Body>
          <Title style ={{ alignSelf: "center", margin: 10, color: "white"}}>Real hacker news</Title>
        </Body>
        {/* <Right>
        </Right> */}
      </Header>

      <Router hideNavBar= "true">
        <Scene key="root" hideNavBar={true} >
          <Content style={{ backgroundColor: "grey" }} >
            <Scene 
              key="pageOne" 
              component={StoriesContainer} 
              title="Fresh news" 
              initial={true} 
              hideNavBar={true}/>
            <Scene key="pageTwo" component={CommentsContainer} title="News info" hideNavBar={true} />
          </Content> 
        </Scene>
      </Router>


      {/* <Footer>
        <FooterTab>
          <Button full>
            <Text>Footer</Text>
          </Button>
        </FooterTab>
      </Footer> */}
    </Container>
  );
}
