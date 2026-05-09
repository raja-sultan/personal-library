import type { LazyQueryTrigger } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import toast from "react-hot-toast";

export const DownloadCsv = async (
  trigger: LazyQueryTrigger<any>,
  FileName: string,
  params?: any
): Promise<void> => {
  try {
    const response: any = await trigger(params).unwrap();
    // Assuming the data returned is a Blob
    const url = window.URL.createObjectURL(response);

    // Create an anchor element
    const link = document.createElement("a");
    link.href = url;

    // Set the filename for the downloaded file
    link.download = `${FileName}.cvs`; // Replace 'your_file_name.xlsx' with the desired filename

    // Programmatically click the anchor element to trigger the download
    link.click();

    // Clean up by removing the anchor element
    URL.revokeObjectURL(url);
    toast.success("Downloaded successfully");
  } catch (error) {
    toast.error("Error Occurred");
  }
};
