import {useCallback, useState} from 'react';
import { Platform } from "react-native";
import mime from "mime";

const createFormData = (body = {}, photo = { uri: null, name: "" }) => {
  const data = new FormData();

  if (photo.uri !== null) {
    let localUri = photo.uri;
    data.append(photo.name, {
      uri: Platform.OS === "ios" ? localUri.replace("file://", "") : localUri,
      name: localUri.split("/").pop(),
      type: mime.getType(localUri),
    });
  }

  Object.keys(body).forEach((key) => {
    if (![null, "undefined", "null", ""].includes(body[key])) {
      data.append(key, body[key]);
    }
  });

  return data;
};

const onPressAddImage = richtext => {
  // insert URL
  richtext.insertImage(
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/100px-React-icon.svg.png",
    "background: gray;"
  );

  // insert base64
  // this.richText.current?.insertImage(`data:${image.mime};base64,${image.data}`);
};


export { createFormData, onPressAddImage};


