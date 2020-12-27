import AsyncStorage from "@react-native-async-storage/async-storage";

const IMAGES_KEY = "LIST_IMAGE";

interface ImageLocalType {
  id: String;
  url: String;
}

class LocalStoreImages {
  constructor() {
    this.init();
  }

  async init() {
    const listImage = await AsyncStorage.getItem(IMAGES_KEY);
    if (listImage) {
      const formatListImage = JSON.parse(listImage);
      this.listImage = [...formatListImage] as [ImageLocalType];
    }
  }

  refresh = () => {
    this.init();
  };

  listImage: [ImageLocalType] = [];

  addImage = async (images: [ImageLocalType]) => {
    if (images.length > 0) {
      images.forEach((item) => {
        this.listImage.unshift(item);
      });
      await AsyncStorage.setItem(IMAGES_KEY, JSON.stringify(this.listImage));
    }
  };

  removeImage = async (id) => {
    const images = this.listImage.filter((item) => item.id !== id);
    this.listImage = [...images];
    await AsyncStorage.setItem(IMAGES_KEY, JSON.stringify(this.listImage));
  };

  getListImage = () => {
    return this.listImage;
  };

  getImage = (pageId) => {
    const image = this.listImage.find((item) => item.pageId === pageId);

    return image;
  };

  updateImage = async (image) => {
    this.listImage = this.listImage.map((item) => {
      if (item.pageId === image.pageId) {
        return image;
      }
      return item;
    });

    await AsyncStorage.setItem(IMAGES_KEY, JSON.stringify(this.listImage));
  };
}

export default {
  LocalStoreImages,
};

export { LocalStoreImages };
