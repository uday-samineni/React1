/* Created by Uday*/
/*on 04/10/2019 */
/**
 * last modified on 06/11/2019
 *
 */

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Alert
} from "react-native";
import Edit from "../../assets/Edit";
import axios from "axios";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import BackArrow from "../../assets/js/BackArrow";
import { Card, CardItem, Container, Content, Toast, Root } from "native-base";
import PageHeader from "../CustomComponents/PageHeader";
const BuyerList = props => {
  // buyer state stores the list of buyers
  const [buyer, setBuyer] = useState([]);
  // This state is used for loading screen
  const [fetching, setFetching] = useState(true);
  //function to get buyers list on loading
  useEffect(() => {
    const config = {
      url: "https://api.leadswatch.com/api/v1/buyer/list",//url 
      method: "get",//Method
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + global.access_token //Authentication token
      }
    };
    axios(config)
      .then(response => {
        console.log("BuyerList", response);
        // Buyers list is set to buyer state
        setBuyer(response.data.data);
        // To make activity Indicator off i.e setting state false
        setFetching(false);
      })
      // Error handling
      .catch(error => {
        console.log("Buyerlisterror1", error);
        Alert.alert(error.response.data.error.message);
      });
  }, []);
  //function to re-render after edit and delete this function is called if reponse is 200 in create and edit pages 
  const myfunc = () => {
    const config = {
      url: "https://api.leadswatch.com/api/v1/buyer/list", //Url to get Buyers list
      method: "get",//Method
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + global.access_token //Authentication token
      }
    };
    axios(config)
      .then(response => {
        console.log("BuyerListmyfunc", response);
        setBuyer(response.data.data);
      })
      .catch(error => {
        console.log("BuyerListerrormyfunc", error);//Error handling
      });
  };
  // To display Toast Messages
  useEffect(() => {
    // To display Toast Message after Creating Buyer
    if (props.navigation.getParam("success2") == 1) {
      console.log("im showing a Toast , lets party");
      Toast.show({
        text: "Successfully Created Buyer",
        textStyle: { textAlign: "center" }, // Aligning Text in Toast to Center
        buttonText: "",
        duration: 3000, //Toast Time to be displayed
        position: "center",
        style: { backgroundColor: "rgba(0,0,0,0.5)", } //Aligning Toast Message
      });
      props.navigation.setParams({ success2: false });
    }
    // To display Toast Message after Updating Buyer
    if (props.navigation.getParam("success3") == 1) {
      console.log("im showing a Toast , lets party");
      Toast.show({
        text: "Successfully Updated Buyer",
        buttonText: "",
        textStyle: { textAlign: "center" }, // Aligning Text in Toast to Center
        duration: 3000, //Toast Time to be displayed
        position: "center",
        style: { backgroundColor: "rgba(0,0,0,0.5)",  } //Aligning Toast Message
      });
      props.navigation.setParams({ success3: false });
    }
  });
  // Mapping Function to Display Buyers in Cards
  const buyeritems = buyer.map(buyeritem => {
    return (
      <Card style={{ width: wp(92), borderRadius: 4 ,borderColor:"transparent",elevation:0}}>
        <CardItem style={{ flexDirection: "column", borderRadius: 4 }}>
          <View style={{ flexDirection: "row" }}>
            <View style={{ width: wp(1) }} />
            {/* View displaying Image */}
            <View
              style={{
                width: wp(13),
                height: hp(6.5),
                borderRadius: wp(6.5),
                flexDirection: "column"
              }}
            >
              <Image
               source={{uri: `https://api.leadswatch.com/api/v1/file/buyer/${buyeritem.id}/26/26`}}
                style={{ height: "100%", width: "100%", borderRadius: wp(6.5) }}
              />
              <View style={{ height: hp(1) }} />
            </View>
            {/* End of View displaying Image */}
            <View style={{ width: wp(2) }} />
            <View style={{ flexDirection: "column" }}>
              {/* View displaying firstname lastname and Edit icon */}
              <View
                style={{
                  flexDirection: "row",
                  width: wp(70),
                  justifyContent: "space-between"
                }}
              >
                <Text
                  style={{
                    color: "#00B0EB",
                    fontSize: 14,
                    fontWeight: "bold"
                  }}
                >
                  {buyeritem.firstname}
                  {buyeritem.lastname}
                </Text>
                <View style={{ width: wp(6), flexDirection: "column" }}>
                  <TouchableOpacity
                    onPress={() => {
                      props.navigation.navigate("EditBuyer", {
                        id: buyeritem.id,
                        firstname: buyeritem.firstname,
                        middlename: buyeritem.middlename,
                        lastname: buyeritem.lastname,
                        contact: buyeritem.phone,
                        email: buyeritem.email,
                        company: buyeritem.company,
                        amount: buyeritem.amount,
                        Leads: buyeritem.Leads,
                        myfunc: myfunc
                      });
                    }}
                  >
                    <Edit color="#9B9B9B" />
                  </TouchableOpacity>
                </View>
              </View>
              {/* End of View displaying firstname lastname and Edit icon */}
              {/* View displaying Company */}
              <View style={{ flexDirection: "row" }}>
                <Text style={{ color: "#9B9B9B", fontSize: 11 }}>
                  {buyeritem.company}
                </Text>
              </View>
              {/* View displaying Phone and Email */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: wp(70)
                }}
              >
                <Text style={{ color: "#9B9B9B", fontSize: 11, width: wp(20) }}>
                  {buyeritem.phone}
                </Text>
                <View style={{ width: wp(8) }} />
                <Text style={{ color: "#9B9B9B", fontSize: 11, width: wp(50) }}>
                  {buyeritem.email}
                </Text>
                <View style={{ height: hp(1) }} />
              </View>
            </View>
          </View>
          <View style={{ height: hp(2) }} />
          {/* View displaying Buyercontacts and routes buttons */}
          <View style={{ flexDirection: "row", width: wp(88) }}>
            <View style={{ width: wp(2) }} />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: "#00B0EB",
                  borderRadius: 28,
                  width: wp(30),
                  justifyContent: "center",
                  alignItems: "center",
                  height: hp(3)
                }}
                onPress={() => {
                  props.navigation.navigate("BuyerContacts", {
                    id: buyeritem.id
                  });
                }}
              >
                <View style={{ width: wp(8) }} />

                <Text
                  style={{
                    color: "#FFFFFF",
                    fontSize: 12,
                    fontWeight: "bold"
                  }}
                >
                  Buyer Contacts
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{ width: wp(12) }} />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: "#00B0EB",
                  borderRadius: 28,
                  width: wp(30),
                  justifyContent: "center",
                  alignItems: "center",
                  height: hp(3)
                }}
                onPress={() => {
                  props.navigation.navigate("BuyerRoutes", {
                    buyer_id: buyeritem.id
                  });
                }}
              >
                <View style={{ width: wp(8) }} />

                <Text
                  style={{
                    color: "#FFFFFF",
                    fontSize: 12,
                    fontWeight: "bold"
                  }}
                >
                  Routes
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* End of View displaying Buyercontacts and routes buttons */}
          <View style={{ height: hp(1) }} />
          <View style={{ flexDirection: "row", width: wp(88) }}>
            <View style={{ width: wp(15) }} />
            <View
            >

              <Text
                style={{
                  fontSize: 10,
                  color:'#9B9B9B',
                  fontWeight: "bold"
                }}
              >
                {buyeritem.contacts}
              </Text>
            </View>
            <View style={{ width: wp(38) }} />
            <View
              
            >
              <Text
                style={{
                  color:'#9B9B9B',
                  fontSize: 10,
                  fontWeight: "bold"
                }}
              >
            {buyeritem.routes}
              </Text>
            </View>
          </View>
        </CardItem>
      </Card>
    );
  });
  // End of Mapping function
  return (
    // Root is used to display Toast Message
    <Root>
      <Container>
        {/* PageHeader is Imported to display Header props are sent */}
        <PageHeader
          title="Buyer"
          myfunc={() => {
            props.navigation.goBack(null);
          }}
          profile={() => {
            props.navigation.navigate("ProfileDetails");
          }}
        />
        {/* To display after activity Indicator or Loading Screen is off */}
        {!fetching && (
          <Content keyboardShouldPersistTaps={'handled'} style={{ backgroundColor: "#F3F4F7" }}>
            <View style={{ height: hp(1) }} />
            {buyer.length > 0 && (
              <View style={{ flexDirection: "column" }}>
                <View
                  style={{
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  {buyeritems}
                </View>
                <View style={{height:hp(10)}}></View>
              </View>
            )}
            {buyer.length == 0 && (
              <View style={{flexDirection:"column",justifyContent:"center",alignItems:"center",marginTop:Platform.OS==='android'? 250 :"60%"}}>
                <Text>No Data found !!Kindly add Buyers</Text>
              </View>
            )}
          </Content>
        )}
        {/* Displaying Loading Screen */}
        {fetching && (
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <View style={{ height: hp(15) }} />
            <Image
              style={{ width: "50%", height: "50%" }}
              source={require("../../assets/loading.gif")}
            />
          </View>
        //   <View>
        //   <View style={{height: hp(35)}} />
        //  <View >
        //     <ActivityIndicator  size="large" color="#0000ff" />
        //     <Text>Fetching Buyers!!!Please wait</Text>
        //   </View>
        //   </View>
        )}
        {/* View to display Button */}
        {!fetching && (
          <View>
            <View
              style={{
                flexDirection: "row",
                position: "absolute",
                bottom: 10,
                left: 10
              }}
            >
              <View style={{ width: wp(3) }} />
              <TouchableOpacity
                style={{
                  width: wp(90.66),
                  height: hp(7.211),
                  backgroundColor: "#00B0EB",
                  borderRadius: 40,
                  justifyContent: "center",
                  alignItems: "center"
                }}
                onPress={() => {
                  props.navigation.navigate("CreateBuyer", {
                    myfunc: myfunc
                  });
                }}
              >
                <Text
                  style={{
                    // paddingLeft: 30,
                    paddingTop: 15,
                    color: "#FFFFFF",
                    fontSize: 14,
                    fontWeight: "bold",
                    alignContent:"center"
                  }}
                 
                >
                  Create Buyer
                </Text>

                <View style={{ height: hp(2) }} />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Container>
    </Root>
  );
};

export default BuyerList;
