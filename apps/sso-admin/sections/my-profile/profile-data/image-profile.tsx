import { Avatar } from "@mui/material";
import { awsBaseUrl } from "@root/config";

interface Props {
  profileImage: string;
  firstName: string;
  lastName: string;
  height?: string | number;
  width?: string | number;
}

export function renderUserImage({
  profileImage,
  firstName,
  lastName,
  height = "32px",
  width = "32px",
}: Props): JSX.Element {
  const img = profileImage && awsBaseUrl + profileImage;

  return (
    <Avatar src={img} sx={{ height, width }}>
      {firstName?.charAt(0)}
      {lastName?.charAt(0)}
    </Avatar>
  );
}
