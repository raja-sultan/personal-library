import type React from "react";
import { useEffect, useState } from "react";
import {
  useAddDiscussionPointMutation,
  useDeleteDiscussionActionItemPointMutation,
  useEndOneOnOneMutation,
  useGetOneOnOneCategoryQuery,
  useGetOneOnOneSuggestedDiscussionPointsQuery,
  usePatchOneOnOneByIdMeetingsCancelMutation,
  useUpdateMeetingPointMutation,
  useUpdateNotesAndRatingMutation,
  useViewOneOnOneDetailsQuery,
} from "@services/one-on-ones/one-on-ones-api";
import dayjs from "dayjs";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";
import { useGetProfileQuery } from "@services/profile/profile-api";

interface BrowsePoints {
  _id?: string;
  text: string;
  category?: string;
}

interface User {
  userId?: string;
  profileImage?: string;
  firstName?: string;
  lastName?: string;
  date?: string;
  employeeTitle?: string;
  fullName?: string;
}

interface Points {
  _id: string;
  title: string;
  addedBy: string;
  date: string;
  checked: boolean;
  currentUser: User;
  assigneeId?: string;
  users?: User[];
}

interface ReturnType {
  oneOneOneCategoryList: { _id: string; name: string }[];
  handleDiscussionPointFilter: (value: string) => void;
  oneOnOneSuggestedDiscussionPoints: BrowsePoints[];
  handleAddDiscussionPoint: (points: BrowsePoints, type: string) => void;
  oneOnOneDetailsData: {
    id?: string | number;
    title?: string;
    subTitle?: string;
    desc?: string;
    isInput?: boolean;
    path?: string;
  }[];
  handleEditOneOnOneDetail: () => void;
  handleOpenDiscussionDrawer: () => void;
  openDrawer: boolean;
  handleBackRoute: () => void;
  handleViewProfile: () => void;
  handleCancelOneOnOne: () => void;
  handleSaveClick: () => void;
  handleEndOneOnOne: () => void;
  handleNotesAndRatingChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  discussionPointData: Points[];
  newActionItems: Points[];
  actionItems: Points[];
  notesRating: {
    sharedNotes: string;
    privateNote: string;
    rating: number | undefined | null;
  };
  handleDeletePoint: (pontId: string) => void;
  handleUpdateMeetingPoint: (
    pontId: string,
    others: { checked?: boolean | undefined; assigneeId?: string | undefined }
  ) => void;
  currentUser: User;
  actionType: string | undefined;
  cancelOneOneOne: () => void;
  cancelDialog: boolean;
  isCancelled: boolean;
  isCancelOneOnOneLoading: boolean;
  isNotesRatingLoading: boolean;
  isDiscussionPointLoading: boolean;
  isLoading: boolean;
  isUpdateMeetingLoading: boolean;
  isDeletePointLoading: boolean;
}

