import { useEffect } from "react";
import { Typography, Row, Col, Statistic } from "antd";
import { FaUserAltSlash, FaUsers } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

import Layout from "./../../Layout/LayoutMain";
import DonutChart from "./../../Components/Charts/DonutChart";
import UsersChart from "./../../Components/Charts/UsersChart";
import CountStatistics from "./../../Components/Statistics/CountStatistics";
import LineChart from "./../../Components/Charts/LineChart";
import ColumnChart from "./../../Components/Charts/ColumnChart";
import {
  GetAllStatistics,
  GetAllUsers,
  GetMonthlyAuthors,
  GetMonthlyOrders,
  GetDailyProducts,
  GetDailySales,
} from "../../redux";

const Statics = () => {
  const dispatch = useDispatch();
  const AllStatistics = useSelector(
    (state) => state.DashboardReducer.AllStatistics
  );
  const AllUsers = useSelector((state) => state.DashboardReducer.AllUsers);
  const MonthlyAuthors = useSelector(
    (state) => state.DashboardReducer.MonthlyAuthors
  );
  const MonthlyOrders = useSelector(
    (state) => state.DashboardReducer.MonthlyOrders
  );
  const Subscriptions = useSelector(
    (state) => state.DashboardReducer.DailySales
  );
  const DailyProducts = useSelector(
    (state) => state.DashboardReducer.DailyProducts
  );
  const SelectedLibrary = useSelector(
    (state) => state.AuthReducer.Selectedlibrary
  );
  console.log(AllUsers);

  useEffect(() => {
    dispatch(
      GetAllStatistics(
        SelectedLibrary && {
          libraries: SelectedLibrary,
        }
      )
    );
    dispatch(
      GetAllUsers(
        SelectedLibrary && {
          libraries: SelectedLibrary,
        }
      )
    );
    dispatch(
      GetMonthlyAuthors(
        SelectedLibrary && {
          libraries: SelectedLibrary,
        }
      )
    );
    dispatch(GetMonthlyOrders());
    dispatch(GetDailyProducts());
    dispatch(GetDailySales());
  }, [SelectedLibrary]);

  return (
    <Layout active="statics">
      <div className="white-card">
        <Typography.Title level={2}>Statistics</Typography.Title>
        <Row gutter={[30, 30]} align="middle">
          <Col xs={24} md={15}>
            <DonutChart Data={AllStatistics?.highestReadingBooks} />
          </Col>
          <Col xs={24} md={9}>
            <Row gutter={[30, 30]}>
              <Col span={24}>
                <div className="stats stat-3">
                  <CountStatistics
                    title="Active Users"
                    value={AllStatistics?.activeUsers}
                    prefix={<FaUsers />}
                  />
                </div>
              </Col>
              <Col span={24}>
                <div className="stats stat-2">
                  <CountStatistics
                    title="Inactive Users"
                    value={AllStatistics?.inactiveUsers}
                    prefix={<FaUserAltSlash />}
                  />
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row gutter={[30, 30]}>
          <Col xs={24} lg={12}>
            <div className="mt-30 white-card">
              <Typography.Title level={5}>New Users</Typography.Title>
              <ColumnChart Data={AllUsers?.monthlyUsers} />
            </div>
          </Col>

          <Col xs={24} lg={12}>
            <div className="mt-30 white-card">
              <Typography.Title level={5}>Authors</Typography.Title>
              <ColumnChart Data={MonthlyAuthors?.monthlyAuthors} />
            </div>
          </Col>
          <Col xs={24}>
            <div className="mt-30 white-card">
              <Typography.Title level={5}>Orders</Typography.Title>
              <ColumnChart Data={MonthlyOrders?.monthlyOrders} />
            </div>
          </Col>
          <Col xs={24} lg={12}>
            <div className="mt-30 white-card">
              <Typography.Title level={5}>Subscriptions</Typography.Title>
              <LineChart Data={Subscriptions?.sales} />
            </div>
          </Col>
          <Col xs={24} lg={12}>
            <div className="mt-30 white-card">
              <Typography.Title level={5}>Products</Typography.Title>
              <LineChart Data={DailyProducts?.sales} />
            </div>
          </Col>
        </Row>
      </div>
    </Layout>
  );
};

export default Statics;
