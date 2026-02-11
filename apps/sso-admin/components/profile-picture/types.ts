export interface ProfilePictureTypes {
  editFormState: boolean;
  profilePicture: string | null;
  setProfilePicture: CallableFunction;
  onProfileImageDelete:CallableFunction;
  onSubmitProfileImage: CallableFunction;
}
