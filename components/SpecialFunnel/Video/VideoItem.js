import axios from "axios";
import React from "react";
import { View, StyleSheet, Alert } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import Ionicons from "react-native-vector-icons/Ionicons";
import colors from "../../Constant/colors";
import { BACKEND_HOST, Authorization_Token } from "../../../common/conf";

function VideoItem(props) {
  const { video_ID, id, title, description, position, thumbnail_url } =
    props.item;
  const { onOpenVideoEditModal, onUpdateVideoList } = props;

  const openModal = () => {
    onOpenVideoEditModal({
      id: id,
      title: title,
      description: description,
      youtubeVideoId: video_ID,
      position: position.toString(),
      thumbnail:
        thumbnail_url !== null && thumbnail_url.trim().length === 0
          ? null
          : thumbnail_url
    });
  };

  const deleteVideo = () => {
    onUpdateVideoList(true, false, id);

    axios({
      url: `${BACKEND_HOST}/app/api/special-funnel-videos/${id}/`,
      method: "delete",
      headers: {
        Authorization: Authorization_Token,
        Accept: "application/json",
      },
    });
  };

  const testimonialDeleteAlert = () => {
    Alert.alert("Warning!", "Are You sure want to delete this Testimonial ?", [
      { text: "Sure", style: "destructive", onPress: deleteVideo },
      { text: "No", style: "cancel", onPress: () => {} },
    ]);
  };

  return (
    <View style={styles.testimonialItemcontainer}>
      <View style={styles.videoContainer}>
        <YoutubePlayer
          height={260}
          width={381}
          play={false}
          videoId={video_ID}
        />
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
    marginTop: -45,
  },
});

export default React.memo(VideoItem);
