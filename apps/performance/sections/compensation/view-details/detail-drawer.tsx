import {
  Box,
  Button,
  Divider,
  Drawer,
  Typography,
  Slider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import { renderUserImage } from "@root/utils/render-user-image";
import { styles } from "@sections/compensation/view-details/view-detail.style";
import dayjs from "dayjs";
import toast from "react-hot-toast";
import { useGetShareTeamResultMutation } from "@services/compensation/compensation-cycle/compensation-cycle-view-details-api";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

interface DetailDrawerTypes {
  open: boolean;
  onClose: () => void;
  buttonText?: boolean;
  data: any;
  _id?: string;
}
export function DetailDrawer({
  open,
  onClose,
  buttonText,
  data,
  _id,
}: DetailDrawerTypes): JSX.Element {
  const marks = [
    {
      value: 0,
      label: data?.user?.compensationBand?.minBasePay,
    },
    {
      value: 100,
      label: data?.user?.compensationBand?.maxBasePay,
    },
  ];

  const totalPay = 1000 - data?.user?.compensationBand?.minBasePay;
  const currentSalary = (data?.currentSalary / totalPay) * 100;
  const [patchShareTeamResult] = useGetShareTeamResultMutation({});

  const handleShare = async (
    userId: string,
    isShare: boolean
  ): Promise<void> => {
    const payload = {
      shared: !isShare,
      userId,
      id: _id,
    };
    await patchShareTeamResult({ payload })
      .unwrap()
      .then(() => {
        toast.success(
          `${!isShare ? "Team Result is shared successfully" : "Team Result is unShared now"} `
        );
      })
      .catch((error) => {
        toast.error(error?.data?.message);
      });
  };

  return (
    <Drawer
      open={open}
      onClose={onClose}
      anchor="right"
      PaperProps={{ sx: styles.paper }}
    >
      <CloseIcon onClick={onClose} sx={styles.closeIcon} />
      <Box sx={styles.userInfo}>
        {renderUserImage({
          profileImage: data?.user?.profileImage,
          firstName: data?.user?.firstName ?? "-",
          lastName: data?.user?.lastName ?? "-",
          height: 48,
          width: 48,
        })}
        <Typography variant="h6" fontWeight={600}>
          {`${data?.user?.firstName} ${data?.user?.lastName}`}
        </Typography>
      </Box>
      {buttonText && (
        <Button
          onClick={() => handleShare(data?.user?._id, data?.shared)}
          sx={styles.button(data?.shared)}
          fullWidth
          variant={data?.shared ? "contained" : "outlined"}
        >
          <CheckIcon sx={{ mr: "10px" }} />
          {data?.shared ? "Shared" : "Share"}
        </Button>
      )}
      <Typography variant="body2" fontWeight={600} mb="24px">
        {data?.user?.employeeTitle}
      </Typography>
      <Box sx={styles.drawerDetails}>
        <TitleWithText title="Level" value={data?.user?.jobLevel ?? "-"} />
        <TitleWithText title="Location" value={data?.user?.location ?? "-"} />
        <TitleWithText
          title="Start Date"
          value={
            data?.user?.employmentStartDate
              ? dayjs(data?.user?.employmentStartDate).format("DD/MM/YYYY")
              : "-"
          }
        />
        <TitleWithText
          title="Last pay change"
          value={
            data?.payEffectiveDate
              ? dayjs(data?.payEffectiveDate).format("DD/MM/YYYY")
              : "-"
          }
        />

        <TitleWithText
          title="Promotion"
          value={data?.isPromoted ? "Yes" : "No"}
        />
      </Box>
      <Divider sx={styles.dividerStyle} />
      <Typography variant="body2" fontWeight={600} mb="24px">
        Salary
      </Typography>
      <Box sx={styles.drawerDetails}>
        <TitleWithText
          title="Previous Pay"
          value={data?.currentSalary ? `£ ${data?.currentSalary}` : "-"}
        />
        <TitleWithText
          title="Guidance"
          value={data?.guidance ? `£ ${data?.guidance}` : "-"}
        />
        <TitleWithText
          title="Recommendation"
          value={data?.recommendation ? `£ ${data.recommendation}` : "-"}
        />
        <TitleWithText
          title="New Pay"
          value={data?.newPay ? `£ ${data.newPay}` : "-"}
        />
      </Box>
      <Divider sx={styles.dividerStyle} />
      <Typography variant="body2" fontWeight={600} mb="24px">
        Compensation band
      </Typography>
      <Typography
        variant="subtitle2"
        fontWeight={600}
        mb="24px"
        color="neutral.500"
      >
        Current Salary £{data?.currentSalary}
      </Typography>
      <Slider
        aria-labelledby="track-true-slider"
        // getAriaValueText={valuetext}
        defaultValue={currentSalary}
        marks={marks}
        sx={styles.sliderStyle}
        classes={{
          track: "_track",
          rail: "_rail",
          markLabel: "_markLabel",
        }}
        disabled
      />
      <Divider sx={styles.dividerStyle} />
      <Typography variant="body2" fontWeight={600} mb="24px">
        Notes
      </Typography>
      {data?.note ? (
        <>
          <Box sx={styles.drawerBottomImgWrapper}>
            <Box sx={styles.drawerImgWrapper}>
              {renderUserImage({
                profileImage: data?.note?.createdBy?.profileImage,
                firstName: data?.note?.createdBy?.firstName ?? "-",
                lastName: data?.note?.createdBy?.lastName ?? "-",
                height: 48,
                width: 48,
              })}
              <Typography variant="h6" fontWeight={600}>
                {`${data?.note?.createdBy?.firstName} ${data?.note?.createdBy?.lastName}`}
              </Typography>
            </Box>
            <Typography variant="caption" color="neutral.500">
              {dayjs().to(dayjs(data?.user?.compensationBand?.createdAt))}
            </Typography>
          </Box>
          <Typography
            variant="subtitle2"
            fontWeight={400}
            mb="24px"
            color="neutral.500"
          >
            {data?.note?.description}
          </Typography>
        </>
      ) : (
        <>-</>
      )}
    </Drawer>
  );
}

function TitleWithText({ title, value }): JSX.Element {
  return (
    <Box sx={styles.titleWithTextWrapper}>
      <Typography variant="body2" fontWeight={600} mb="8px">
        {title}
      </Typography>
      <Typography variant="body2" fontWeight={400} color="neutral.500">
        {value}
      </Typography>
    </Box>
  );
}
