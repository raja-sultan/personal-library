import React, { useState, useEffect } from "react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import ControlPointOutlinedIcon from "@mui/icons-material/ControlPointOutlined";
import {
  useGetPersonalizedDashboardQuery,
  usePutTheDashboardMutation,
} from "@services/dashboard/personalized-dashboard-api";
import {
  personalizedData,
  personalizedDataRightView,
} from "./personalized-modal-data";
import toast from "react-hot-toast";

export const usePersonalizedModal = () => {
  const { data, isLoading } = useGetPersonalizedDashboardQuery({});
  const [mainViewData, setMainViewData] = useState({});
  const [rightViewData, setRightViewData] = useState({});

  useEffect(() => {
    if (!isLoading && data) {
      setMainViewData(data.data.mainView || {});
      setRightViewData(data.data.rightRail || {});
    }
  }, [isLoading, data]);

  const [updateDashboard] = usePutTheDashboardMutation();

  const toggleMainView = (key) => {
    const updatedMainViewData = {
      ...mainViewData,
      [key]: {
        isActive: !(mainViewData[key]?.isActive || false),
        index: 1,
      },
    };
    setMainViewData(updatedMainViewData);
    void updateDashboardWithAllItems(updatedMainViewData, rightViewData);
  };

  const toggleRightView = (key) => {
    const updatedRightViewData = {
      ...rightViewData,
      [key]: {
        isActive: !(rightViewData[key]?.isActive || false),
        index: 1,
      },
    };
    setRightViewData(updatedRightViewData);
    void updateDashboardWithAllItems(mainViewData, updatedRightViewData);
  };

  const getIcon = (item) => {
    const isActive = mainViewData[item.values]?.isActive || false;
    return isActive ? (
      <CloseOutlinedIcon
        sx={{ color: "text.secondary", cursor: "pointer" }}
        onClick={() => {
          toggleMainView(item.values);
        }}
      />
    ) : (
      <ControlPointOutlinedIcon
        sx={{ color: "primary.main", cursor: "pointer" }}
        onClick={() => {
          toggleMainView(item.values);
        }}
      />
    );
  };

  const getIconRightRail = (item) => {
    const isActive = rightViewData[item.values]?.isActive || false;
    return isActive ? (
      <CloseOutlinedIcon
        sx={{ color: "text.secondary", cursor: "pointer" }}
        onClick={() => {
          toggleRightView(item.values);
        }}
      />
    ) : (
      <ControlPointOutlinedIcon
        sx={{ color: "primary.main", cursor: "pointer" }}
        onClick={() => {
          toggleRightView(item.values);
        }}
      />
    );
  };

  // Function to merge updated items with the existing state and return the complete payload
  const updateDashboardWithAllItems = async (
    updatedMainViewData,
    updatedRightViewData
  ) => {
    // Merge the updated items with the existing state
    const mergedMainViewData = { ...mainViewData, ...updatedMainViewData };
    const mergedRightViewData = { ...rightViewData, ...updatedRightViewData };

    // Generate the complete payload including all items
    const payload = {
      mainView: personalizedData.reduce((acc, item) => {
        acc[item.values] = {
          isActive: mergedMainViewData[item.values]?.isActive,
          index: item.id,
        };
        return acc;
      }, {}),
      rightRail: personalizedDataRightView.reduce((acc, item) => {
        acc[item.values] = {
          isActive: mergedRightViewData[item.values]?.isActive,
          index: item.id,
        };
        return acc;
      }, {}),
    };

    try {
      const res = await updateDashboard({ params: payload }).unwrap();
      toast.success(
        res.message ?? "Personalize dashboard has been retrieved successfully"
      );
    } catch (err) {
      toast.error(err.message ?? "Something went wrong");
    }
    // Update the dashboard with the complete payload
  };

  return {
    getIconRightRail,
    getIcon,

    isLoading,
  };
};
