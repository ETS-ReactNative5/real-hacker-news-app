import React, { Component } from "react";
import { Container, Content, Text, Card, Header, Body, Button, Title, CardItem } from "native-base";
import { Actions } from "react-native-router-flux";

export default function StoryInfo(props) {
  console.log(props);
  return(
    <Container>
      {/* <Header>
          <Body>
            <Title>PageTwo</Title>
          </Body>
        </Header> */}
      <Content padder>
        <Card>
          <CardItem>
            <Body>
              <Text>{props.storyId}</Text>
            </Body>
          </CardItem>
        </Card>
        <Button dark bordered style ={{ alignSelf: "center", margin: 30}}
          onPress= {() => {Actions.pop(); }}>
          <Text>Goto main page</Text>
        </Button>
      </Content>
    </Container>
  );
}
