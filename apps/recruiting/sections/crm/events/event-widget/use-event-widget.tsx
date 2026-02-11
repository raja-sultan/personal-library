import { useGetSingleEventDetailQuery } from "@services/crm/events/crm-events-api";
import { useState } from "react";

export enum MODALTOGGLER {
  DETAILVIEWMODAL = "viewDetailModel",
  DETAILEDITMODAL = "isEditDetailModalOpen",
  COPYLINKMODAL = "isCopyLinkModalOpen",
}
export function useEventWidget() {
  const [widgetInfoCon, setwidgetInfoCon] = useState({
    viewDetailModel: false,
    isEditDetailModalOpen: false,
    isCopyLinkModalOpen: false,
  });

  const toggleViewDetailModel = (modalToOpen: MODALTOGGLER) => {
    setwidgetInfoCon((pre) => ({
      ...pre,
      [modalToOpen]: !pre[modalToOpen],
    }));
  };

  return {
    widgetInfoCon,
    toggleViewDetailModel,
  };
}
