import { useTheme } from "@mui/material";
import type { Theme } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import type { UseFormReturn, SubmitHandler, UseFormHandleSubmit } from "react-hook-form";

interface FormValues {
  peers: string;
}

interface ProfileCardWrapperProps {
  theme: Theme;
  isSelectPeersModal: boolean;
  peersNomination: boolean;
  openSelectPeers: boolean;
  setOpenSelectPeers: any;
  handleSelectPeers: () => void;
  setPeersNomination: any;
  tableId: any;
  setTableId: any;
  onSubmit: SubmitHandler<FormValues>;
  methods?: UseFormReturn<FormValues>;
  handleSubmit: UseFormHandleSubmit<FormValues>;
}

export function useProfileCardWrapper(): ProfileCardWrapperProps {
  const theme = useTheme();
  const [isSelectPeersModal, setIsSelectPeersModal] = useState<boolean>(false);
  const [peersNomination, setPeersNomination] = useState(false);
  const [openSelectPeers, setOpenSelectPeers] = useState(false);
  const [tableId, setTableId] = useState();


  const handleSelectPeers = (): void => {
    setIsSelectPeersModal(false);
  };

  // const handleMyReview = (value: string | undefined): void => {
  //   value === "Select peers" && setIsSelectPeersModal(true);
  // };

  const methods = useForm<FormValues>({
    resolver: yupResolver(
      Yup.object().shape({
        peers: Yup.string().required("Required Field"),
      })
    ),
    defaultValues: {
      peers: "",
    },
  });

  const { handleSubmit } = methods;

  const onSubmit = (): void => { };
  return {
    theme,
    isSelectPeersModal,
    handleSelectPeers,
    methods,
    handleSubmit,
    onSubmit,
    peersNomination,
    openSelectPeers,
    setOpenSelectPeers,
    setPeersNomination,
    setTableId,
    tableId
  };
}
