import React, { useState } from "react";
import { MuiTelInput, matchIsValidTel } from "mui-tel-input";

export function CustomTelInput({
  variant = "outlined",
}: {
  variant: "outlined" | "filled" | "standard" | undefined;
}): JSX.Element {
  const [phone, setPhone] = useState("");

  const handleChange = (newPhone): void => {
    setPhone(newPhone);
    matchIsValidTel(newPhone); // returns boolean for validation
  };

  return (
    <MuiTelInput variant={variant} value={phone} onChange={handleChange} />
  );
}
