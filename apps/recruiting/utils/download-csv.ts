import axios from "axios";
import { toast } from "react-hot-toast";
import { BASE_URL } from "@root/config";
import { getSessionStorage } from "@root/../../packages/common";

export async function downloadCSVFile(
  endpoint: string,
  fileName: string,
  params?: any,
  rootUrl?: string
): Promise<void> {
  const STORAGE_KEY = "accessToken";
  const accessToken = getSessionStorage(STORAGE_KEY);
  try {
    const response = await axios.get(`${rootUrl ?? BASE_URL}${endpoint}`, {
      responseType: "blob",
      params,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const blob = new Blob([response.data], { type: "text/csv" });
    const blobUrl = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = `${fileName}.csv`;
    a.click();
    window.URL.revokeObjectURL(blobUrl);
    toast.success("CSV downloaded successfully");
  } catch (error) {
    toast.error(
      error?.message || "An error occurred while downloading the CSV file"
    );
  }
}
