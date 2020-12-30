import { LocalStoreImages } from "../localStoreImages";

it("should return empty array", async () => {
  const result = LocalStoreImages.shared.getListImage();

  expect(result).toEqual([]);
});

it("should return array with 1 elements", async () => {
  const fakeImage = {
    pageId: 1,
    url: "12",
  };

  await LocalStoreImages.shared.addImage([fakeImage]);

  const result = LocalStoreImages.shared.getListImage();

  expect(result.length).toEqual(1);
});

it("should remove element in array", async () => {
  const fakeImage = {
    pageId: 2,
    url: "12",
  };

  await LocalStoreImages.shared.addImage([fakeImage]);

  await LocalStoreImages.shared.removeImage(fakeImage.pageId);

  const result = LocalStoreImages.shared.getListImage();

  expect(result.length).toEqual(1);
});
