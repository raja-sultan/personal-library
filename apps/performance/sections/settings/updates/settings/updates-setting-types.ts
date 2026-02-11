export interface IFormData {
  frequency: string;
  day: string;
  time: string;
  employeeSentiment: boolean;
  publicUpdates: boolean;
  allowManagerOverride: boolean;
}

export interface updateSettingTypes {
  isOpen: { general: boolean; defaults: boolean };
  handleGeneralToggle: () => void;
  handleDefaultsToggle: () => void;
  onSubmit: (formData: any) => void;
  methods: {
    handleSubmit: (
      callback: (data: any) => void
    ) => (e: React.BaseSyntheticEvent) => void;
    reset: () => void;
  };
  handleSubmit: (data: any) => any;
}
