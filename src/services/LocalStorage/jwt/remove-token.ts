import storageExist from "../index";

const RemoveToken = (): any => {
  return storageExist((store) => {
    return store.removeItem("snote-token");
  });
};

export default RemoveToken;
