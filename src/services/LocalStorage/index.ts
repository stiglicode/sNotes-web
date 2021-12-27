const storageExist = (cb: (store: Storage) => void) => {
  if (typeof Storage !== "undefined") {
    const _store = window.localStorage || localStorage;

    return cb(_store);
  } else {
    throw Error("Sorry, your browser does not support Web Storage...");
  }
};

export default storageExist;
