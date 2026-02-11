import dayjs from "dayjs";
import toast from "react-hot-toast";
import { Button, Grid, Skeleton, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { FormProvider, RHFMentionTextField } from "common";
import { useGetUserListForJobApprovalsQuery } from "@services/json-placeholder-api";
import { useMakeNoteDataMutation } from "@services/candidate/make-a-note/make-a-note-api";
import { useSelector } from "@store";
import { useSearchParams } from "next/navigation";

export function MakeANote({ notes, refetch }): JSX.Element {
  const [addMakeNote] = useMakeNoteDataMutation();
  const {
    user: { firstName, lastName },
  } = useSelector((state: any) => state.auth);
  const params = useSearchParams();
  const candidateId = params.get("candidateID");

  const methods: any = useForm<any>({
    defaultValues: {
      note: "",
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { isDirty },
  } = methods;

  const submitHandler = async (data: any): Promise<void> => {
    const payload = {
      note: data.note,
      createdBy: `${firstName} ${lastName}`,
      dateAndTime: new Date(),
    };

    try {
      const res: any = await addMakeNote({
        payload,
        candidateId,
      });
      refetch();
      reset();
      toast.success(res?.data?.message ?? "Note Added Successfully");
    } catch (error) {
      toast.error(error.message ?? "Something Went wrong");
    }
  };

  const { data: mentionList, isLoading }: any =
    useGetUserListForJobApprovalsQuery({});

  const mentionableData = mentionList?.map((user) => ({
    id: user._id,
    display: user.userName,
  }));

  // Function to make words inside square brackets bold
  function makeInsideSquareBracketsBold(noteText: string): JSX.Element {
    const stringWithoutParentheses = noteText.replace(/\([^)]*\)/g, "");

    return (
      <Typography variant="body1">
        {stringWithoutParentheses
          .split(/(?<temp1>\[.*?\]|@\w+)/)
          .map((part, index) => {
            return part.startsWith("[") && part.endsWith("]") ? (
              <b key={index} style={{ fontWeight: "bold" }}>
                {part.substring(1, part.length - 1)}{" "}
              </b>
            ) : (
              <span key={index}>{part}</span>
            );
          })}
      </Typography>
      //    <Typography variant="body1">
      //    {stringWithoutParentheses
      //      .split(/(?<temp1>(\@\w*\[.*?\]|\@\w+|\[.*?\]))/)
      //      .map((part, index) => {
      //        return (
      //          <span key={index}>
      //            {part.startsWith("[") && part.endsWith("]") ? (
      //              <b key={index} style={{ fontWeight: "bold" }}>
      //                {part.substring(1, part.length - 1)}{" "}
      //              </b>
      //            ) : part.startsWith("@") ? (
      //              <b key={index} style={{ fontWeight: "bold" }}>
      //                {part}{" "}
      //              </b>
      //            ) : (
      //              part
      //            )}
      //          </span>
      //        );
      //      })}
      //  </Typography>
    );
  }

  if (isLoading) {
    return <Skeleton variant="rounded" width="100%" height={60} />;
  }

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(submitHandler)}>
      <Grid container spacing={2} mt={2}>
        <Grid item xs={12}>
          <RHFMentionTextField
            name="note"
            outerLabel="Make a Note"
            mentionList={mentionableData}
          />
        </Grid>
        {isDirty && (
          <Grid
            item
            xs={12}
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Button
              type="button"
              variant="outlined"
              onClick={() => reset({ note: "" })}
            >
              Cancel
            </Button>
            <Button type="submit" variant="contained" sx={{ ml: 1 }}>
              Save
            </Button>
          </Grid>
        )}
        <Grid
          item
          xs={12}
          container
          sx={{
            maxHeight: "300px",
            overflowY: "scroll",
            "&::-webkit-scrollbar": {
              width: "6px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "primary.main",
              borderRadius: "4px",
            },
          }}
        >
          <Typography variant="body2">Last Note</Typography>
          {notes?.map((note) => {
            return (
              <Grid item xs={12} key={note?._id} mt={1}>
                <Typography variant="body1">
                  {makeInsideSquareBracketsBold(note?.note)}
                </Typography>
                <Typography variant="body2">
                  {note?.createdBy} on{" "}
                  {dayjs(note?.dateAndTime).format("MMMM DD, YYYY")}
                </Typography>
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </FormProvider>
  );
}
