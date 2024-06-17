import { useParams } from "@remix-run/react";

function ScheduleEditPage() {
  const { scheduleId } = useParams();
  return <div>ScheduleEditPage {scheduleId}</div>;
}

export default ScheduleEditPage;
