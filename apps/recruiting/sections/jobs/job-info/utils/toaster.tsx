import toast from "react-hot-toast";

export const displaySuccessMessage = (data: any) => {
  toast.success(
    data?.data?.message || data?.message || "Operation Completed Successfully"
  );
};

export const displayErrorMessage = (error: any) => {
  toast.error(error?.data?.message || error?.message || "Something went wrong");
};
