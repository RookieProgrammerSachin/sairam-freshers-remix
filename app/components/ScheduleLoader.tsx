import { Skeleton } from "@mantine/core";

function ScheduleLoader({ count = 5 }) {
  return Array.from({ length: count }).map((o, i) => (
    <Skeleton width={"100%"} visible={true} height={100} radius="sm" key={i} />
  ));
}

export default ScheduleLoader;
