import storageExist from "../index";

const SaveToken = (value: any): void => {
  return storageExist((store) => {
    store.setItem("snote-token", value);
  });
};

export default SaveToken;
