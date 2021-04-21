// import * as React from "react";
// import { Text, View } from "react-native";
// import LinkPreview from "react-native-link-preview";

// export default class LinkPreviewCus extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       title: "sample title",
//     };
//   }

//   getTitle() {
//     LinkPreview.getPreview(
//       "https://www.youtube.com/watch?v=aqz-KE-bpKQ"
//     ).then((data) => this.setState({ title: data.title.text() }));
//   }

//   componentDidMount() {
//     this.getTitle();
//   }

//   render() {
//     return (
//       <View>
//         <Text>Title is : {this.state.title}</Text>
//       </View>
//     );
//   }
// }
