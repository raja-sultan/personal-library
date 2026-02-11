import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import {
  useGetPrivateNoteQuery,
  usePostPrivateNoteMutation,
  useUpdatePrivateNoteMutation,
} from "@services/candidate/private-note/private-note-api";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useSelector } from "@store";

export function UsePrivateNote(): any {
  const params = useSearchParams();
  const candidateId = params.get("candidateID");
  const { user } = useSelector((state: any) => state.auth);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [showUpdateButton, setShowUpdateButton] = useState<boolean>(false);
  const [showEditData, setShowEditData] = useState<any>({});
  const { data: getPrivateNote, isLoading }: any = useGetPrivateNoteQuery({
    candidateId,
  });
  const [postPrivateNote] = usePostPrivateNoteMutation();
  const [updatePrivateNote] = useUpdatePrivateNoteMutation();

  const methods = useForm({
    resolver: yupResolver(
      Yup.object().shape({
        privateNote: Yup.string().required("Private Note is required"),
      })
    ),
    defaultValues: {
      privateNote: showEditData?.privateNote ?? "",
    },
  });

  const { handleSubmit, reset, setValue } = methods;

  const onSubmit = async (data: any): Promise<void> => {
    // Update
    if (showUpdateButton) {
      const payload = {
        candidateId,
        privateNote: data.privateNote,
        name: user.firstName + user.lastName,
        id: showEditData._id,
        createdBy: user.userId,
      };``
      try {
        await updatePrivateNote({ payload });
        toast.success("PrivateNote edit successfully");
        reset();
      } catch (error) {
        toast.error(error?.data?.message || "Error while editing Private Note");
        reset();
      }
      setShowUpdateButton(false);
    } else {
      // Post
      const payload = {
        candidateId,
        name: user?.firstName + user.lastName,
        createdBy: user.userId,
        privateNote: data.privateNote,
      };

      try {
        const { message }: any = await postPrivateNote({ payload });
        toast.success(message || "PrivateNote Added Successfully");
        reset();
      } catch (error) {
        const errMsg = error?.data?.message;
        toast.error(errMsg || "Error Occurred");
        reset();
      }
    }
    setShowForm(false);
  };

  const CloseHandler = (): void => {
    if (showUpdateButton) {
      setShowUpdateButton(false);
    } else {
      console.log("");
    }
    setShowForm(!showForm);
  };

  const addPrivateNoteHandler = (): void => {
    setShowForm(true);
  };

  const editPrivateNoteHandler = (data): void => {
    const { isEdit, editData } = data;
    setShowUpdateButton(data);
    setShowForm(isEdit);
    setShowEditData(editData);
  };
  useEffect(() => {
    setValue("privateNote", showEditData?.privateNote ?? "");
  }, [setValue, showEditData]);
  return {
    showForm,
    methods,
    showUpdateButton,
    getPrivateNote,
    onSubmit,
    handleSubmit,
    addPrivateNoteHandler,
    editPrivateNoteHandler,
    CloseHandler,
    isLoading,
  };
}
