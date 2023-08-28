import Layout from "./../../Layout/LayoutMain";
import { Typography } from "antd";
const ScheduleNotifications = () => {
  return (
    <Layout active={"schedule-notifications"}>
      <div className="white-card">
        <Typography.Title level={2}>Scheduler Notifications</Typography.Title>
      </div>
    </Layout>
  );
};

export default ScheduleNotifications;
