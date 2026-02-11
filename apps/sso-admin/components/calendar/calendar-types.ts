import type dayjs from "dayjs";

export interface IEVENTSDATA {
  title: string;
  id?: string;
  date: string;
  start?: string;
  end?: string;
  className?: string;
}

export interface IPOPOVERDATA {
  title: string;
  start: string | null;
  end: string | null;
  open: boolean;
  anchor?: HTMLElement | undefined | null;
  handleClose?: () => void;
  id?: string | undefined;
}
//         {
//   title: string | undefined;
//   start: string | Date | null;
//   end: string | Date | null;
//   open: boolean;
//   id: string | undefined;
// }
export interface IREMINDER {
  label: string;
  dateAndTime: dayjs.Dayjs | null;
  error?: string | undefined;
}

export interface IHOVEREVENT {
  event: {
    title: string;
    start: string | number | Date | dayjs.Dayjs | null | undefined;
    end: string | number | Date | dayjs.Dayjs | null | undefined;
  };
  el: HTMLElement;
}
export interface IREMINDERMODALPROPS {
  open: boolean;
  onClose: (state: boolean) => void;
  reminderData: (data: IREMINDER) => void;
  postingStatus: {
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
  };
}
