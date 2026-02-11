import React, { useState } from "react";
import { Button, Typography, Card, Grid, Box, useTheme } from "@mui/material";
import { emailVerificationData } from "./email-verification-data";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import Link from "next/link";
import { DepartmentTable } from "./department-table";
import { FormProvider, RHFTextField } from "common";
import { useForm } from "react-hook-form";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import { GlobalEmailTable } from "./global-email-table";
import { EmailDepartmentModal } from "./department-modal";
import * as yup from "yup";
// import toast from "react-hot-toast";
import { yupResolver } from "@hookform/resolvers/yup";
// import { useAddGlobalEmailMutation } from "@services/configuration/email-templates/email-templates-api";
// import { useSelector } from "react-redux";

export function EmailVerificationSection(): JSX.Element {
  const [toggle, setToggle] = useState<boolean>(false);
  const [email, setEmail] = useState<boolean>(false);
  const theme: any = useTheme();

  const schema = yup.object().shape({
    email: yup.string().required("Email is required"),
  });

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
    },
  });

  const { handleSubmit, reset } = methods;

  // const [postRegisterEmail] = useAddGlobalEmailMutation();

  // const getCompanyId = useSelector(
  //   (state: any) => state?.auth?.user?.companyId
  // );
  const onSubmit = (data) => {
    console.log("data", data);
    // const body = {
    //   email: data.email,
    //   companyId: getCompanyId,
    // };
    // await postRegisterEmail({ body })
    //   .unwrap()
    //   .then(() => {
    //     toast.success("Email Verified Successfully");
    //   })
    //   .catch((error) => {
    //     toast.error(error.data.message);
    //   });
    reset();
  };

  return (
    <>
      <Link href="/configuration/email-templates">
        <Button sx={{ p: 0 }}>Back to Email Templates</Button>
      </Link>
      {/* <Typography variant="h6" sx={{ py: 2 }}>
        Email Verification
      </Typography> */}
      <Box
        sx={{
          maxHeight: { lg: 650 },
          overflowY: "auto",
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "primary.main",
            borderRadius: "6px",
          },
          pr: 2,
        }}
      >
        <Grid container spacing={3}>
          {/* <Grid item xs={12} sm={8}>
            {emailVerificationData.map((item) => (
              <Card sx={{ p: 2, mb: 2 }} key={item.id}>
                <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.5 }}>
                  {item.title}
                </Typography>
                <Typography variant="subtitle2">{item.description}</Typography>
                {item.id === 2 && (
                  <Button
                    onClick={() => {
                      setToggle(!toggle);
                    }}
                    variant="outlined"
                    sx={{ mt: 2 }}
                    endIcon={
                      toggle ? (
                        <KeyboardArrowUpOutlinedIcon />
                      ) : (
                        <KeyboardArrowDownOutlinedIcon />
                      )
                    }
                  >
                    Show verification details
                  </Button>
                )}
              </Card>
            ))}
          </Grid> */}
          {/* <Grid item xs={12} lg={4}>
            <Card sx={{ p: 2, height: { xs: "", sm: "98%" } }}>
              <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                <Box
                  sx={{
                    mb: 1.5,
                    display: { xs: "grid", xl: "flex" },
                    alignItems: "baseline",
                    gap: 1,
                    flexDirection: { xs: "row", lg: "column", xl: "row" },
                  }}
                >
                  <Box sx={{ flex: { xs: 1, lg: 0, xl: 1 } }}>
                    <RHFTextField name="email" placeholder="Enter email" />
                  </Box>
                  <Button variant="contained" type="submit">
                    Register
                  </Button>
                </Box>
                <Button
                  onClick={() => {
                    setEmail(true);
                  }}
                  sx={{
                    width: "100%",
                    py: 0.6,
                    color: "text.secondary",
                    borderColor: theme.palette.neutral[400],
                    "&:hover": {
                      borderColor: theme.palette.neutral[400],
                    },
                  }}
                  variant="outlined"
                  startIcon={<EmailOutlinedIcon />}
                >
                  Email your IT Department
                </Button>
              </FormProvider>
            </Card>
          </Grid> */}
        </Grid>
        <Box sx={{ mt: 2 }}>{toggle && <DepartmentTable />}</Box>
        <Typography variant="h6" sx={{ pt: 2 }}>
          Global Emails
        </Typography>
        <Typography variant="subtitle2" sx={{ my: 2 }}>
          Anybody at your organization can send from these emails. Global emails
          must be verified before they can be used.
        </Typography>
        {/* Global Email Table */}
        <GlobalEmailTable />
      </Box>
      {/* Department Modal */}
      <EmailDepartmentModal email={email} setEmail={setEmail} />
    </>
  );
}
