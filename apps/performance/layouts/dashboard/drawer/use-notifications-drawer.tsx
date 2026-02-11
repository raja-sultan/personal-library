import { useGetNotificationQuery } from "@services/notifications/notifications-api";
import { useState } from "react";

interface ReturnType {
    notificationsData: any;
    isLoading: boolean;
    handleViewMore: () => void;
}

export function useNotificationDrawer(): ReturnType {
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const { data: notificationsData, isLoading } = useGetNotificationQuery({ offset, limit }); 
  console.log(notificationsData)

  function handleViewMore (): void {
    setOffset((prev) => prev + 1);
    setLimit((prev) => prev + 10);
  }

  return {
    notificationsData,
    isLoading,
    handleViewMore
  };
}