export function useViewOneOnOne(): ReturnType {
  const oneOnOneId = useSearchParams().get("id") || "";
  const meetingId = useSearchParams().get("meetingId") || "";
  const actionType = useSearchParams().get("status") || "";
  const router = useRouter();
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [suggestedPoints, setSuggestedPoints] = useState<{ category?: string }>({});
  const [cancelDialog, setCancelDialog] = useState(false);
  const notesRatingDefaultValues = {
    sharedNotes: "",
    privateNote: "",
    rating: 0,
  };
  
  const [notesRating, setNotesRating] = useState(notesRatingDefaultValues);

  const { data: onOnOne, isLoading } = useViewOneOnOneDetailsQuery({
    id: oneOnOneId,
    meetingId,
  });
  const [cancelOneOnOneMutation, { isLoading: isCancelOneOnOneLoading }] = usePatchOneOnOneByIdMeetingsCancelMutation();
  const { data: oneOneOneCategories } = useGetOneOnOneCategoryQuery({});
  const { data: OneOnOneSuggestedDiscussionPoints } =
    useGetOneOnOneSuggestedDiscussionPointsQuery(suggestedPoints);
  const [deletePointsMutation, { isLoading: isDeletePointLoading }] = useDeleteDiscussionActionItemPointMutation();
  const [updateMeetingPointMutation, { isLoading: isUpdateMeetingLoading }] = useUpdateMeetingPointMutation();
  const [addDiscussionPointMutation, { isLoading: isDiscussionPointLoading }] = useAddDiscussionPointMutation();
  const [updateNotesAndRatingMutation, { isLoading: isNotesRatingLoading }] = useUpdateNotesAndRatingMutation();
  const [endOneOnOneMutation] = useEndOneOnOneMutation();
  const { data: getProfile } = useGetProfileQuery({});

  const oneOnOneData = onOnOne?.data;
  const oneOnOneDetails = oneOnOneData?.oneOnOneDetails;
  const oneOnOneSuggestedDiscussionPoints =
    OneOnOneSuggestedDiscussionPoints?.data;

  const oneOnOneDetailsData = [
    {
      id: 1,
      title: "Agenda",
      subTitle: "Agenda of 1-on-1",
      desc: oneOnOneDetails?.title ?? "--",
    },
    {
      id: 2,
      title: "Frequency",
      subTitle: "Repeats every week on",
      desc: oneOnOneDetails?.frequency ?? "--",
    },
    {
      id: 3,
      title: "Date for 1-on-1 meeting",
      subTitle: "This 1-on-1 is for",
      desc: oneOnOneData?.date
        ? dayjs(oneOnOneData?.date)?.format("MMMM DD, YYYY")
        : "--",
    },
    {
      id: 4,
      title: "Created by",
      subTitle: "This 1-on-1 is created by",
      desc: `${oneOnOneData?.organizer?.firstName ?? '--'} ${oneOnOneData?.organizer?.lastName ?? '--'}`,
    },
    {
      id: 5,
      title: "Location",
      subTitle: "Location for 1-on-1",
      desc: oneOnOneDetails?.locationType ?? "--",
    },
    {
      isInput: oneOnOneDetails?.locationType?.toLowerCase() === "virtual",
      path: oneOnOneDetails?.path ?? "--",
    },
    {
      id: 6,
      title: "Default 1:1 template",
      subTitle: "Default template for 1-on-1",
      desc: oneOnOneDetails?.template?.title ?? '--',
    },
  ];

  const oneOneOneCategoryList = oneOneOneCategories?.data?.map(
    ({ _id, name }: { _id: string; name: string }) => ({ _id, name })
  );

  const discussionPointData = oneOnOneData?.discussionPoints?.map((obj) => ({
    _id: obj?._id,
    title: obj?.text,
    addedBy: obj?.user
      ? `${obj?.user?.firstName} ${obj?.user?.lastName}`
      : "--",
    date: obj?.createdAt,
    checked: obj?.checked,
  }));

  const currentUser =
    getProfile?.data?._id === oneOnOneData?.attendee?._id
      ? {
        userId: oneOnOneData?.organizer?._id,
        profileImage: oneOnOneData?.organizer?.profileImage,
        firstName: oneOnOneData?.organizer?.firstName,
        lastName: oneOnOneData?.organizer?.lastName,
        date: oneOnOneData?.updatedAt
          ? `${dayjs(oneOnOneData?.updatedAt).format("MMM DD, YYYY")} ${dayjs(
            oneOnOneData?.updatedAt
          ).format("HH:MM A")}`
          : "--",
        employeeTitle: oneOnOneData?.organizer?.employeeTitle,
      }
      : {
        userId: oneOnOneData?.attendee?._id,
        date: oneOnOneData?.updatedAt
          ? `${dayjs(oneOnOneData?.updatedAt).format("MMM DD, YYYY")} ${dayjs(
            oneOnOneData?.updatedAt
          ).format("HH:MM A")}`
          : "--",
        employeeTitle: oneOnOneData?.attendee?.employeeTitle,
        profileImage: oneOnOneData?.attendee?.profileImage,
        firstName: oneOnOneData?.attendee?.firstName,
        lastName: oneOnOneData?.attendee?.lastName,
      };

  const actionItems = oneOnOneData?.actionItems?.map((obj) => ({
    _id: obj?._id,
    title: obj?.text,
    addedBy: obj?.user
      ? `${obj?.user?.firstName} ${obj?.user?.lastName}`
      : "--",
    date: obj?.createdAt,
    checked: obj?.checked,
    assigneeId: obj?.assigneeId,
    currentUser,
    users: [
      {
        userId: oneOnOneData?.organizer?._id,
        fullName: oneOnOneData?.organizer?.fullName,
        profileImage: oneOnOneData?.organizer?.profileImage ?? "img",
        firstName: oneOnOneData?.organizer?.firstName ?? obj?.user?.firstName,
        lastName: oneOnOneData?.organizer?.lastName ?? obj?.user?.lastName,
      },
      {
        userId: oneOnOneData?.attendee?._id,
        fullName: oneOnOneData?.attendee?.fullName,
        profileImage: oneOnOneData?.attendee?.profileImage,
        firstName: oneOnOneData?.attendee?.firstName,
        lastName: oneOnOneData?.attendee?.lastName,
      },
    ],
  }));

  const newActionItems = oneOnOneData?.newActionItems?.map((obj) => ({
    _id: obj?._id,
    title: obj?.text,
    addedBy: obj?.user
      ? `${obj?.user?.firstName} ${obj?.user?.lastName}`
      : "--",
    date: obj?.createdAt,
    checked: obj?.checked,
    assigneeId: obj?.assigneeId,
    currentUser,
    users: [
      {
        userId: oneOnOneData?.organizer?._id,
        fullName: oneOnOneData?.organizer?.fullName,
        profileImage: oneOnOneData?.organizer?.profileImage ?? "img",
        firstName: oneOnOneData?.organizer?.firstName ?? obj?.user?.firstName,
        lastName: oneOnOneData?.organizer?.lastName ?? obj?.user?.lastName,
      },
      {
        userId: oneOnOneData?.attendee?._id,
        fullName: oneOnOneData?.attendee?.fullName,
        profileImage: oneOnOneData?.attendee?.profileImage,
        firstName: oneOnOneData?.attendee?.firstName,
        lastName: oneOnOneData?.attendee?.lastName,
      },
    ],
  }));

  function handleNotesAndRatingChange(
    event: React.ChangeEvent<HTMLInputElement>
  ): void {
    const { name, value } = event.target;
    setNotesRating({
      ...notesRating,
      [name]: name === "rating" ? Number(value) : value,
    });
  }

  async function handleSaveClick(): Promise<void> {
    try {
      await updateNotesAndRatingMutation({ id: oneOnOneId, body: notesRating })
        .unwrap()
        .then((data) => {
          if (data?.data)
            toast.success("Notes and rating updated successfully");
        });
    } catch (error) {
      toast.error(
        error?.data?.message || "Error while updating notes and rating"
      );
    }
  }

  async function handleEndOneOnOne(): Promise<void> {
    try {
      await endOneOnOneMutation({ id: oneOnOneId })
        .unwrap()
        .then((data) => {
          if (data?.data) toast.success("1-on-1 ended successfully");
        });
    } catch (error) {
      toast.error(error?.data?.message || "Error while ending 1-on-1");
    }
  }

  function handleViewProfile(): void {
    //route with current user id
    currentUser?.userId;
  }

  function handleCancelOneOnOne(): void {
    setCancelDialog(!cancelDialog);
  }

  function handleEditOneOnOneDetail(): void {
    router.push(`/one-on-ones/create?id=${oneOnOneDetails?._id}`);
  }

  function handleOpenDiscussionDrawer(): void {
    setOpenDrawer(!openDrawer);
  }

  function handleDiscussionPointFilter(value: string): void {
    setSuggestedPoints({ category: value === "everything" ? "" : value });
  }

  function handleBackRoute(): void {
    router.back();
  }

  async function handleAddDiscussionPoint(
    point: BrowsePoints,
    type: string
  ): Promise<void> {
    try {
      await addDiscussionPointMutation({
        id: oneOnOneId,
        meetingId,
        suggestedPointId: point?._id ?? "",
        type,
        body: { text: point?.text ?? "" },
      })
        .unwrap()
        .then((data) => {
          if (data?.data) {
            toast.success("Discussion point added successfully");
          }
        });
    } catch (error) {
      toast.error(
        error?.data?.message || "Error while adding discussion point "
      );
    }
  }

  async function handleDeletePoint(pointId: string): Promise<void> {
    try {
      await deletePointsMutation({ id: oneOnOneId, meetingId, pointId })
        .unwrap()
        .then((data) => {
          if (data) {
            toast.success("Point deleted successfully");
          }
        });
    } catch (_) {
      toast.error("Error while deleting point.");
    }
  }

  async function handleUpdateMeetingPoint(
    pointId: string,
    others: {
      checked?: boolean | undefined;
      assigneeId?: string | undefined;
    }
  ): Promise<void> {
    const payload = {
      ...(others?.assigneeId && { assigneeId: others?.assigneeId }),
      ...(!others?.assigneeId && { checked: others?.checked }),
    };
    try {
      await updateMeetingPointMutation({
        id: oneOnOneId,
        meetingId,
        pointId,
        payload,
      })
        .unwrap()
        .then((data) => {
          if (data?.data) {
            toast.success("Point updated successfully");
          }
        });
    } catch (_) {
      toast.error("Error while updating point.");
    }
  }

  async function cancelOneOneOne(): Promise<void> {
    try {
      await cancelOneOnOneMutation({ id: oneOnOneId, meetingId }).unwrap().then((data) => {
        if (data?.data) {
          toast.success('1-on-1 meeting canceled successfully');
          handleCancelOneOnOne();
        }
      })
    } catch (error) {
      toast.error(error?.data?.message || '1-on-1 meeting canceled successfully')
    }
  }

  useEffect(() => {
    if (meetingId) {
      setNotesRating({
        sharedNotes: oneOnOneData?.sharedNotes ?? "",
        privateNote: oneOnOneData?.attendeePrivateNotes ?? "",
        rating: oneOnOneData?.attendeeRating ?? 0,
      });
    }
  }, [meetingId, oneOnOneData]);

  return {
    oneOneOneCategoryList,
    handleDiscussionPointFilter,
    oneOnOneSuggestedDiscussionPoints,
    handleAddDiscussionPoint,
    oneOnOneDetailsData,
    handleEditOneOnOneDetail,
    handleOpenDiscussionDrawer,
    openDrawer,
    handleBackRoute,
    handleViewProfile,
    handleCancelOneOnOne,
    discussionPointData,
    newActionItems,
    handleSaveClick,
    handleNotesAndRatingChange,
    notesRating,
    handleEndOneOnOne,
    handleDeletePoint,
    handleUpdateMeetingPoint,
    actionItems,
    currentUser,
    actionType,
    cancelOneOneOne,
    cancelDialog,
    isCancelled: oneOnOneData?.isCancelled,
    isCancelOneOnOneLoading,
    isNotesRatingLoading,
    isDiscussionPointLoading,
    isLoading,
    isUpdateMeetingLoading,
    isDeletePointLoading
  };
}
