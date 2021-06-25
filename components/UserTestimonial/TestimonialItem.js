import axios from "axios";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import Ionicons from "react-native-vector-icons/Ionicons";
import colors from "../Constant/colors";
import { BACKEND_HOST, Authorization_Token } from "../../common/conf";

function TestimonialItem(props) {
  const { file, youtube_video_ID, text, id } = props.item;

  const openModal = () => {
    props.onInitialDataForUpdate({
      id: id,
      file: file,
      youtube_video_ID: youtube_video_ID,
      text: text,
      contentType: youtube_video_ID
        ? "youtube_video_ID"
        : file !== null
        ? "file"
        : youtube_video_ID,
    });
    props.onOpenModal();
  };

  const deleteTestimonial = () => {
    props.onUpdateTestimonialList({}, false, true, id);

    axios({
      url: `${BACKEND_HOST}/app/api/testimonials/${id}/`,
      method: "delete",
      headers: {
        Authorization: Authorization_Token,
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
      },
    });
  };

  const testimonialDeleteAlert = () => {
    Alert.alert("Warning!", "Are You sure want to delete this Testimonial ?", [
      { text: "Sure", style: "destructive", onPress: deleteTestimonial },
      { text: "No", style: "cancel", onPress: () => {} },
    ]);
  };


  return (
    <View style={styles.testimonialItemcontainer}>
      <View>
        {youtube_video_ID ? (
          <YoutubePlayer
            height={213}
            width={381}
            play={false}
            videoId={youtube_video_ID}
          />
        ) : (
          <Image source={{ uri: file }} style={{ width: 381, height: 213}} />
        )}
      </View>

      <View style={styles.editDeleteButtonContainer}>
        <Ionicons
          name="trash"
          color={colors.primary}
          size={30}
          onPress={testimonialDeleteAlert}
        />

        <Ionicons
          name="create"
          color={colors.primary}
          size={40}
          onPress={openModal}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  testimonialItemcontainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  editDeleteButtonContainer: {
    width: 381,
    backgroundColor: colors.secondary,
    paddingTop: 23,
    paddingBottom: 23,
    paddingLeft: 10,
    paddingRight: 10,
    height: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: -2,
  },
});

export default React.memo(TestimonialItem);
