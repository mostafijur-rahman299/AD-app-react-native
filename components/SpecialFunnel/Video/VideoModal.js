import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import { Text, View, StyleSheet, Image, ScrollView, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";

import StyledButton from "../../UI/StyledButton";
import CustomModal from "../../UI/Modal";
import Input from "../../UI/Input";
import colors from "../../Constant/colors";
import { BACKEND_HOST, Authorization_Token } from "../../../common/conf";
import { createFormData } from "../../../common/helperFunc";

function VideoModal(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [youtubeVideoId, setYoutubeVideoId] = useState("");
  const [position, setPosition] = useState("");
  const [thumbnail, setThumbnail] = useState(null);

  const { visible, hideModal, initialData, isForUpdateVideo } = props;

  useEffect(() => {
    if (visible) {
      setTitle(initialData.title);
      setDescription(initialData.description);
      setYoutubeVideoId(initialData.youtubeVideoId);
      setPosition(initialData.position);
      setThumbnail(initialData.thumbnail);
    }
  }, [visible, initialData, initialData.thumbnail]);

  const pickImage = useCallback(async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setThumbnail(result.uri);
    }
  }, []);

  const onTitleChange = (value) => setTitle(value);
  const onDescriptionChange = (value) => setDescription(value);
  const onYoutubeVideoIdChange = (value) => setYoutubeVideoId(value);
  const onPositionChange = (value) => setPosition(value);

  const handleSubmit = () => {
    const data = {
      title,
      description,
      video_ID: youtubeVideoId,
      position,
      funnel_obj: 11,
    };

    if ([null, "null", undefined, ""].includes(youtubeVideoId)) {
      Alert.alert("Warning!", "Youtube video id is required", [
        { text: "Okay", style: "destructive", onPress: () => {} },
      ]);
      return;
    }

    if (youtubeVideoId.trim().length > 11) {
      Alert.alert(
        "Warning!",
        "Ensure that video ID has no more than 11 characters.",
        [{ text: "Okay", style: "destructive", onPress: () => {} }]
      );
      return;
    }

    const url = isForUpdateVideo
      ? `${BACKEND_HOST}/app/api/special-funnel-videos/${initialData.id}/`
      : `${BACKEND_HOST}/app/api/special-funnel-videos/`;

    const method = isForUpdateVideo ? "put" : "post";

    axios({
      url: url,
      method: method,
      data: createFormData(data, { uri: thumbnail, name: "thumbnail" }),
      headers: {
        Authorization: Authorization_Token,
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
      },
    })
      .then((res) => res.data)
      .then((data) => {
        isForUpdateVideo
          ? props.onUpdatubeVideoList(false, true, data)
          : props.onUpdatubeVideoList(false, false, data);

        Alert.alert(
          "Success!",
          isForUpdateVideo ? "Video is updated" : "Video is added",
          [{ text: "Okay", style: "destructive", onPress: hideModal }]
        );
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response.data);
        }
      });
  };

  return (
    <CustomModal visible={visible} hideModal={hideModal}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Add Video</Text>
      </View>

      <ScrollView style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Text>Title</Text>
          <Input
            placeholder="Title..."
            onChangeText={onTitleChange}
            value={title}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text>Description</Text>
          <Input
            placeholder="Description..."
            onChangeText={onDescriptionChange}
            value={description}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text>Youtube Video ID</Text>
          <Input
            placeholder="Youtube Video ID..."
            onChangeText={onYoutubeVideoIdChange}
            value={youtubeVideoId}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text>Position</Text>
          <Input
            placeholder="Position..."
            onChangeText={onPositionChange}
            value={position}
          />
        </View>

        <View style={styles.inputContainer}>
          <StyledButton
            title="Choose file.."
            onPress={pickImage}
            buttonStyles={{
              borderColor: "#fbd106",
              borderWidth: 1.5,
              height: 38,
              borderRadius: 4,
              marginBottom: 10,
            }}
          />

          <View style={{ justifyContent: "center", alignItems: "center" }}>
            {thumbnail && (
              <Image
                source={{
                  uri: thumbnail,
                }}
                style={{ width: 300, height: 100 }}
                //   resizeMode={'center'}
              />
            )}
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <View style={styles.btn1}>
            <StyledButton
              title="Cancel"
              onPress={hideModal}
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
                padding: 20,
              }}
            />
          </View>

          <View style={styles.btn2}>
            <StyledButton
              title={"Submit"}
              onPress={handleSubmit}
              buttonStyles={{
                backgroundColor: colors.primary,
                height: 38,
                borderRadius: 4,
                marginBottom: 10,
              }}
              titleStyle={{
                color: "white",
                textTransform: "uppercase",
                fontSize: 14,
                fontWeight: "500",
                padding: 20,
              }}
            />
          </View>
        </View>
      </ScrollView>
    </CustomModal>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "80%",
    padding: 20,
    backgroundColor: "white",
    marginBottom: 90,
    marginTop: 40,
    borderRadius: 10,
    elevation: 45,
    zIndex: 15,
  },
  headerContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 26,
    color: colors.primary,
    borderBottomColor: colors.secondary,
    borderBottomWidth: 1.5,
  },
  closeIconContainer: {},
  closeIcons: {
    marginLeft: "auto",
    marginTop: -12,
    marginRight: -10,
    marginBottom: 10,
  },
  inputContainer: {
    marginBottom: 20,
  },
  slectContentTypePicker: {
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: "#fbd106",
    borderRadius: 4,
    height: 38,
  },
  formContainer: {
    flex: 1,
    marginTop: 30,
    paddingLeft: 10,
    paddingRight: 10,
  },
  buttonContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  btn2: {
    marginLeft: 20,
  },
  btn1: {},
});

export default React.memo(VideoModal);
