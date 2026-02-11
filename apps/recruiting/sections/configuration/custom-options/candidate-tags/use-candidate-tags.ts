import { useGetCandidateTagListQuery } from "@services/configuration/candidate-tags-api/candidate-tags-api";
import { useState } from "react";

export default function useCandidateTags(): any {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [isEditModal, setIsEditModal] = useState(false);
  const [idForUpdateDelete, setIdForUpdateDelete] = useState("");
  const [params, setParams] = useState<any>({
    page: 1,
    offset: 0,
  });

  const breadcrumbs = [
    { key: "", value: "Configuration", link: "/configuration" },
    { key: "", value: "Custom Options", link: "/configuration/custom-options" },
    { key: "", value: "Manage Candidate Tags", link: "" },
  ];

  const { data, isLoading, isError, isSuccess } = useGetCandidateTagListQuery({
    params: {
      limit: 10,
      offset: params.offset,
    },
  });

  const candidateTagsList = data?.data?.candidateTags;

  const getDataOnEdit =
    candidateTagsList?.length &&
    candidateTagsList?.find((row) => row?._id === idForUpdateDelete);

  return {
    openEditModal,
    setOpenEditModal,
    openDeleteModal,
    setOpenDeleteModal,
    isEditModal,
    setIsEditModal,
    idForUpdateDelete,
    setIdForUpdateDelete,
    data,
    setParams,
    breadcrumbs,
    getDataOnEdit,
    candidateTagsList,
    isLoading,
    isError,
    isSuccess,
  };
}
