import { useState, useEffect } from "react";
import {
  Button,
  Col,
  Form,
  Input,
  Select,
  Checkbox,
  Radio,
  InputNumber,
  Upload,
  Space,
  Divider,
  DatePicker,
  notification,
} from "antd";
import {
  ArrowLeftOutlined,
  PlusOutlined,
  LoadingOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";

import { useHistory, useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import ImgCrop from "antd-img-crop";
import {
  createBook,
  getLibrarians,
  UpdateBook,
  GetAllAuthors,
  GetSubCategoriesByID,
  UploadImage,
  UploadFile,
  //GetCategoriesByMaterial,
  GetCategoriesByID,
  GetAllBooks,
} from "../../redux";
import Layout from "./../../Layout/LayoutMain";
import moment from "moment";

const AddNewBook = () => {
  let RandomNumber = Math.floor(Math.random() * 1000);
  const [form] = Form.useForm();
  const { Option } = Select;
  const history = useHistory();
  const dispatch = useDispatch();
  const { state } = useLocation();

  const [Loading, setLoading] = useState(false);
  const [UploadLoading, setUploadLoading] = useState(null);

  const [isSeries, setISeries] = useState(false);
  const [series, setSeries] = useState(0);

  const [fileList1, setFileList1] = useState([]);
  const [BackCover, setBackCover] = useState([]);
  const [FrontCover, setFrontCover] = useState([]);
  const [BookPdf, setBookPdf] = useState([]);
  const [BookEPUB, setBookEPUB] = useState([]);
  const [AudioBookMale, setAudioBookMale] = useState([]);
  const [AudioBookFemale, setAudioBookFemale] = useState([]);

  const BookType = sessionStorage.getItem("bookType");
  const MaterialId = sessionStorage.getItem("MaterialId");

  const [AuthorSelect, setAuthorSelect] = useState("");
  const [DateSelect, setDateSelect] = useState("");
  const [CategorySelect, setCategorySelect] = useState("");

  console.log("StateNavod",state);

  const CategoryOption = useSelector(
    //(state) => state.CategoryReducer.AllCategoriesByMaterial
    (state) => state.CategoryReducer.ALLCategoriesById
  );

  const SUbCategoryOption = useSelector(
    (state) => state.CategoryReducer.ALLSubCategoriesById
  );
  console.log("MiNCate",SUbCategoryOption)
  const AuthorOption = useSelector((state) => state.AuthorReducer.AllAuthors);

  const LibrarianOption = useSelector(
    (state) => state.LibrarianReducer.Librarian
  );
  const SelectedLibrary = useSelector(
    (state) => state.AuthReducer.Selectedlibrary
  );
  const AllBooks = useSelector((state) => state.BooksReducer.AllBooks);

  useEffect(() => {
    dispatch(getLibrarians());
    dispatch(GetAllAuthors());
    dispatch(GetCategoriesByID());
    //dispatch(GetCategoriesByMaterial(MaterialId));
    dispatch(
      GetAllBooks(
        SelectedLibrary && {
          libraries: SelectedLibrary,
        }
      )
    );
    state?.previousSeries && setISeries(true);
    state?.previousSeriesLinks && setSeries(state?.previousSeriesLinks.length);
    let arr = [];
    state?.bookImages?.map((link) => {
      arr.push({
        url: link,
      });
    });
    state?.bookImages && setFileList1(arr);

    state?.backCover && setBackCover([{ url: state?.backCover }]);

    state?.frontCover && setFrontCover([{ url: state?.frontCover }]);

    state?.bookUrl && setBookPdf([{ url: state?.bookUrl }]);

    state?.epubBook && setBookEPUB([{ url: state?.epubBook }]);

    state?.bookMp3UrlFemale && setAudioBookFemale([state?.bookMp3UrlFemale]);

    state?.bookMp3UrlMale && setAudioBookMale([state?.bookMp3UrlMale]);
  }, []);

  const AllLibrarians = LibrarianOption?.map((data) => data._id);

  const onFinish = async (values) => {
    setLoading(true);
    let previousSeriesLinks = [];
    let date = new Date(values.printYear._d).getFullYear();
    const OBject = Object.entries(values);
    OBject.filter(([key, value]) => {
      key.slice(0, 9) === "BookLinks" && previousSeriesLinks.push(value);
    });
    let previousSeriesBooks = [];
    OBject.filter(([key, value]) => {
      key.slice(0, 10) === "BookSelect" && previousSeriesBooks.push(value);
    });

    const payload = {
      ...values,
      printYear: String(date),
      subCategory: JSON.stringify(values.subCategory ? values.subCategory : []),
      previousSeries: isSeries,
      previousSeriesLinks: JSON.stringify(previousSeriesLinks),
      previousSeriesBooks: JSON.stringify(previousSeriesBooks),
      libraries:
        values.libraries === "All"
          ? JSON.stringify(AllLibrarians)
          : JSON.stringify([values.libraries]),
      frontCover: FrontCover?.length > 0 ? FrontCover?.[0]?.url : "",
      backCover: BackCover?.length > 0 ? BackCover?.[0]?.url : "",
      bookImages: fileList1?.map((data) => data?.url),
      bookUrl: BookPdf?.length > 0 ? BookPdf?.[0]?.url : "",
      epubBook: BookEPUB?.length > 0 ? BookEPUB?.[0]?.url : "",
      bookMp3UrlMale: AudioBookMale?.length > 0 ? AudioBookMale?.[0] : "",
      bookMp3UrlFemale: AudioBookFemale?.length > 0 ? AudioBookFemale?.[0] : "",
      id: state ? state?._id : "",
    };
    //console.log("payload frontcover : ", payload.frontCover);
    console.log("values", values);

    state
      ? await dispatch(UpdateBook(payload, history))
      : await dispatch(createBook(payload, history));
    setLoading(false);
    form.resetFields();
  };

  const onSeriesChange = (e) => {
    console.log("radio checked", e.target.value);
    if (e.target.value === "yes") {
      setISeries(true);
    } else {
      setISeries(false);
    }
  };

  const onCategoryChnage = (id, key) => {
    dispatch(GetSubCategoriesByID(id));
    setCategorySelect(key.key);
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  const LoadingButton = (
    <div>
      <LoadingOutlined />
      <div style={{ marginTop: 8 }}>Loading...</div>
    </div>
  );

  // console.log("AllBooks", AllBooks);

  const onPhysicalBookAdd = (values) => {
    console.log("Received values of form:", values);
  };

  return (
    <Layout active="books">
      <div className="add-new-main">
        <div className="header">
          <Button
            shape={"circle"}
            icon={<ArrowLeftOutlined />}
            onClick={() => history.go(-1)}
          />
          <h2>{state ? "Update Material" : `Add New ${BookType}`}</h2>
        </div>
        <div className="add-form-cont">
          <div className="add-new-form white-card">
            <Form
              //   {...layout}
              form={form}
              name="control-hooks"
              onFinish={onFinish}
              layout="vertical"
              scrollToFirstError={true}
            >
              <Form.Item
                name="name"
                label="Name"
                // validateStatus={"success"}
                // hasFeedback
                rules={[{ required: true, message: "Book Name Is Required" }]}
                requiredMark={"optional"}
                initialValue={state?.name}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="author"
                label="Written By "
                rules={[{ required: true, message: "Written By Is Required" }]}
                requiredMark={"optional"}
                initialValue={state?.author._id}
              >
                <Select
                  allowClear
                  placeholder="select Author"
                  onChange={(e, key) => setAuthorSelect(key.key)}
                >
                  {AuthorOption?.map((data) => (
                    <Option value={data._id} key={data.name}>
                      {" "}
                      {data.name}{" "}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                name="translatedBy"
                label="Translated By"
                // rules={[
                //   { required: true, message: "Translated By Is Required" },
                // ]}
                // requiredMark={"optional"}
                initialValue={state?.translatedBy}
              >
                <Select allowClear placeholder="select Author">
                  {AuthorOption?.map((data) => (
                    <Option value={data._id}>{data.name}</Option>
                  ))}
                </Select>
              </Form.Item>

              {/* <Form.Item
                name="translatedBy"
                label="Translated By"
                rules={[
                  { required: true, message: "Translated By Is Required" },
                ]}
                requiredMark={"optional"}
                initialValue={state?.translatedBy}
              >
                <Input />
              </Form.Item> */}
              <Form.Item
                name="publisher"
                label="Publisher"
                rules={[
                  { required: true, message: "Publisher Name Is Required" },
                ]}
                requiredMark={"optional"}
                initialValue={state?.publisher}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="printYear"
                label="Year Of Printed"
                rules={[
                  { required: true, message: "Printed In Year Is Required" },
                ]}
                requiredMark={"optional"}
                initialValue={state && moment(state?.printYear)}
              >
                <DatePicker
                  defaultValue={state && moment(state?.printYear)}
                  style={{ width: "100%" }}
                  picker="year"
                  onChange={(date, dateString) => {
                    setDateSelect(dateString);
                    console.log("dateString", dateString);
                  }}
                />
              </Form.Item>
              <Form.Item
                name="ISBN"
                label="ISBN"
                rules={[{ required: true, message: "ISBN Is Required" }]}
                requiredMark={"optional"}
                initialValue={state?.ISBN}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="description"
                label="Description"
                rules={[{ required: true, message: "Description Is Required" }]}
                requiredMark={"optional"}
                initialValue={state?.description}
              >
                <Input.TextArea
                  placeholder="book description"
                  rows={4}
                  style={{ resize: "none" }}
                />
              </Form.Item>
              <Form.Item
                name="libraries"
                label="Select Library"
                rules={[{ required: true, message: "Library Is Required" }]}
                requiredMark={"optional"}
                initialValue={
                  state
                    ? LibrarianOption?.length === state?.libraries.length
                      ? "All"
                      : state?.libraries.map((data) => data._id)
                    : SelectedLibrary[0]
                }
              >
                <Select mode="tags" allowClear placeholder="select library">
                  {LibrarianOption?.map((data) => (
                    <Option value={data._id}> {data.name} </Option>
                  ))}
                  <Option value="All">All</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="category"
                label="Category"
                rules={[{ required: true, message: "Category Is Required" }]}
                requiredMark={"optional"}
                //initialValue={state?.category._id}
                //   rules={[{ required: true ,message: "Email Is Required" }]}
              >
                <Select
                  allowClear
                  placeholder="select category"
                  onChange={(e, key) => onCategoryChnage(e, key)}
                  // onChange={(value) =>{
                  //   console.log("ggggg",value)
                  //   onCategoryChnage(value)
                  // }} 
                >
                  {CategoryOption?.map((data) => (
                    <Option value={data.material} key={data.name}>
                      {" "}
                      {data.name}{" "}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                name="subCategory"
                label="Sub Category"
                // rules={[
                //   { required: true, message: "Sub-Category Is Required" },
                // ]}
                // requiredMark={"optional"}
                initialValue={state?.subCategory.map((data) => data._id)}
                //   rules={[{ required: true ,message: "Email Is Required" }]}
              >
                <Select
                  mode="tags"
                  allowClear
                  placeholder="select sub category"
                >
                  {SUbCategoryOption?.map((data) => (
                    <Option value={data._id}>{data.name}</Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                name="previousSeries"
                label="Previous Series"
                rules={[
                  { required: true, message: "Previous Series Is Required" },
                ]}
                requiredMark={"optional"}
                initialValue={state?.previousSeries ? "yes" : "no"}

                //   rules={[{ required: true ,message: "Email Is Required" }]}
              >
                <Radio.Group onChange={onSeriesChange}>
                  <Radio value={"no"}>No</Radio>
                  <Radio value={"yes"}>Yes</Radio>
                </Radio.Group>
              </Form.Item>
              {isSeries ? (
                <>
                  <Form.Item
                    name="series"
                    label="Current Series"
                    rules={[{ required: true, message: "Series Is Required" }]}
                    requiredMark={"optional"}
                    initialValue={state?.series}
                  >
                    <Input type="number" />
                  </Form.Item>
                  <Form.Item
                    name="numberOfBooks"
                    label="Previous Number Of Books In Series"
                    rules={[
                      {
                        required: true,
                        message: "Previous No of Books Is Required",
                      },
                    ]}
                    requiredMark={"optional"}
                    initialValue={state?.previousSeriesLinks.length}
                    //   rules={[{ required: true }]}
                  >
                    <InputNumber
                      value={series}
                      min={0}
                      onChange={(e) => setSeries(e)}
                    />
                  </Form.Item>
                  <div className="PreviousClass">
                    {new Array(series).fill(0).map((element, ind) => (
                      <Form.Item
                        name={`BookLinks${ind + 1}`}
                        label={`Book link for series ${ind + 1}`}
                        // rules={[
                        //   { required: true, message: "Series Is Required" },
                        // ]}
                        initialValue={state?.previousSeriesLinks[ind]}
                        style={{ width: "45%" }}
                      >
                        <Input placeholder="Insert Book Link" />
                      </Form.Item>
                    ))}
                    {new Array(series).fill(0).map((element, ind) => (
                      <Form.Item
                        name={`BookSelect${ind + 1}`}
                        label=" "
                        // rules={[
                        //   { required: true, message: "Series Is Required" },
                        // ]}
                        initialValue={state?.previousSeriesBooks[ind]}
                        style={{ width: "45%" }}
                      >
                        <Select allowClear placeholder="select Books">
                          {AllBooks?.map((data) => (
                            <Option value={data._id}> {data.name} </Option>
                          ))}
                        </Select>
                      </Form.Item>
                    ))}
                  </div>
                </>
              ) : (
                ""
              )}

              {
                <Form.Item label="Physical Book Stores">
                  <Form.List
                    name="physicalBookStores"
                    initialValue={state?.physicalBookStores}
                  >
                    {(fields, { add, remove }) => (
                      <>
                        {fields.map(({ key, name, ...restField }, ind) => (
                          <Space
                            key={key}
                            style={{
                              display: "flex",
                              marginBottom: 8,
                              width: "100%",
                            }}
                            align="baseline"
                            className="BookForm"
                          >
                            <Form.Item {...restField} name={[ind, "link"]}>
                              <Input
                                placeholder="Physical Book Link"
                                style={{ width: "100%" }}
                              />
                            </Form.Item>
                            <MinusCircleOutlined onClick={() => remove(name)} />
                          </Space>
                        ))}
                        <Form.Item>
                          <Button
                            type="dashed"
                            onClick={() => add()}
                            block
                            icon={<PlusOutlined />}
                          >
                            Add Physical Book Stores Link
                          </Button>
                        </Form.Item>
                      </>
                    )}
                  </Form.List>
                </Form.Item>
              }
              

              <Form.Item
                name="images3"
                label="Add Front Cover"
              >
                <div>
                  <ImgCrop
                    aspect={1 / 1.48}
                    onModalOk={async (obj) => {
                      try {
                        obj.status = "success";
                        if (obj.status !== "removed") {
                          setUploadLoading("front");
                          let payload = new FormData();
                          payload.append("pictures", obj);
                    
                          const response = await dispatch(UploadImage(payload));

                          if (response && response.awsUrl) {
                            setUploadLoading(null);
                            setFrontCover([
                              {
                                url: response.awsUrl,
                              },
                            ]);
                          } else {
                            console.error("Invalid response from UploadImage:", response);
                            // Handle the case where the response does not contain a valid URL
                          }
                        }
                      } catch (error) {
                        console.error("Error while uploading front cover:", error);
                        // Handle the error, e.g., show an error message to the user
                      }
                    }}
                    
                  >
                    <Upload
                      listType="picture-card"
                      fileList={FrontCover}
                      disabled={UploadLoading ? true : false}
                      onChange={(obj) => {
                        console.log("frontCover");
                      }}
                      accept="image/*"
                      multiple={false}
                      maxCount={1}
                      onRemove={(file, fileList) => {
                        setFrontCover([]);
                      }}
                      customRequest={() => {}}
                    >
                      {FrontCover.length >= 1
                        ? null
                        : UploadLoading === "front"
                        ? LoadingButton
                        : uploadButton}
                    </Upload>
                  </ImgCrop>
                </div>
              </Form.Item>




              <Form.Item
                name="images"
                label="Add Images Of First Five Pages Of Books"
              >
                

                  <div>
                  <ImgCrop
                    aspect={1 / 1.48}
                    onModalOk={async (obj) => {
                      try {
                        obj.status = "success";
                        if (obj.status !== "removed") {
                          setUploadLoading("five");
                          let payload = new FormData();
                          payload.append("pictures", obj);
                    
                          const response = await dispatch(UploadImage(payload));

                          if (response && response.awsUrl) {
                            setUploadLoading(null);
                            setFileList1([
                              ...fileList1,
                              {
                                url: response.awsUrl,
                              },
                            ]);
                          } else {
                            console.error("Invalid response from UploadImage:", response);
                            // Handle the case where the response does not contain a valid URL
                          }
                        }
                      } catch (error) {
                        console.error("Error while uploading front cover:", error);
                        // Handle the error, e.g., show an error message to the user
                      }
                    }}
                    
                  >

                  


                    <Upload
                      listType="picture-card"
                      fileList={fileList1}
                      disabled={UploadLoading ? true : false}
                      onChange={async (obj) => {
                        console.log("fileList1 obj");
                      }}
                      accept="image/*"
                      multiple={false}
                      maxCount={5}
                      onRemove={(file, fileList) => {
                        const index = fileList1?.findIndex((obj) => {
                          return file.url === obj.url;
                        });
                        fileList1?.splice(index, 1);
                        setFileList1([...fileList1]);
                      }}
                      customRequest={() => {}}
                    >
                      {fileList1.length >= 5
                        ? null
                        : UploadLoading === "five"
                        ? LoadingButton
                        : uploadButton}
                    </Upload>
                  </ImgCrop>
                </div>
              </Form.Item>
              <Form.Item
                name="images2"
                label="Add Back Cover of Book"
                // rules={[{ required: true }]}
              >


                  <div>
                  <ImgCrop
                    aspect={1 / 1.48}
                    onModalOk={async (obj) => {
                      try {
                        obj.status = "success";
                        if (obj.status !== "removed") {
                          setUploadLoading("back");
                          let payload = new FormData();
                          payload.append("pictures", obj);
                    
                          const response = await dispatch(UploadImage(payload));
                    
                          if (response && response.awsUrl) {
                            setUploadLoading(null);
                            setBackCover([
                              {
                                url: response.awsUrl,
                              },
                            ]);
                          } else {
                            console.error("Invalid response from UploadImage:", response);
                            // Handle the case where the response does not contain a valid URL
                          }
                        }
                      } catch (error) {
                        console.error("Error while uploading front cover:", error);
                        // Handle the error, e.g., show an error message to the user
                      }
                    }}
                    
                  >
                  
                    <Upload
                      listType="picture-card"
                      fileList={BackCover}
                      disabled={UploadLoading ? true : false}
                      onChange={(obj) => {
                        console.log("back");
                      }}
                      accept="image/*"
                      multiple={false}
                      maxCount={1}
                      onRemove={(file, fileList) => {
                        setBackCover([]);
                      }}
                      customRequest={() => {}}
                    >
                      {BackCover.length >= 1
                        ? null
                        : UploadLoading === "back"
                        ? LoadingButton
                        : uploadButton}
                    </Upload>
                  </ImgCrop>
                </div>
              </Form.Item>

              <Form.Item
                label="Upload Book(PDF) Format"
                // rules={[{ required: true }]}
              >
                 <div>
                  <Upload
                    listType="picture-card"
                    fileList={BookPdf}
                    disabled={UploadLoading ? true : false}
                    onChange={async (obj) => {
                      console.log(obj);
                      if (obj.file.status !== "removed") {
                        setUploadLoading("book");
                        let payload = new FormData();
                        payload.append("pictures", obj?.file?.originFileObj);
                        payload.append(
                          "locationUrl",
                          BookType === "E-Magazine"
                            ? `Library_Materials/${BookType}/${
                                DateSelect !== ""
                                  ? DateSelect
                                  : `${new Date().getFullYear()}`
                              }/MG${RandomNumber}_${
                                CategorySelect !== ""
                                  ? CategorySelect
                                  : "category"
                              }_${obj?.file?.name}`
                            : BookType === "E-Newspaper"
                            ? `Library_Materials/${BookType}/${
                                DateSelect !== ""
                                  ? DateSelect
                                  : `${new Date().getFullYear()}`
                              }/EN${RandomNumber}_${
                                CategorySelect !== ""
                                  ? CategorySelect
                                  : "category"
                              }_${obj?.file?.name}`
                            : BookType === "Audio Book"
                            ? `Library_Materials/${BookType}/${
                                DateSelect !== ""
                                  ? DateSelect
                                  : `${new Date().getFullYear()}`
                              }/AD${RandomNumber}_${
                                CategorySelect !== ""
                                  ? CategorySelect
                                  : "category"
                              }_${obj?.file?.name}`
                            : `Library_Materials/${BookType}/${
                                AuthorSelect !== "" ? AuthorSelect : "author"
                              }/EN${
                                CategorySelect !== ""
                                  ? CategorySelect
                                  : "category"
                              }_${obj?.file?.name}`
                        );
                        const url =
                          CategorySelect !== "" &&
                          DateSelect !== "" &&
                          AuthorSelect !== ""
                            ? await dispatch(UploadFile(payload))
                            : notification.error({
                                message: "Form Fill",
                                description:
                                  "Fill All fields before Upload Book",
                                duration: 5,
                              });

                        setUploadLoading(null);
                        url &&
                          setBookPdf([
                            {
                              url: url.awsUrl,
                            },
                          ]);
                      }
                    }}
                    accept=".pdf"
                    multiple={false}
                    maxCount={1}
                    onRemove={(file, fileList) => {
                      setBookPdf([]);
                    }}
                    customRequest={() => {}}
                  >
                    {BookPdf.length >= 1
                      ? null
                      : UploadLoading === "book"
                      ? LoadingButton
                      : uploadButton}
                  </Upload>
                </div>


              </Form.Item>

              <Form.Item label="Upload Book(EPUB) Format">
                <div>
                  <Upload
                    listType="picture-card"
                    fileList={BookEPUB}
                    disabled={UploadLoading ? true : false}
                    onChange={async (obj) => {
                      console.log(obj);
                      if (obj.file.status !== "removed") {
                        setUploadLoading("book");
                        let payload = new FormData();
                        payload.append("pictures", obj?.file?.originFileObj);
                        payload.append(
                          "locationUrl",
                          BookType === "E-Magazine"
                            ? `Library_Materials/${BookType}/${
                                DateSelect !== ""
                                  ? DateSelect
                                  : `${new Date().getFullYear()}`
                              }/MG${RandomNumber}_${
                                CategorySelect !== ""
                                  ? CategorySelect
                                  : "category"
                              }_${obj?.file?.name}`
                            : BookType === "E-Newspaper"
                            ? `Library_Materials/${BookType}/${
                                DateSelect !== ""
                                  ? DateSelect
                                  : `${new Date().getFullYear()}`
                              }/EN${RandomNumber}_${
                                CategorySelect !== ""
                                  ? CategorySelect
                                  : "category"
                              }_${obj?.file?.name}`
                            : BookType === "Audio Book"
                            ? `Library_Materials/${BookType}/${
                                DateSelect !== ""
                                  ? DateSelect
                                  : `${new Date().getFullYear()}`
                              }/AD${RandomNumber}_${
                                CategorySelect !== ""
                                  ? CategorySelect
                                  : "category"
                              }_${obj?.file?.name}`
                            : `Library_Materials/${BookType}/${
                                AuthorSelect !== "" ? AuthorSelect : "author"
                              }/EN${
                                CategorySelect !== ""
                                  ? CategorySelect
                                  : "category"
                              }_${obj?.file?.name}`
                        );
                        const url =
                          CategorySelect !== "" &&
                          DateSelect !== "" &&
                          AuthorSelect !== ""
                            ? await dispatch(UploadFile(payload))
                            : notification.error({
                                message: "Form Fill",
                                description:
                                  "Fill All fields before Upload Book",
                                duration: 5,
                              });
                        setUploadLoading(null);
                        url &&
                          setBookEPUB([
                            {
                              url: url.awsUrl,
                            },
                          ]);
                      }
                    }}
                    accept=".epub"
                    multiple={false}
                    maxCount={1}
                    onRemove={(file, fileList) => {
                      setBookEPUB([]);
                    }}
                    customRequest={() => {}}
                  >
                    {BookEPUB.length >= 1
                      ? null
                      : UploadLoading === "book"
                      ? LoadingButton
                      : uploadButton}
                  </Upload>
                </div>
              </Form.Item>

              <Form.Item
                name="audioBookMalee"
                label="Upload Audio Book Male Voice"

                //   rules={[{ required: true }]}
              >
                {AudioBookMale.length < 1 ? (
                  <div>
                    <Upload
                      listType="picture-card"
                      disabled={UploadLoading ? true : false}
                      fileList={AudioBookMale}
                      onChange={async (obj) => {
                        setUploadLoading("male");
                        let payload = new FormData();
                        payload.append("pictures", obj?.file?.originFileObj);
                        const url = await dispatch(UploadFile(payload));
                        console.log("url", url);
                        setUploadLoading(null);
                        setAudioBookMale([url.awsUrl]);
                      }}
                      accept="audio/*"
                      multiple={false}
                      maxCount={1}
                    >
                      {AudioBookMale.length > 1
                        ? null
                        : UploadLoading === "male"
                        ? LoadingButton
                        : uploadButton}
                    </Upload>
                  </div>
                ) : (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <audio controls>
                      <source src={AudioBookMale?.[0]} type="audio/mpeg" />
                      <source src={AudioBookMale?.[0]} type="audio/ogg" />
                    </audio>
                    <Button
                      type="primary"
                      shape="round"
                      style={{ marginLeft: "1rem" }}
                      onClick={() => {
                        setAudioBookMale([]);
                      }}
                    >
                      Remove
                    </Button>
                  </div>
                )}
              </Form.Item>
              <Form.Item
                name="audioBookFemalee"
                label="Upload Audio Book Female Voice"

                //   rules={[{ required: true }]}
              >
                {AudioBookFemale.length < 1 ? (
                  <div>
                    <Upload
                      listType="picture-card"
                      disabled={UploadLoading ? true : false}
                      fileList={AudioBookFemale}
                      onChange={async (obj) => {
                        setUploadLoading("female");
                        let payload = new FormData();
                        payload.append("pictures", obj?.file?.originFileObj);
                        const url = await dispatch(UploadFile(payload));
                        setUploadLoading(null);
                        console.log("url", url);
                        setAudioBookFemale([url.awsUrl]);
                      }}
                      multiple={false}
                      maxCount={1}
                      accept="audio/*"
                    >
                      {AudioBookFemale.length > 1
                        ? null
                        : UploadLoading === "female"
                        ? LoadingButton
                        : uploadButton}
                    </Upload>
                  </div>
                ) : (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <audio controls>
                      <source src={AudioBookFemale?.[0]} type="audio/mpeg" />
                      <source src={AudioBookFemale?.[0]} type="audio/ogg" />
                    </audio>
                    <Button
                      type="primary"
                      shape="round"
                      style={{ marginLeft: "1rem" }}
                      onClick={() => {
                        setAudioBookFemale([]);
                      }}
                    >
                      Remove
                    </Button>
                  </div>
                )}
              </Form.Item>

              <Form.Item>
                <Button loading={Loading} type="primary" htmlType="submit">
                  {state ? "Update" : "Add"}
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AddNewBook;
