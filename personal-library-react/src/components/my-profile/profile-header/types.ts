export interface ProfileHeaderTypes {
  editFormState: boolean;
  setEditFormState: CallableFunction;
  profilePicture: string | null;
  setProfilePicture: CallableFunction;
  coverImage: string | null;
  setCoverImage: CallableFunction;
  firstName: string | null;
  lastName: string | null;
  employeeTitle:string | null;
}
