import { useEffect, useRef, useState } from "react";
import { Radio, Button, Typography } from "antd";

import { useDispatch, useSelector } from "react-redux";
// import CKEditor from "ckeditor4-react";
import { CKEditor } from 'ckeditor4-react';

// import ReactHtmlParser from "react-html-parser";

import { GetGeneralSetting, createSettingContent } from "../../redux";
import LayoutMain from "./../../Layout/LayoutMain";

const GeneralSettings = () => {
  const [type, setType] = useState("Aboutus");
  const [content, setContent] = useState(null);
  const [EditorData, setEditorData] = useState("");
  const [Loading, setLoading] = useState(false);
  const generalContent = useSelector(
    (state) => state?.SettingReducer.generalSetting
  );
  const [terms, setTerms] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetGeneralSetting());
  }, []);

  console.log("EditorData", EditorData);
  console.log("generalContent", generalContent);

  useEffect(() => {
    generalContent?.map((item) => {
      if (item.name === type) {
        // return item.name;
        setEditorData(item.content);
      }
    });
  }, [generalContent, type]);

  const onEditorChange = (evt) => {
    const data = evt.editor.getData();
    setEditorData(data);
  };

  const handleTabChange = (e) => {
    setType(e.target.value);
  };

  const handleUpdateContent = async () => {
    setLoading(true);
    const payload = {
      name: type,
      content: EditorData,
    };
    console.log(payload);
    await dispatch(createSettingContent(payload));
    setLoading(false);
    // dispatch(updateContent(payload));
  };
  return (
    <LayoutMain active="g-settings">
      <div className="white-card general-settings">
        <Typography.Title level={2}>General Settings</Typography.Title>
        <div className="radio-buttons">
          <Radio.Group
            defaultValue="Aboutus"
            buttonStyle="solid"
            onChange={handleTabChange}
            className="editor-radio-button"
          >
            <Radio.Button value="Aboutus">About Us</Radio.Button>
            <Radio.Button value="Contactus">Contact Us</Radio.Button>
            <Radio.Button value="TermsAndCondition">
              Terms And Conditions
            </Radio.Button>
            <Radio.Button value="PrivacyPolicy">Privacy Policy</Radio.Button>
          </Radio.Group>
        </div>
        <CKEditor
          data={EditorData && EditorData}
          type="classic"
          onChange={onEditorChange}
        />
        <Button
          type={"primary"}
          style={{ display: "flex", marginLeft: "auto", marginTop: "10px" }}
          onClick={handleUpdateContent}
          loading={Loading}
        >
          Update
        </Button>
      </div>
    </LayoutMain>
  );
};

export default GeneralSettings;
