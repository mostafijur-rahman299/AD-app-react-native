import React, { useState, useCallback, useEffect, useRef } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Button,
  Image,
  Platform,
  Linking,
  Alert,
} from "react-native";
import Input from "../../components/UI/Input";
import {
  RichEditor,
  RichToolbar,
  actions,
} from "react-native-pell-rich-editor";

import * as ImagePicker from "expo-image-picker";
import StyledButton from "../../components/UI/StyledButton";
import axios from "axios";
import colors from "../../components/Constant/colors";
import { CheckBox } from "react-native-elements";
import { createFormData, onPressAddImage } from "../../common/helperFunc";
import { BACKEND_HOST, Authorization_Token } from "../../common/conf";

function NormalWarmFunnel(props) {
  var richtext1 = useRef();
  let richtext2 = useRef();
  let richtext3 = useRef();

  const [defaultTitle, setDefaultTitle] = useState("");
  const [defaultSubTitle, setDefaultSubTitle] = useState("");
  const [defaultTextUnderTitle, setDefaultTextUnderTitle] = useState("");

  const [coldFunnelLink, setColdFunnelLink] = useState("");

  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [textUnderTitle, setTextUnderTitle] = useState("");

  const [introductionVideoID, setIntroductionVideoID] = useState("");
  const [thumbnail, setThumbnail] = useState(null);

  const [button1Text, setButton1Text] = useState("");
  const [button2Text, setButton2Text] = useState("");
  const [button3Text, setButton3Text] = useState("");

  const [button1Link, setButton1Link] = useState("");
  const [button2Link, setButton2Link] = useState("");
  const [button3Link, setButton3Link] = useState("");

  const [isButton1Checked, setIsButton1Checked] = useState(true);
  const [isButton2Checked, setIsButton2Checked] = useState(true);
  const [isButton3Checked, setIsButton3Checked] = useState(true);

  useEffect(() => {
    axios({
      url: `${BACKEND_HOST}/app/api/normal-warm-funnel/info/`,
      method: "get",
      headers: {
        Authorization: Authorization_Token,
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
      },
    })
      .then((res) => res.data)
      .then((data) => {
        setTitle(data.title);
        setSubTitle(data.sub_title);
        setTextUnderTitle(data.text_under_sub_title);
        setButton1Text(data.button1_text);
        setButton2Text(data.button2_text);
        setButton3Text(data.button3_text);
        setButton1Link(data.button1_link);
        setButton2Link(data.button2_link);
        setButton3Link(data.button3_link);
        setIsButton1Checked(data.is_button1_special);
        setIsButton2Checked(data.is_button2_special);
        setIsButton3Checked(data.is_button3_special);

        setThumbnail(data.thumbnail);

        setIntroductionVideoID(data.presentation_video_ID);
        setColdFunnelLink(data.cold_funnel_link);

        setDefaultTitle(data.title);
        setDefaultSubTitle(data.sub_title);
        setDefaultTextUnderTitle(data.text_under_sub_title);
      });
  }, []);

  useEffect(() => {
    richtext1.setContentHTML(defaultTitle);
    richtext2.setContentHTML(defaultSubTitle);
    richtext3.setContentHTML(defaultTextUnderTitle);
  }, [defaultTitle, defaultSubTitle, defaultTextUnderTitle]);

  const onTitleChange = (value) => setTitle(value);
  const onSubTitleChange = (value) => setSubTitle(value);
  const onTextUnderTitleChange = (value) => setTextUnderTitle(value);

  const onButton1CheckboxChange = () => setIsButton1Checked((prevS) => !prevS);
  const onButton2CheckboxChange = () => setIsButton2Checked((prevS) => !prevS);
  const onButton3CheckboxChange = () => setIsButton3Checked((prevS) => !prevS);

  const onButton1TextChange = (value) => setButton1Text(value);
  const onButton2TextChange = (value) => setButton2Text(value);
  const onButton3TextChange = (value) => setButton3Text(value);

  const onButton1LinkChange = (value) => setButton1Link(value);
  const onButton2LinkChange = (value) => setButton2Link(value);
  const onButton3LinkChange = (value) => setButton3Link(value);

  const onChangeIntorductionVideoId = (value) => setIntroductionVideoID(value);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setThumbnail(result.uri);
    }
  };

  const handleSubmit = () => {
    const data = {
      title: title,
      sub_title: subTitle,
      text_under_sub_title: textUnderTitle,
      button1_text: button1Text,
      button2_text: button2Text,
      button3_text: button3Text,
      presentation_video_ID: introductionVideoID,
      button1_link: button1Link,
      button2_link: button2Link,
      button3_link: button3Link,
      is_button1_special: isButton1Checked,
      is_button2_special: isButton2Checked,
      is_button3_special: isButton3Checked,
    };

    axios({
      url: `${BACKEND_HOST}/app/api/normal-warm-funnel/update_normal_warm_funnel/`,
      method: "put",
      data: createFormData(data, {
        uri: thumbnail,
        name: "presentation_video_thumbnail",
      }),
      headers: {
        Authorization: Authorization_Token,
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
      },
    })
      .then((res) => res.data)
      .then((data) => {
        Alert.alert("Success!", "Funnel is updated", [
          { text: "Okay", style: "destructive", onPress: () => {} },
        ]);
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response.data);
        }

        console.log(err);
      });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.subContainer}>
        <View style={styles.inputContainer}>
          <Text>Title</Text>
          <RichToolbar
            getEditor={() => richtext1}
            selectedIconTint={colors.primary}
            iconTint={"black"}
            selectedButtonStyle={colors.primary}
            actions={[
              actions.insertImage,
              actions.setBold,
              actions.setItalic,
              actions.insertBulletsList,
              actions.insertOrderedList,
              actions.insertLink,
              actions.keyboard,
              actions.setStrikethrough,
              actions.setUnderline,
              actions.removeFormat,
              actions.insertVideo,
              actions.checkboxList,
              actions.undo,
              actions.redo,
            ]}
            onPressAddImage={() => onPressAddImage(richtext1)}
          />

          <RichEditor
            ref={(r) => (richtext1 = r)}
            placeholder="New Title..."
            editorStyle={{
              backgroundColor: "#fff",
              placeholderColor: "grey",
              caretColor: "black",
            }}
            style={{
              borderColor: colors.primary,
              borderWidth: 2,
              borderRadius: 5,
            }}
            onChange={onTitleChange}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text>Sub-Title</Text>
          <RichToolbar
            getEditor={() => richtext2}
            selectedIconTint={colors.primary}
            iconTint={"black"}
            selectedButtonStyle={colors.primary}
            actions={[
              actions.insertImage,
              actions.setBold,
              actions.setItalic,
              actions.insertBulletsList,
              actions.insertOrderedList,
              actions.insertLink,
              actions.keyboard,
              actions.setStrikethrough,
              actions.setUnderline,
              actions.removeFormat,
              actions.insertVideo,
              actions.checkboxList,
              actions.undo,
              actions.redo,
            ]}
            onPressAddImage={() => onPressAddImage(richtext2)}
          />

          <RichEditor
            ref={(r) => (richtext2 = r)}
            placeholder="New Sub-Title..."
            editorStyle={{
              backgroundColor: "#fff",
              placeholderColor: "grey",
              caretColor: "black",
            }}
            style={{
              borderColor: colors.primary,
              borderWidth: 2,
              borderRadius: 5,
            }}
            onChange={onSubTitleChange}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text>Text Under Sub-Title</Text>
          <RichToolbar
            getEditor={() => richtext3}
            selectedIconTint={colors.primary}
            iconTint={"black"}
            selectedButtonStyle={colors.primary}
            actions={[
              actions.insertImage,
              actions.setBold,
              actions.setItalic,
              actions.insertBulletsList,
              actions.insertOrderedList,
              actions.insertLink,
              actions.keyboard,
              actions.setStrikethrough,
              actions.setUnderline,
              actions.removeFormat,
              actions.insertVideo,
              actions.checkboxList,
              actions.undo,
              actions.redo,
            ]}
            onPressAddImage={() => onPressAddImage(richtext2)}
          />

          <RichEditor
            ref={(r) => (richtext3 = r)}
            placeholder="Text Under Sub-Title..."
            editorStyle={{
              backgroundColor: "#fff",
              placeholderColor: "grey",
              caretColor: "black",
            }}
            style={{
              borderColor: colors.primary,
              borderWidth: 2,
              borderRadius: 5,
            }}
            onChange={onTextUnderTitleChange}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text>Introduction Video ID</Text>
          <Input
            placeholder="Introduction Video ID..."
            onChangeText={onChangeIntorductionVideoId}
            value={introductionVideoID}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text>First Button</Text>
          <Input
            placeholder="First Button..."
            onChangeText={onButton1TextChange}
            value={button1Text}
          />
          <View style={styles.button1SpecialCheckbox}>
            <CheckBox
              checked={isButton1Checked}
              onPress={onButton1CheckboxChange}
            />
          </View>
          {!isButton1Checked && (
            <View style={[styles.inputSubContainer]}>
              <Text>First Button Link</Text>
              <Input
                placeholder="First Button Link..."
                onChangeText={onButton1LinkChange}
                value={button1Link}
              />
            </View>
          )}
        </View>

        <View style={styles.inputContainer}>
          <Text>Second Button</Text>
          <Input
            placeholder="Second Button..."
            onChangeText={onButton2TextChange}
            value={button2Text}
          />
          <View style={styles.button1SpecialCheckbox}>
            <CheckBox
              checked={isButton2Checked}
              onPress={onButton2CheckboxChange}
            />
          </View>
          {!isButton2Checked && (
            <View style={[styles.inputSubContainer]}>
              <Text>Second Button Link</Text>
              <Input
                placeholder="Second Button Link..."
                onChangeText={onButton2LinkChange}
                value={button2Link}
              />
            </View>
          )}
        </View>

        <View style={[styles.inputContainer]}>
          <Text>Third Button</Text>
          <Input
            placeholder="Third Button..."
            onChangeText={onButton3TextChange}
            value={button3Text}
          />
          <View style={styles.button1SpecialCheckbox}>
            <CheckBox
              checked={isButton3Checked}
              onPress={onButton3CheckboxChange}
            />
          </View>
          {!isButton3Checked && (
            <View style={[styles.inputSubContainer]}>
              <Text>Third Button Link</Text>
              <Input
                placeholder="Third Button Link..."
                onChangeText={onButton3LinkChange}
                value={button3Link}
              />
            </View>
          )}
        </View>

        <View style={styles.inputContainer}>
          <Text>Video Thumbnail</Text>
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

          {thumbnail && (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Image
                source={{ uri: thumbnail }}
                style={{ width: 370, height: 150, borderRadius: 5 }}
              />
            </View>
          )}
        </View>

        <View style={[styles.inputContainer]}>
          <StyledButton
            title="Submit Data"
            onPress={handleSubmit}
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
        </View>

        <Text
          style={styles.coldLink}
          onPress={() => Linking.openURL(coldFunnelLink)}
        >
          Show the cold funnel
        </Text>
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
  },
  inputContainer: {
    marginBottom: 20,
  },
  button1SpecialCheckbox: {
    position: "absolute",
    top: 12,
    right: -14,
  },
  inputSubContainer: {
    width: "90%",
    marginTop: 10,
    alignSelf: "center",
    marginLeft: "auto",
  },
  coldLink: {
    color: "black",
    fontSize: 17,
    borderBottomColor: "black",
    borderBottomWidth: 2,
    marginBottom: 20,
    marginLeft: "auto",
  },
});

export default React.memo(NormalWarmFunnel);
