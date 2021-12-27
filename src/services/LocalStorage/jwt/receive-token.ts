import storageExist from "../index";

const ReceiveToken = (): any => {
  return storageExist((store) => {
    return store.getItem("snote-token");
  });
};

export default ReceiveToken;
