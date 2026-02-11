'use client'
import { CustomHeaderTableTabs } from "@components/custom-header-table-tabs";
import CustomModal from "@components/custom-modal";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { useOneOnOne } from "./use-one-on-one";
import { DownloadCsvIcon } from "@assets/icons/download-csv-icon";
import { CustomPopover } from "@components/custom-popover";
import CustomTimeRange from "@components/custom-time-range";
import { RenderUserInfo } from "../render-user-detail";
import { renderUserImage } from "@root/utils/render-user-image";
import dayjs from 'dayjs';
import { awsBaseUrl } from "@root/config";
import { PERMISSIONS } from "@enums/permissions";
import { PermissionProtected } from "@guards/permission-protected";

const { PERMISSION } = PERMISSIONS.PERFORMANCE.SETTING._1_ON_1S._1_ON_1_LOGS;

export function OneOnOneTable(): JSX.Element {

	const {
		handleDownloadModal,
		openDownloadModal,
		handleDownloadCSV,
		tableData,
		handleViewDetailModal,
		openViewDetailModal,
		handleStatusChange,
		handleSearch,
		handleTimeRangeChange,
		onOnOneData
	} = useOneOnOne();

	const theme = useTheme()
	return (
		<>
			<CustomHeaderTableTabs
				table={{
					secondaryHeader: true,
					secondaryHeaderProps: {
						actions: <>
							<PermissionProtected permission={PERMISSION.DOWNLOAD}>
								<Button variant="outlined"
									onClick={handleDownloadModal}
									startIcon={<DownloadCsvIcon sx={{ color: theme.palette.primary.main }} />}>
									Download CSV
								</Button>
							</PermissionProtected>
							<CustomPopover
								btnText="Status"
								options={['All', 'Ended', 'Current', 'Upcoming']}
								handleChange={handleStatusChange}
							/>
							<CustomTimeRange
								key='1-on-1-logs'
								setStartAndEndDate={handleTimeRangeChange}
							/>
						</>,
						handleSearch,
					},
					tableProps: tableData
				}}
			/>
			{openDownloadModal && <CustomModal
				open={openDownloadModal}
				onClose={handleDownloadModal}
				headerIcon={false}
				title='Download'
				titleProps={{ fontSize: "30px", fontWeight: 600 }}
				message={
					<>
						Downloads include all the available data columns and rows from
						<br />
						your search, even if they’re not in this view.
						<br />
						<br />
						This may take several minutes.
					</>
				}
				acceptText="Download"
				acceptButtonProps={{ color: 'primary', onClick: handleDownloadCSV }}
			/>}

			<CustomModal
				open={openViewDetailModal}
				onClose={handleViewDetailModal}
				headerIcon={false}
				title={<Typography variant='h5' fontWeight='600' color='neutral.900'>1-on-1s log Details</Typography>}
				message={false}
				hideFooter
			>
				{/* <Box sx={{
					height: "600px",
					overflowY: "auto",
					scrollbarWidth: "thin",
					scrollbarColor: "#CACACA transparent",
					width: "100%",
					"&::-webkit-scrollbar": {
						width: "2px !important",
					},
					"&::-webkit-scrollbar-thumb": {
						backgroundColor: "#CACACA",
						borderRadius: "10px",
					},

					"&::-webkit-scrollbar-track": {
						backgroundColor: "transparent",
					},
				}}> */}
				<Box display='flex' alignItems='center' mb='34px'>
					<RenderUserInfo
						firstName={onOnOneData?.data?.organizer?.firstName ?? 'N/A'}
						lastName={onOnOneData?.data?.organizer?.lastName ?? 'N/A'}
						profileImage={onOnOneData?.data?.organizer?.profileImage ? awsBaseUrl + onOnOneData?.data?.organizer?.profileImage : 'N/A'}
						height={48}
						width={48}
						userRole={onOnOneData?.data?.organizer?.employeeTitle ?? 'N/A'}
					/>
					<RenderUserInfo
						firstName={onOnOneData?.data?.attendee?.firstName ?? 'N/A'}
						lastName={onOnOneData?.data?.attendee?.lastName ?? 'N/A'}
						profileImage={onOnOneData?.data?.attendee?.profileImage ? awsBaseUrl + onOnOneData?.data?.attendee?.profileImage : 'N/A'}
						height={48}
						width={48}
						userRole={onOnOneData?.data?.attendee?.employeeTitle ?? 'N/A'}
					/>
				</Box>
				<Box display='flex' alignItems='start' gap={1}>
					<Box flex={1} sx={{ width: "260px", whiteSpace: "normal", wordBreak: "break-all" }}>
						<Typography variant='subtitle1' fontWeight='600' color='neutral.900'>Meeting Agenda</Typography>
						{/* {onOnOneData?.data?.oneOnOneDetails?.map((item) => {
								return (
									<Typography mt='14px' variant='subtitle1' fontWeight='400' color='neutral.500' key={item?.userId}
										sx={{ whiteSpace: "pre-line" }}>{item?.text}</Typography>
								)
							})} */}
						<Typography mt='14px' variant='subtitle1' fontWeight='400' color='neutral.500'
							sx={{ whiteSpace: "pre-line" }}>{onOnOneData?.data?.oneOnOneDetails?.title ?? "N/A"}</Typography>
					</Box>
					<Box flex={1}>
						<Typography variant='subtitle1' fontWeight='600' color='neutral.900'>Date & Time</Typography>
						<Typography mt='14px' variant='subtitle1' fontWeight='400' color='neutral.500'>{onOnOneData?.data?.date ? dayjs(onOnOneData?.data?.date).format('MMM D, YYYY @ h:mm A') : 'N/A'}</Typography>
					</Box>
				</Box>
				<Typography mt='24px' mb='14px' variant='subtitle1' fontWeight='600' color='neutral.900'>Action Items</Typography>
				<Box mb='4px'>
					{[...(onOnOneData?.data?.actionItems ?? []), ...(onOnOneData?.data?.newActionItems ?? [])]?.map((item) => {
						return (
							<Box mb='24px' key={item?._id} display='flex' alignItems='center' justifyContent="space-evenly" gap={5}>
								<Typography flex={1} variant='subtitle1' fontWeight='400' color='neutral.500'>{item?.text}</Typography>
								<Box>
									{renderUserImage({
										profileImage: item?.user?.profileImage ? awsBaseUrl + item?.user?.profileImage : "N/A",
										firstName: item?.user?.firstName ? item?.user?.firstName : "N/A",
										lastName: item?.user?.lastName ? item?.user?.lastName : "N/A",
										height: 32, width: 32
									})}
								</Box>
							</Box>
						);
					})}


				</Box>
				{/* </Box> */}
			</CustomModal>
		</>
	)
}

