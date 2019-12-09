import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  StatusBar,
  ActivityIndicator,
  Alert
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import MyButton from "../CustomComponents/MyButton";
import Dashboard from "../Dashboard";
import ProfileDetails from "../UserManagement/ProfileDetails";
import {
  Container,
  Content,
  Footer,
  Form,
  Item,
  Input,
  Label,
  Card,
  CardItem,
  Textarea,
  Right,
  Icon,
  Left,
  Body,
  Toast,
  Root
} from "native-base";
import Loader from "../Navigation/Loader";
import PageHeader from "../CustomComponents/PageHeader";
import axios from "axios";
import BackArrow from "../../assets/js/BackArrow";
import Delete from "../../assets/js/Delete";
import Edit from "../../assets/js/Edit";
import CreateVertical from "./CreateVertical";
const VerticalsMainPage = props => {
  const [Verticals_list, setVertical] = useState([]);
  const [tableKey, setTableKey] = useState(0);
  const [fetching, setFetching] = useState(true);

  function updatekey(a) {
    setTableKey(a);
  }
  function CreateVertical() {
    updatekey();
    props.navigation.navigate("CreateVertical", { func: updatekey });
  }
  function GotoVertical(id, name, desc, url) {
    props.navigation.navigate("CreateVerticalFields", {
      fun: fun,
      vertical_id: id,
      name: name,
      desc: desc,
      url: url,
      func: updatekey,
      button: true
    });
  }
  function dashboard() {
    props.navigation.navigate("Dashboard");
  }
  useEffect(() => {
    // { console.log("toastit2", props.navigation.getParam("toastit2")) }
    // if (props.navigation.getParam("toastit2") == 1) {
    //   Toast.show({
    //     text: 'Edited Successfully!!!',
    //     buttonText: '',
    //     duration: 2000,
    //     position: 'center',
    //     style: { backgroundColor: 'rgba(0,0,0,0.5)', top: '20%' },
    //   });
    // }
    const config = {
      url: "https://api.leadswatch.com/api/v1/vertical/list",
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + global.access_token
      }
    };
    axios(config)
      .then(response => {
        setFetching(false);
        setVertical(response.data.data);
        // console.log("(Inside Get)--Verticals List ", Verticals_list)
      })
      .catch(error => {
        if (error.message == "Network Error") {
          Alert.alert(
            "Network Error",
            "Please try again after some time",
            [
              {
                text: "Ok",
                onPress: () => console.log("Network Problem:)")
              }
            ],
            { cancelable: false }
          );
        }
        console.log(error.response);
        Alert.alert(
          "Error",
          error.response.data.error.message,
          [
            {
              text: "Ok"
              // onPress: () => console.log('Enter Valid Details'),
            }
          ],
          { cancelable: false }
        );
      });
  }, [tableKey]);

  // function fun() {
  //   if (props.navigation.getParam("toastit2") == 1) {
  //     Toast.show({
  //       text: 'Edited Successfully!!!',
  //       buttonText: '',
  //       duration: 2000,
  //       position: 'center',
  //       style: { backgroundColor: 'rgba(0,0,0,0.5)', top: '20%' },
  //     });
  //   }

  // }
  // function myfunctoast() {

  // }
  // useEffect(() => {
  //   if (props.navigation.getParam("toastit2") == 1) {
  //     Toast.show({
  //       text: 'Edited Successfully!!!',
  //       buttonText: '',
  //       duration: 2000,
  //       position: 'center',
  //       style: { backgroundColor: 'rgba(0,0,0,0.5)', top: '20%' },
  //     });
  //   }
  // });

  function fun() {
    Toast.show({
      text: "Edited Successfully!!!",
      buttonText: "",
      duration: 2000,
      position: "center",
      style: { backgroundColor: "rgba(0,0,0,0.5)", top: "20%" }
    });
  }
  function deleteSure(id) {
    Alert.alert(
      "Alert",
      "Are You Sure You Want To Delete This??",
      [
        {
          text: "Cancel",
          style: "ok"
        },
        {
          text: "ok",
          onPress: () => DeleteVertical(id),
          style: "ok"
        }
      ],
      { cancelable: false }
    );
  }
  // if (error.message == "Network Error") {
  //   Alert.alert(
  //     'Network Error',
  //     "Please try again after some time",
  //     [
  //       {
  //         text: 'Ok',
  //         onPress: () => console.log('Network problem'),
  //       },
  //     ],
  //     { cancelable: false },
  //   );
  // }
  // console.log(error.response);
  // Alert.alert(
  //   'error',
  //   error.response.data.error.message,
  //   [
  //     {
  //       text: 'Ok',
  //       onPress: () => console.log('enter valid details'),
  //     },
  //   ],
  //   { cancelable: false },
  // );

  const DeleteVertical = id => {
    updatekey(id + Math.random());
    const data = {
      id: id
    };
    // console.log("Deleted Data Id", data)
    console.log(global.access_token);
    const config = {
      url: "https://api.leadswatch.com/api/v1/vertical/delete/" + id.toString(),
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + global.access_token
      }
    };
    axios(config)
      .then(response => {
        // console.log('Inside Delete Vertical---', response);
      })
      .catch(error => {
        if (error.message == "Network Error") {
          Alert.alert(
            "Network Error",
            "Please try again after some time",
            [
              {
                text: "Ok",
                onPress: () => console.log("Network problem")
              }
            ],
            { cancelable: false }
          );
        }
        console.log(error.response);
        Alert.alert(
          "error",
          error.response.data.error.message,
          [
            {
              text: "Ok",
              onPress: () => console.log("Enter Valid Details")
            }
          ],
          { cancelable: false }
        );
      });
  };
  const list_items =
    Verticals_list.length > 0 ? (
      Verticals_list.map(item => (
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
          }}
          key={item.id}
        >
          <Card
            style={{
              width: wp(90.66),
              // height: hp(8.77),
              borderRadius: 10,
              borderWidth: 1,
              justifyContent: "center",
              alignItems: "center",
              borderColor: "transparent",
              elevation: 0
            }}
          >
            <CardItem
              style={{
                width: wp(90.66),
                // height: hp(8.77),
                borderRadius: 4,
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center"
              }}
            >
              <View style={{ width: wp(1.52) }}></View>
              <Text style={styles.textStyle}>{item.name}</Text>
              <View style={{ width: wp(6.52) }}></View>
              <TouchableOpacity
                onPress={() =>
                  GotoVertical(item.id, item.name, item.desc, item.url)
                }
              >
                <Edit width={15} height={15} />
              </TouchableOpacity>
              <View style={{ width: wp(5.52) }}></View>
              <TouchableOpacity onPress={() => deleteSure(item.id)}>
                <Delete width={15} height={15} />
              </TouchableOpacity>
            </CardItem>
          </Card>
          <View style={{ height: hp(0.4) }}></View>
        </View>
      ))
    ) : (
      <View
        style={{
          paddingTop: "5%",
          height: hp(100),
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "flex-start"
        }}
      >
        <Text style={{ color: "#A3A1C9", paddingTop: hp(29.73) }}>
          No Verticals Found!!!!
        </Text>
      </View>
    );

  return (
    <Root>
      <Container>
        <PageHeader
          title={"Verticals"}
          myfunc={() => dashboard()}
          profile={() => {
            props.navigation.navigate("ProfileDetails");
          }}
        ></PageHeader>

        {fetching && (
          // <View>
          //   <View style={{ height: hp(35) }} />
          //   <View >
          //     <ActivityIndicator size="large" color="#0000ff" />
          //   </View>
          // </View>
          <Loader />
        )}

        {!fetching && (
          <Content keyboardShouldPersistTaps={'handled'} style={{ backgroundColor: "#F3F4F7" }}>
            <Body>
              <ScrollView>
                <View>
                  <View style={{ height: hp(2.46) }}></View>
                  {list_items}
                </View>
              </ScrollView>
            </Body>
            <View style={{ height: hp(9) }}></View>
          </Content>
        )}

        {!fetching && (
          <View>
            <View
              style={{
                position: "absolute",
                left: 20,
                bottom: 10,
                width: wp(90.66),
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <MyButton
                style={{
                  width: wp(90.66),
                  height: hp(7.211),
                  backgroundColor: "#00B0EB",
                  borderRadius: 40,
                  justifyContent: "center",
                  alignItems: "center"
                }}
                myfunc={() => CreateVertical()}
              >
                <Text style={{ color: "white", fontWeight: "700" }}>
                  Create Vertical
                </Text>
              </MyButton>
            </View>
          </View>
        )}
      </Container>
    </Root>
  );
};
export default VerticalsMainPage;
const styles = StyleSheet.create({
  buttonText: {
    fontSize: 16,
    textAlign: "center",
    justifyContent: "center",
    margin: 7,

    color: "blue",
    backgroundColor: "transparent"
  },
  textStyle: {
    width: wp(60),
    // fontFamily: "Roboto",
    // backgroundColor: "red",
    fontSize: 16,
    color: "#00B0EB",
    fontWeight: "500"
  }
});
