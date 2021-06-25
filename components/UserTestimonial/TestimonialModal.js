import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  Dimensions,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import RNPickerSelect from "react-native-picker-select";
import * as ImagePicker from "expo-image-picker";

import colors from "../Constant/colors";
import Input from "../UI/Input";
import { pickerSelectStyles } from "../Constant/styles";
import StyledButton from "../UI/StyledButton";
import { createFormData } from "../../common/helperFunc";
import { BACKEND_HOST, Authorization_Token } from "../../common/conf";
import CustomModal from "../UI/Modal";

function TestimonialModal(props) {
  const [contentType, setContentType] = useState("youtube_video_id");
  const [file, setFile] = useState(null);
  const [youtubeVideoID, setYoutubeVideoID] = useState("");
  const [text, setText] = useState("");

  const {
    isForUpdate,
    initialData,
    hideModal,
    onUpdateTestimonialList,
    visible,
  } = props;

  useEffect(() => {
    setText(initialData.text);
    setYoutubeVideoID(initialData.youtube_video_ID);
    setContentType(initialData.contentType);
    setFile(initialData.file);
  }, [visible, initialData.file]);

  const onContentTypeChange = (value) => {
    setContentType(value);
  };
  const onTextChange = (value) => setText(value);
  const onChangeYoutubeVideoID = (value) => setYoutubeVideoID(value);

  const pickImage = useCallback(async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setFile(result.uri);
    }
  }, []);

  const handleSubmit = () => {
    if (
      (file === null && youtubeVideoID.trim().length === 0) ||
      text.trim().length === 0
    ) {
      Alert.alert(
        "Invalid Input",
        "Please enter YOUTUBE VIDEO ID / FILE / Text",
        [{ text: "Okay", style: "destructive", onPress: () => {} }]
      );
      return;
    }

    const data = { file, text, youtube_video_ID: youtubeVideoID };

    const url = isForUpdate
      ? `${BACKEND_HOST}/app/api/testimonials/${initialData.id}/`
      : `${BACKEND_HOST}/app/api/testimonials/`;

    const method = isForUpdate ? "put" : "post";

    axios({
      url: url,
      method: method,
      data: createFormData(data, { uri: file, name: "file" }),
      headers: {
        Authorization: Authorization_Token,
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
      },
    })
      .then((res) => res.data)
      .then((data) => {
        isForUpdate
          ? onUpdateTestimonialList(data, true)
          : onUpdateTestimonialList(data);

        Alert.alert(
          "Success!",
          isForUpdate
            ? "Customer Experience is updated"
            : "Customer Experience is added",
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
        <Text style={styles.headerTitle}>Add Customer Experience</Text>
      </View>

      <ScrollView style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Text>Text</Text>
          <Input
            placeholder="Text..."
            onChangeText={onTextChange}
            value={text}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text>Content Type</Text>

          <View style={styles.slectContentTypePicker}>
            <RNPickerSelect
              onValueChange={onContentTypeChange}
              items={[
                { label: "Youtube", value: "youtube_video_ID" },
                { label: "File", value: "file" },
              ]}
              placeholder={{
                label: "Select Your Content...",
                value: null,
              }}
              placeholderTextColor={"red"}
              value={contentType}
              style={{
                placeholder: { color: "grey" },
                ...pickerSelectStyles,
              }}
            />
          </View>
        </View>

        {contentType === "file" ? (
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

            {file && (
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Image
                  source={{
                    uri: file,
                    cache: "reload",
                  }}
                  style={{ width: 300, height: 100 }}
                />
              </View>
            )}
          </View>
        ) : (
          <View style={styles.inputContainer}>
            <Input
              placeholder="Youtube Video ID..."
              onChangeText={onChangeYoutubeVideoID}
              value={youtubeVideoID}
            />
          </View>
        )}

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
              title={isForUpdate ? "Update" : "Submit"}
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
    textAlign: 'center'
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

export default React.memo(TestimonialModal);
