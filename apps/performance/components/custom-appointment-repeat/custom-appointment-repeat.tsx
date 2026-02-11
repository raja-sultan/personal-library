"use client";

import { RHFCustomSelect, RHFTextField } from "common";
import React, { useState } from "react";
import {
  Box,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import { InputArrowDownIcon } from "@assets/icons/input-arrow-down-icon";
import { useFormContext } from "react-hook-form";
import { ThemeModeColor } from "@root/utils";
import {
  daysList,
  frequencyOptions,
  monthList,
} from "./custom-appointment-repeat.data";
import { styles } from "./custom-appointment-repeat.styles";

function CustomAppointmentRepeat({ ...field }: any): JSX.Element | null {
  const { watch, setValue } = useFormContext();
  const [monthlyRadioValue, setMonthlyRadioValue] = useState("1");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setMonthlyRadioValue((event.target as HTMLInputElement).value);
  };
  return (
    <Stack spacing={4.2}>
      <RHFCustomSelect
        size="small"
        name="frequency"
        outerLabel="Frequency"
        options={frequencyOptions}
        placeholder="Select frequency"
      />
      {watch("frequency") === "Does not repeat" ||
        watch("frequency") === "Daily" ? null : (
        <Box>
          {field?.outerLabel && (
            <Typography
              variant="subtitle2"
              mb={0.2}
              fontWeight={600}
              color={ThemeModeColor("#363565")}
            >
              {field.outerLabel}
            </Typography>
          )}

          <Grid container gap={1.3} alignItems="center">
            <Grid item xs={12} md={3}>
              <RHFTextField
                sx={styles.textField}
                type="number"
                name={field.name}
                size='small'
                InputProps={{
                  inputProps: {
                    min: 0
                  }
                }}
                EndIcon={
                  <Box sx={styles.textFieldBtnWrapper}>
                    <InputArrowDownIcon
                      onClick={() => {
                        setValue(field.name, Number(watch(field.name)) + 1);
                      }}
                      sx={styles.arrowUpBtn}
                    />

                    <InputArrowDownIcon
                      onClick={() => {
                        setValue(field.name, Number(watch(field.name)) - 1);
                      }}
                      sx={styles.arrowDownBtn}
                    />
                  </Box>
                }
                {...field}
                outerLabel=""
              />
            </Grid>

            {(watch("frequency") === "Every Weekday (Mon-fri)" ||
              watch("frequency") === "Weekly" ||
              watch("frequency") === "Yearly") && (
                <Grid item xs={12} md={3}>
                  <Typography
                    variant="subtitle2"
                    fontWeight={600}
                    color="neutral.500"
                  >
                    {watch("frequency") === "Yearly" ? "Year(s)" : "Weeks(s)"}{" "}
                    {watch("frequency") === "Weekly"
                      ? "on"
                      : watch("frequency") === "Weekly"}
                  </Typography>
                </Grid>
              )}
            {watch("frequency") === "Monthly" && (
              <Grid item xs={12} md={4}>
                <RHFCustomSelect
                  name="month"
                  size='small'
                  placeholder="Select month"
                  options={monthList}
                />
              </Grid>
            )}
          </Grid>

          {watch("frequency") === "Monthly" && (
            <FormControl fullWidth>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={monthlyRadioValue}
                onChange={handleChange}
              >
                <Grid mt={1.6} container alignItems="center" gap={1.3}>
                  <Grid item xs={12} md={3}>
                    <FormControlLabel
                      value="1"
                      control={<Radio />}
                      label="On day"
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <RHFTextField
                      size='small'
                      name="onDayTextField"
                      disabled={monthlyRadioValue !== "1"}
                      placeholder="3"
                    />
                  </Grid>
                </Grid>

                <Grid mt={1.6} container alignItems="center" gap={1.3}>
                  <Grid item xs={12} md={3}>
                    <FormControlLabel
                      value="2"
                      control={<Radio />}
                      label="On the"
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <RHFCustomSelect
                      name="onDaySelectValue"
                      size='small'
                      disabled={monthlyRadioValue !== "2"}
                      options={[
                        {
                          value: "first",
                          label: "First",
                        },
                        {
                          value: "second",
                          label: "Second",
                        },
                        {
                          value: "third",
                          label: "Third",
                        },
                      ]}
                      placeholder="First"
                    />
                  </Grid>
                </Grid>
              </RadioGroup>
            </FormControl>
          )}

          {watch("frequency") === "Yearly" && (
            <FormControl fullWidth>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={monthlyRadioValue}
                onChange={handleChange}
              >
                <Grid mt={1.6} container alignItems="center" gap={1.3}>
                  <Grid item xs={12} md={3}>
                    <FormControlLabel
                      value="1"
                      control={<Radio />}
                      label="On day"
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <RHFCustomSelect
                      name="month"
                      size='small'
                      placeholder="Select month"
                      options={monthList}
                      disabled={monthlyRadioValue !== "1"}
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <RHFTextField
                      size='small'
                      name="onDayTextField"
                      disabled={monthlyRadioValue !== "1"}
                      placeholder="3"
                    />
                  </Grid>
                </Grid>

                <Grid mt={1.6} container alignItems="center" gap={1.3}>
                  <Grid item xs={12} md={3}>
                    <FormControlLabel
                      value="2"
                      control={<Radio />}
                      label="On the"
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <RHFCustomSelect
                      size='small'
                      name="onDaySelectValue"
                      disabled={monthlyRadioValue !== "2"}
                      options={[
                        {
                          value: "first",
                          label: "First",
                        },
                        {
                          value: "second",
                          label: "Second",
                        },
                        {
                          value: "third",
                          label: "Third",
                        },
                      ]}
                      placeholder="First"
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <RHFCustomSelect
                      name="month"
                      size='small'
                      placeholder="Select month"
                      options={daysList.map((day) => ({
                        value: day.id,
                        label: day.label,
                      }))}
                      disabled={monthlyRadioValue !== "2"}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container alignItems="center" gap={1.3}>
                      <Grid item xs={2} md={3}>
                        <Typography variant="subtitle1" color="neutral.800">
                          of
                        </Typography>
                      </Grid>
                      <Grid item xs={10} md={4}>
                        <RHFCustomSelect
                          size='small'
                          name="month"
                          placeholder="Select month"
                          options={monthList}
                          disabled={monthlyRadioValue !== "2"}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </RadioGroup>
            </FormControl>
          )}

          {watch("frequency") !== "Yearly" && (
            <Box mt={1.6} display="flex" alignItems="center" gap={1.3}>
              {daysList.map((day) => {
                return (
                  <Box
                    key={day.id}
                    sx={{
                      ...styles.dayWrapper,
                      ...(watch("repeatedDay") === day.id && {
                        backgroundColor: ThemeModeColor("#D9D6FE"),
                      }),
                    }}
                    onClick={() => {
                      setValue("repeatedDay", day.id);
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      color={ThemeModeColor(
                        watch("repeatedDay") === day.id
                          ? "primary.dark"
                          : ThemeModeColor("#A0A3BD")
                      )}
                    >
                      {day.text}
                    </Typography>
                  </Box>
                );
              })}
            </Box>
          )}
        </Box>
      )}
    </Stack>
  );
}

export default CustomAppointmentRepeat;
