import { Statistic, Row, Col } from "antd";

const CountStatistics = ({ title, value, prefix }) => {
  return <Statistic title={title} value={value} prefix={prefix} />;
};

export default CountStatistics;
