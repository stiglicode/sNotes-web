import React from "react";
// import { Editor } from "react-draft-wysiwyg";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import { convertToRaw, EditorState } from "draft-js";

const RichTextEditor = () => {
  // const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  // useEffect(() => {}, [editorState]);

  const onChange = async (state: any) => {
    // await setEditorState(state);
    // const data = convertToRaw(editorState.getCurrentContent());
  };
  return <div className={"editor-canvas"}>a{/*<Editor onEditorStateChange={onChange} />*/}</div>;
};

export default RichTextEditor;
