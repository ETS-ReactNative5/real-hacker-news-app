import React from "react";
import { Container, Header, Title, 
  Content, Footer, FooterTab, 
  Button,  Left, Right, 
  Body, Icon,  Text,  
} from "native-base";

// import { Actions } from "react-native-router-flux";
import { Router, Scene } from "react-native-router-flux";

import { useFonts } from "expo-font";
import StoriesContainer from "./app/containers/StoriesContainer";
import Comments from "./app/components/Comments";
// import { getStoryIds } from "./app/services/hackingNewsAPI";

export default function App() {

  // const [storyIds, setStoryIds] = useState([]);

  //for fonts
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
          <Title>Real hacker news!</Title>
        </Body>
        <Right>
        </Right>
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
            <Scene key="pageTwo" component={Comments} title="News info" hideNavBar={true} />
          </Content> 
        </Scene>
      </Router>


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
