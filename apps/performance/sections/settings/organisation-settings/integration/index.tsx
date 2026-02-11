"use client";

import { SearchIcon } from "@assets/icons";
import CustomCard from "@components/custom-card";
import { TextField, Grid, Typography } from "@mui/material";
import { ThirdPartyCard } from "../../../../components/third-party-card";
import { integrationData } from "./integration.data";
import { UseIntegration } from "./use-integration";
import Image from "next/image";
import { ConnectModal } from "./modals/connect-modal";
import { DetailModal } from "./modals/detail-modal";
import { RequestModal } from "./modals/request-modal";

export function Integration(): JSX.Element {
  const {
    handleStatusChange = () => {},
    connectModal = false,
    handleConnectModal = () => {},
    companyName = false,
    handleDetailModal = () => {},
    detailModal = false,
    handleRequest = () => {},
    requestModal = false,
  } = UseIntegration();

  return (
    <>
      <CustomCard
        subHeader
        cardSubHeader={{
          title: "Integration",
          description:
            "Set up to integrate with your team’s communications to stay connected",
        }}
      >
        <TextField
          name="integrationSearch"
          variant="outlined"
          placeholder="Search"
          size="small"
          sx={{ mb: "24px" }}
          InputProps={{
            sx: { minWidth: "320px",height:"44px" },
            startAdornment: <SearchIcon />,
          }}
          inputProps={{ style: { paddingLeft: "10px" } }}
        />
        <Grid container spacing={2}>
          {integrationData.map((obj) => {
            const {
              id,
              icon: { src },
              title,
              description,
              status,
            } = obj;
            return (
              <Grid item lg={3} md={4} sm={6} xs={12} key={id}>
                <ThirdPartyCard
                  icon={<Image src={src} alt="icon" height={32} width={32} />}
                  title={title}
                  description={description}
                  status={status}
                  onClick={() => {
                    handleStatusChange(obj);
                  }}
                />
              </Grid>
            );
          })}
        </Grid>
      </CustomCard>

      {/* connect modal */}
      {connectModal && (
        <ConnectModal
          key="connect_modal"
          open={connectModal}
          onClose={handleConnectModal}
          title={`Sync with ${companyName}`}
          handleAcceptClick={handleDetailModal}
        >
          <Typography variant="body2">
            Before connecting, please make sure the information in WhatsApp is
            up to date. We will override all existing names, titles, and
            reporting relationships with what is in WhatsApp.
            <br /> <br />
            We will also create an account for all active full-time employees
            that aren’t already in Personnel Library. Once you’re ready, go to
            the Invited People page to send invite emails to those new users.
          </Typography>
        </ConnectModal>
      )}

      {/* detail modal */}
      {detailModal && (
        <DetailModal
          key="detail_modal"
          open={detailModal}
          onClose={handleDetailModal}
          handleSubmitClick={() => {
            handleDetailModal();
            handleConnectModal();
          }}
        />
      )}

      {/* request modal */}
      {requestModal && (
        <RequestModal
          open={requestModal}
          onClose={handleRequest}
          handleSubmitClick={() => {
            handleRequest();
          }}
        />
      )}
    </>
  );
}
