export interface UseSetting {
  settingsData: any;
  openCustomModal: boolean;
  setOpenCustomModal: React.Dispatch<React.SetStateAction<boolean>>;
  modalFilledData: {
    name: string;
    repeatReminder: boolean;
    subject: string;
    body: string;
  };
  expandedAccordion: string;
  handleAccordionChange: (curr: string) => void;
  methods: {
    handleSubmit: (
      callback: (data: any) => void
    ) => (e: React.BaseSyntheticEvent) => void;
    reset: () => void;
  };
  handleSubmit: (data: any) => any;
  onSubmit: (formData: any) => any;
  setValue: any;
  reset: (
    values?: Record<string, any>,
    omitResetState?: Record<string, boolean>
  ) => any;
  repeatReminder?: boolean;
  updateOneOnOnesSetting: (...args: any[]) => Promise<any>;
  confirmMail: boolean;
  meetingMail: boolean;
  handleToggleMailModal: (checked: boolean, type: string) => void;
  modalType:string
}
export interface oneOnOneSettingEmailFields {
  reminderMailSchedule: string;
  limitOneOnOne: string;
  subjectField: string;
  bodyField: string;
}
