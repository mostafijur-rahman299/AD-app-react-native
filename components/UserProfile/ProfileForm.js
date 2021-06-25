import React, { useState, useCallback, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Button,
  Image,
  Platform,
  Alert,
  TouchableOpacity,
  TouchableHighlight
} from "react-native";
import Input from "../UI/Input";
import RNPickerSelect from "react-native-picker-select";

import * as ImagePicker from "expo-image-picker";
import StyledButton from "../UI/StyledButton";
import { createFormData } from "../../common/helperFunc";
import axios from "axios";
import { Authorization_Token, BACKEND_HOST } from "../../common/conf";
import { pickerSelectStyles } from "../Constant/styles";
import colors from "../../components/Constant/colors";


function ProfileForm(props) {
  const [photo, setPhoto] = useState(null);
  const [country, setCountry] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [paypalEmail, setPaypalEmail] = useState("");
  const [payoneerEmail, setPayoneerEmail] = useState("");
  const [facebookLink, setFacebookLink] = useState("");
  const [twitterLink, setTwitterLink] = useState("");
  const [youtubeLink, setYoutubeLink] = useState("");
  const [instagramLink, setInstagramLink] = useState("");
  const [snapchatLink, setSnapchatLink] = useState("");
  const [tikTokLink, setTikTokLink] = useState("");
  const [linkedinLink, setLinkedinLink] = useState("");
  const [yourStory, setyourStory] = useState("");

  useEffect(() => {
    axios({
      url: `${BACKEND_HOST}/app/api/user-profile/profile_details/`,
      method: "GET",
      headers: {
        Authorization: Authorization_Token,
      },
    })
      .then((res) => res.data)
      .then((data) => {
        setFirstName(data.first_name);
        setLastName(data.last_name);
        setEmail(data.email);
        setCountry(data.country);
        setPaypalEmail(data.paypal_email);
        setPayoneerEmail(data.payoneer_email);
        setFacebookLink(data.facebook_link);
        setTwitterLink(data.twitter_link);
        setYoutubeLink(data.youtube_link);
        setInstagramLink(data.instagram_link);
        setSnapchatLink(data.snap_chat_link);
        setTikTokLink(data.tiktok_link);
        setLinkedinLink(data.linkedin_link);
        setyourStory(data.basic_info);
        setPhoto(data.update_profile_pic);
      });
  }, []);

  const onChangeCountry = (value) => setCountry(value);
  const onChangeFirstName = (value) => setFirstName(value);
  const onChangeLastName = (value) => setLastName(value);
  const onChangeEmail = (value) => setEmail(value);
  const onChangePaypalEmail = (value) => setPaypalEmail(value);
  const onChangePayoneerEmail = (value) => setPayoneerEmail(value);
  const onChangeFacebookLink = (value) => setFacebookLink(value);
  const onChangeTwitterLink = (value) => setTwitterLink(value);
  const onChangeYoutubeLink = (value) => setYoutubeLink(value);
  const onChangeInstagramLink = (value) => setInstagramLink(value);
  const onChangeSnapchatLink = (value) => setSnapchatLink(value);
  const onChangeTikTokLink = (value) => setTikTokLink(value);
  const onChangeLinkedinLink = (value) => setLinkedinLink(value);
  const onChangeYouStory = (value) => setyourStory(value);

  const pickImage = useCallback(async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setPhoto(result.uri);
    }
  }, []);

  const handleSubmitData = () => {
    const data = {
      email: email,
      first_name: firstName,
      last_name: lastName,
      facebook_link: facebookLink,
      instagram_link: instagramLink,
      twitter_link: twitterLink,
      linkedin_link: linkedinLink,
      youtube_link: youtubeLink,
      country: country,
      basic_info: yourStory,
      paypal_email: paypalEmail,
      payoneer_email: payoneerEmail,
      snap_chat_link: snapchatLink,
      tiktok_link: tikTokLink,
    };

    axios({
      url: `${BACKEND_HOST}/app/api/user-profile/update_profile/`,
      method: "put",
      data: createFormData(data, { uri: photo, name: "profile_pic" }),
      headers: {
        Authorization: Authorization_Token,
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
      },
    })
      .then((res) => res.data)
      .then((data) => {
        Alert.alert("Success!", "Profile is updated ?", [
          { text: "Okk", style: "destructive", onPress: () => {} },
        ]);
      })

      .catch((err) => {
        if (err.response) {
          console.log(err.response.data);
        }
      });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.subContainer}>
        <View style={styles.inputContainer}>
          <Text>First Name</Text>
          <Input
            placeholder="First Name"
            onChangeText={onChangeFirstName}
            value={firstName}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text>Last Name</Text>
          <Input
            placeholder="Last Name"
            onChangeText={onChangeLastName}
            value={lastName}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text>Email</Text>
          <Input
            placeholder="Email Address"
            onChangeText={onChangeEmail}
            value={email}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text>Country</Text>

          <View style={styles.slectCountryPicker}>
            <RNPickerSelect
              onValueChange={onChangeCountry}
              items={[
                { label: "Bandladesh", value: "bangladesh" },
                { label: "Pakisthan", value: "pakisthan" },
                { label: "Palestine", value: "palestine" },
              ]}
              placeholder={{
                label: "Select your country...",
                value: null,
              }}
              placeholderTextColor={"red"}
              value={country}
              style={{
                placeholder: { color: "grey" },
                ...pickerSelectStyles,
              }}
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text>Paypal Email</Text>
          <Input
            placeholder="paypal@gmail.com"
            onChangeText={onChangePaypalEmail}
            value={paypalEmail}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text>Payoneer Email</Text>
          <Input
            placeholder="Payoneer"
            onChangeText={onChangePayoneerEmail}
            value={payoneerEmail}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text>Facebook Link</Text>
          <Input
            placeholder="Facebook Link"
            onChangeText={onChangeFacebookLink}
            value={facebookLink}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text>Twitter Link</Text>
          <Input
            placeholder="Twitter Link"
            onChangeText={onChangeTwitterLink}
            value={twitterLink}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text>Youtube Link</Text>
          <Input
            placeholder="Youtube Link"
            onChangeText={onChangeYoutubeLink}
            value={youtubeLink}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text>Instagram Link</Text>
          <Input
            placeholder="Instagram Link"
            onChangeText={onChangeInstagramLink}
            value={instagramLink}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text>Snapchat Link</Text>
          <Input
            placeholder="Snapchat Link"
            onChangeText={onChangeSnapchatLink}
            value={snapchatLink}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text>TikTok Link</Text>
          <Input
            placeholder="TikTok Link"
            onChangeText={onChangeTikTokLink}
            value={tikTokLink}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text>Linkedin Link</Text>
          <Input
            placeholder="Linkedin Link"
            onChangeText={onChangeLinkedinLink}
            value={linkedinLink}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text>Your Story</Text>
          <Input
            multiline={true}
            placeholder="Your Story"
            onChangeText={onChangeYouStory}
            value={yourStory}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text>Profile Image</Text>
          <StyledButton
            title="Choose Photo"
            onPress={pickImage}
            buttonStyles={{
              borderColor: "#fbd106",
              borderWidth: 1.5,
              height: 38,
              borderRadius: 4,
              marginBottom: 10,
            }}
          />

          {photo && (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Image
                source={{ uri: photo }}
                style={{ width: 370, height: 150, borderRadius: 5 }}
              />
            </View>
          )}
        </View>

        <TouchableHighlight style={[styles.inputContainer]}>
          <StyledButton
            title="Submit Data"
            onPress={handleSubmitData}
            buttonStyles={{
              backgroundColor: colors.secondary,
              height: 38,
              borderRadius: 4,
              marginBottom: 10,
            }}
            titleStyle={{
              color: "white",
              textTransform: "uppercase",
              fontSize: 14,
              fontWeight: "500",
            }}
          />
        </TouchableHighlight>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 20,
    alignSelf: "center",
  },
  subContainer: {
    width: "95%",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 10,
  },
  inputContainer: {
    marginBottom: 20,
  },
  slectCountryPicker: {
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: "#fbd106",
    borderRadius: 4,
    height: 38,
  },
});

export default React.memo(ProfileForm);
