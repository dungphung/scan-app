import AsyncStorage from "@react-native-async-storage/async-storage";

const IMAGES_KEY = "LIST_IMAGE";

interface ImageLocalType {
  id: String;
  url: String;
}

class LocalStoreImages {
  constructor() {}

  async init() {
    const listImage = await AsyncStorage.getItem(IMAGES_KEY);
    if (listImage) {
      const formatListImage = JSON.parse(listImage);
      this.listImage = [...formatListImage] as [ImageLocalType];
    }
  }

  listImage: [ImageLocalType] = [];

  addImage = async (images: [ImageLocalType]) => {
    if (images.length > 0) {
      images.forEach((item) => {
        this.listImage.push(item);
      });
      await AsyncStorage.setItem(IMAGES_KEY, JSON.stringify(this.listImage));
    }
  };

  removeImag = async () => {};

  getListImage = async () => {
    if (!this.listImage.length) {
      await this.init();
    }
    return this.listImage;
  };
}

export default {
  LocalStoreImages,
};

export { LocalStoreImages };
