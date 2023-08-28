import { useEffect, useState } from "react";
import { Row, Col, Typography } from "antd";
import { FaUserTie, FaBookReader, FaCashRegister } from "react-icons/fa";
import { BsDot } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import Layout from "./../../Layout/LayoutMain";
import LineChart from "../../Components/Charts/LineChart";
import ColumnChart from "./../../Components/Charts/ColumnChart";
import DataTable from "../../Components/Table/DataTable";
import CountStatistics from "../../Components/Statistics/CountStatistics";
import { GetAllUsers, GetDailySales, GetAllHomeData } from "../../redux";

const Home = () => {
  const { Title } = Typography;
  const dispatch = useDispatch();
  const [data, setData] = useState(null);
  const [data2, setData2] = useState(null);

  const AllUsers = useSelector((state) => state.DashboardReducer.AllUsers);
  const Subscriptions = useSelector(
    (state) => state.DashboardReducer.DailySales
  );
  const HomeData = useSelector((state) => state?.DashboardReducer?.HomeData);
  const SelectedLibrary = useSelector(
    (state) => state?.AuthReducer?.Selectedlibrary
  );

  console.log("Selected library Home", SelectedLibrary);

  useEffect(() => {
    dispatch(
      GetAllUsers(
        SelectedLibrary && {
          libraries: SelectedLibrary,
        }
      )
    );
    dispatch(
      GetAllHomeData(
        SelectedLibrary && {
          libraries: SelectedLibrary,
        }
      )
    );
    dispatch(GetDailySales());
  }, [SelectedLibrary]);

  useEffect(() => {
    let tempArr = [];
    let tempArr2 = [];

    HomeData?.latestBooks?.map((item, i) => {
      tempArr.push({
        key: item._id,
        srno: i + 1,
        name: item.name,
        author: item.author?.name,
        category: item.category?.name,
      });
    });
    setData(tempArr && tempArr);

    HomeData?.latestSales?.map((item, i) => {
      tempArr2.push({
        key: item._id,
        srno: i + 1,
        date: moment(item.CreatedAt).format("MMM Do YYYY"),
        name: `${item.user?.firstName} ${item.user?.lastName}`,
        total: `$${item.amount}`,
        type: item.plan?.name,
      });
    });
    setData2(tempArr2 && tempArr2);
  }, [HomeData]);

  const columns = [
    {
      title: "Sr No",
      dataIndex: "srno",
      key: "srno",
    },
    {
      title: "Book Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "Category Name",
      dataIndex: "category",
      key: "category",
    },
  ];

  const columns2 = [
    {
      title: "Sr No",
      dataIndex: "srno",
      key: "srno",
    },
    {
      title: "Transaction Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Reader Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Total Amount",
      dataIndex: "total",
      key: "total",
    },
    {
      title: "Payment Type",
      dataIndex: "type",
      key: "type",
    },
  ];

  return (
    <Layout active="home">
      <div className="home-main">
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} lg={6}>
            <div className="stats stat-4">
              <div>
                <span>E Books</span>
                <span>23423</span>
              </div>
              <div>
                <span>Audio Books</span>
                <span>23423</span>
              </div>
              <div>
                <span>E Magazines</span>
                <span>23423</span>
              </div>
              <div>
                <span>E News Papers</span>
                <span>23423</span>
              </div>
            </div>
          </Col>
          <Col xs={24} lg={6}>
            <div className="stats stat-1">
              <CountStatistics
                title="Authors"
                value={HomeData?.authors}
                prefix={<FaUserTie />}
              />
            </div>
          </Col>
          <Col xs={24} lg={6}>
            <div className="stats stat-2">
              <CountStatistics
                title="Readers"
                value={HomeData?.users}
                prefix={<FaBookReader />}
              />
            </div>
          </Col>
          <Col xs={24} lg={6}>
            <div className="stats stat-3">
              <CountStatistics
                title="Net Income"
                value={HomeData?.netIncome}
                prefix={<FaCashRegister />}
              />
            </div>
          </Col>
        </Row>
        <div className="mt-30">
          <Row gutter={[16, 30]}>
            <Col xs={24} lg={12}>
              <div className="white-card">
                <Title level={5}>Sales Value</Title>
                <LineChart Data={Subscriptions?.sales} />
              </div>
            </Col>
            <Col xs={24} lg={12}>
              <div className="white-card">
                <Title level={5}>New Users</Title>

                <ColumnChart Data={AllUsers?.monthlyUsers} />
              </div>
            </Col>
            <Col xs={24} lg={12}>
              <div className="white-card">
                <Title level={5}>Latest Books</Title>

                <DataTable
                  data={data}
                  columns={columns}
                  width={450}
                  pagination={false}
                  Search={false}
                  loader={HomeData === null ? true : false}
                />
              </div>
            </Col>
            <Col xs={24} lg={12}>
              <div className="white-card">
                <Title level={5}>Last Transactions</Title>
                <DataTable
                  data={data2}
                  columns={columns2}
                  width={450}
                  pagination={false}
                  Search={false}
                  loader={HomeData === null ? true : false}
                />
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
