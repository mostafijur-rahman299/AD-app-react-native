import axios from "axios";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import colors from "../../Constant/colors";
import VideoItem from "./VideoItem";
import VideoModal from "./VideoModal";
import { BACKEND_HOST, Authorization_Token } from "../../../common/conf";

function Video(props) {
  const [onOpenMode, setOnOpenMode] = useState(false);
  const [videoList, setVideoList] = useState([]);
  const [initialData, setInitialData] = useState({});
  const [isForUpdateVideo, setIsForUpdateVideo] = useState(false);

  useEffect(() => {
    axios({
      url: `${BACKEND_HOST}/app/api/special-funnel-videos/`,
      method: "get",
      headers: {
        Authorization: Authorization_Token,
      },
    })
      .then((res) => res.data)
      .then((data) => setVideoList(data));
  }, []);

  const openModal = useCallback(() => setOnOpenMode(true), []);
  const closeModal = useCallback(() => setOnOpenMode(false), []);

  const updatubeVideoList = useCallback(
    (hasDelete = false, hasUpdate = false, data = {}) => {
      setVideoList((prevVideos) => {
        if (hasUpdate) {
          return [
            ...prevVideos.map((video) =>
              video.id == data.id ? { ...video, ...data } : video
            ),
          ];
        } else if (hasDelete) {
          return [...prevVideos.filter((video) => video.id != data)];
        }
        return [video, ...prevVideos];
      });
    },
    []
  );

  const openVideoAddModal = () => {
    setInitialData({
      title: "",
      description: "",
      youtubeVideoId: "",
      position: "",
      thumbnail: null,
    });
    openModal();
    setIsForUpdateVideo(false);
  };

  const openVideoEditModal = (data = {}) => {
    setIsForUpdateVideo(true);
    setInitialData(data);
    openModal();
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerTitleContainer}>
        <Text style={styles.headerTitle}>Funnel Videos</Text>
      </View>

      <FlatList
        keyExtractor={(item, index) => item.id.toString()}
        data={videoList}
        renderItem={(itemData) => (
          <VideoItem
            item={itemData.item}
            key={itemData.item.id}
            onOpenVideoEditModal={openVideoEditModal}
            onUpdateVideoList={updatubeVideoList}
          />
        )}
      />

      <View style={styles.addButtonContainer}>
        <TouchableOpacity style={styles.addIcon} onPress={openVideoAddModal}>
          <Ionicons name="add-circle-sharp" color={colors.primary} size={60} />
        </TouchableOpacity>
      </View>

      <VideoModal
        visible={onOpenMode}
        hideModal={closeModal}
        onUpdatubeVideoList={updatubeVideoList}
        initialData={initialData}
        isForUpdateVideo={isForUpdateVideo}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerTitleContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
    borderBottomColor: colors.primary,
    borderBottomWidth: 2,
    borderStartColor: "red",
  },
  headerTitle: {
    color: colors.primary,
    fontSize: 25,
    textAlign: "center",
  },
  addButtonContainer: {
    flex: 1,
    justifyContent: "center",
    alignSelf: "center",
  },
  addIcon: {
    position: "absolute",
    bottom: 0,
    left: -25,
    shadowColor: "white",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.27,
    shadowRadius: 2.5,
    elevation: 40,
    zIndex: 10,
  },
  testimonialList: {
    marginTop: 20,
  },
});

export default React.memo(Video);
