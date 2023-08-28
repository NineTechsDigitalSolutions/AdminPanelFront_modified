import { useState, useEffect } from "react";
import { Typography, Button, Carousel } from "antd";
import moment from "moment";

import { useParams, useHistory, Link } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";

import { publicAPI } from "../../API/index";
import Layout from "./../../Layout/LayoutMain";

const ViewBook = () => {
  const [Images, setImages] = useState([]);
  const [BookData, setBookData] = useState("");
  const { id } = useParams();
  const history = useHistory();

  useEffect(async () => {
    const res = await publicAPI.get(`/book/get-book/${id}`);
    if (res) {
      console.log(res.data);
      setBookData(res.data);
      setImages([
        ...res.data.bookImages,
        res.data.frontCover,
        res.data.backCover,
      ]);
    }
  }, [id]);
  // console.log("path", window.location.origin);

  return (
    <Layout active="books">
      <div className="View-book">
        <Button
          shape={"circle"}
          icon={<ArrowLeftOutlined />}
          onClick={() => history.go(-1)}
          style={{ marginBottom: "10px" }}
        />
        <Typography.Title level={3}>Material Images</Typography.Title>
        <Carousel autoplay>
          {Images.map((img) => (
            <div className="Carousal-div">
              <img src={img} alt="Books Images" />
            </div>
          ))}
        </Carousel>
        <div className="info-sec">
          <div className="item">
            <h4>Author :</h4>
            <p
              className="Hover"
              onClick={() => history.push(`/author/${BookData?.author?._id}`)}
            >
              {BookData?.author?.name}
            </p>
          </div>
          <div className="item">
            <h4>Book Name :</h4>
            <p> {BookData?.name} </p>
          </div>
          <div className="item">
            <h4>Publisher :</h4>
            <p> {BookData?.publisher} </p>
          </div>
          <div className="item">
            <h4>Year of Publish :</h4>
            <p> {BookData?.printYear} </p>
          </div>
          <div className="item">
            <h4>Translated By :</h4>
            <p> {BookData?.translatedBy?.name} </p>
          </div>
          <div className="item">
            <h4>Category :</h4>
            <p> {BookData?.category?.name} </p>
          </div>
          <div className="item">
            <h4>Sub Categories :</h4>
            {BookData?.subCategory?.map((lib, index) => (
              <p> {index === 0 ? lib.name : `,${lib.name}`} </p>
            ))}
          </div>
          <div className="item">
            <h4>ISBN :</h4>
            <p> {BookData?.ISBN} </p>
          </div>
          <div className="item">
            <h4>Book Add on :</h4>
            <p> {moment(BookData?.CreatedAt).format("MMM Do YYYY")} </p>
          </div>
          <div className="item">
            <h4>library :</h4>
            {BookData?.libraries?.map((lib, index) => (
              <p> {index === 0 ? lib.name : `,${lib.name}`} </p>
            ))}
          </div>
          <div className="item">
            <h4>View Frequency :</h4>
            <p> {BookData?.viewFrequency} </p>
          </div>
          <div className="item">
            <h4>View In Library :</h4>
            {BookData?.viewInLibrary ? (
              <p className="Green">Yes</p>
            ) : (
              <p className="Red">No</p>
            )}
          </div>
          <div className="item">
            <h4>Current Series :</h4>
            <p> {BookData?.series} </p>
          </div>
          <div className="link-item">
            {BookData?.physicalBookStores?.length > 0 && (
              <h4>Physical Book Stores Links :</h4>
            )}
            {BookData?.physicalBookStores?.map((link) => (
              <li>
                <a href={link.link} target="_blank">
                  {link.link}
                </a>
              </li>
            ))}
          </div>
          <div className="link-item">
            {BookData?.previousSeriesLinks?.length > 0 && (
              <h4>Previous Series Links :</h4>
            )}
            {BookData?.previousSeries &&
              BookData?.previousSeriesLinks.map((link) => (
                <li>
                  <a href={link} target="_blank">
                    {link}
                  </a>
                </li>
              ))}
          </div>
          <div className="link-item">
            {BookData?.previousSeriesBooks?.length > 0 && (
              <h4>Previous Series Books :</h4>
            )}
            {BookData?.previousSeries &&
              BookData?.previousSeriesBooks.map((book) => (
                <li>
                  <a
                    href={`${window.location.origin}/material/${book._id}`}
                    target="_blank"
                  >
                    {book.name}
                  </a>
                </li>
              ))}
          </div>
        </div>

        <div className="Desc">
          <h4>Description :</h4>
          <p> {BookData?.description} </p>
        </div>
      </div>
    </Layout>
  );
};

export default ViewBook;
