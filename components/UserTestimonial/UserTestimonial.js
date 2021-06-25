import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import colors from "../Constant/colors";
import TestimonialItem from "./TestimonialItem";
import { BACKEND_HOST, Authorization_Token } from "../../common/conf";
import TestimonialModal from "./TestimonialModal";

function UserTestimonial(props) {
  const [testimonialList, setTestimonialList] = useState([]);
  const [onOpenMode, setOnOpenMode] = useState(false);
  const [initialData, setInitialData] = useState({
    file: null,
    youtube_video_ID: "",
    text: "",
    contentType: "youtube_video_ID",
  });
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    axios({
      url: `${BACKEND_HOST}/app/api/testimonials/`,
      method: "get",
      headers: {
        Authorization: Authorization_Token,
      },
    })
      .then((res) => res.data)
      .then((data) => setTestimonialList(data))

      .catch((err) => {
        if (err.response) {
          console.log(err.response.data);
        }
      });
  }, []);

  const openModal = () => setOnOpenMode(true);
  const closeModal = () => setOnOpenMode(false);

  const updateTestimonialList = (
    testimonial,
    hasUpdate = false,
    hasRemove = false,
    id = null
  ) => {
    setTestimonialList((prevS) => {
      if (hasUpdate) {
        return [
          ...prevS.map((item) =>
            item.id === testimonial.id ? { ...item, ...testimonial } : item
          ),
        ];
      }
      if (hasRemove) {
        return [...prevS.filter((item) => item.id !== id)];
      }
      return [testimonial, ...prevS];
    });
  };

  const initialDataForUpdate = (data) => {
    setInitialData(data);
    setIsUpdate(true);
  };

  const testimonialAddModal = () => {
    setIsUpdate(false);
    setInitialData({
      file: null,
      youtube_video_ID: "",
      text: "",
      contentType: "youtube_video_ID",
    });
    openModal();
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerTitleContainer}>
        <Text style={styles.headerTitle}>
          Customer Experiences and Recommendations
        </Text>
      </View>

      <FlatList
        keyExtractor={(item, index) => item.id.toString()}
        data={testimonialList}
        renderItem={(itemData) => (
          <TestimonialItem
            item={itemData.item}
            key={itemData.item.id}
            onOpenModal={openModal}
            onInitialDataForUpdate={initialDataForUpdate}
            onUpdateTestimonialList={updateTestimonialList}
          />
        )}
      />

      <View style={styles.addButtonContainer}>
        <TouchableOpacity style={styles.addIcon} onPress={testimonialAddModal}>
          <Ionicons name="add-circle-sharp" color={colors.primary} size={60} />
        </TouchableOpacity>
      </View>

      <TestimonialModal
        isForUpdate={isUpdate}
        initialData={initialData}
        onUpdateTestimonialList={updateTestimonialList}
        visible={onOpenMode}
        hideModal={closeModal}
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
    fontSize: 22,
    textAlign: "center",
  },
  addButtonContainer: {
    flex: 1,
    justifyContent: "center",
    alignSelf: "center",
  },
  addIcon: {
    position: "absolute",
    bottom: 5,
    left: -20,
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

export default React.memo(UserTestimonial);
