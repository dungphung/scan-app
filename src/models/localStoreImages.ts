import AsyncStorage from "@react-native-async-storage/async-storage";
import { Page } from "react-native-scanbot-sdk";

const IMAGES_KEY = "LIST_IMAGE";

class LocalStoreImages {
  static shared = new LocalStoreImages();

  constructor() {
    this.init();
  }

  async init() {
    const listImage = await AsyncStorage.getItem(IMAGES_KEY);
    if (listImage) {
      const formatListImage = JSON.parse(listImage);
      this.listImage = [...formatListImage] as [Page];
    }
  }

  refresh = () => {
    this.init();
  };

  listImage: Page[] = [];

  addImage = async (images: [Page]) => {
    if (images.length > 0) {
      images.forEach((item) => {
        this.listImage.unshift(item);
      });
      await AsyncStorage.setItem(IMAGES_KEY, JSON.stringify(this.listImage));
    }
  };

  removeImage = async (id: string) => {
    const images = this.listImage.filter((item) => item.pageId !== id);
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

  updateImage = async (image: Page) => {
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
