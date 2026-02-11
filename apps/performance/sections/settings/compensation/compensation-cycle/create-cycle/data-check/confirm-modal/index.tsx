import { DeleteIcon } from "@assets/icons";
import CustomModal from "@components/custom-modal";
import { Box, List, ListItem, Typography } from "@mui/material";
import type { Theme } from "@mui/material";

interface ConfirmModalProps {
    open: boolean;
    onClose: () => void;
    handleUnderStand?: () => void;
    checkList?: any;
    isLoading: boolean;
}

const listItemData = [
    'Receive promotion raise guidance based on % attainment to their new compensation band',
    'Have their current and updated comp band placement reflected in manager view',
    'Have comp band information displayed in their comp statement'
]

export default function ConfirmModal(props: ConfirmModalProps): JSX.Element {
    const { open, onClose, handleUnderStand, checkList, isLoading } = props;
    return (
        <CustomModal
            title="Please confirm"
            titleProps={{ fontSize: '30px', fontWeight: 600 }}
            headerIcon={<DeleteIcon />}
            open={open}
            onClose={onClose}
            message={false}
            acceptText="I understand"
            isLoading={isLoading}
            acceptButtonProps={{ color: "primary", onClick: handleUnderStand }}
        >
            <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    {checkList?.compensationCycleCount}/{checkList?.totalEmployees} employees are assigned compensation bands.
                </Typography>
                <Typography variant="body2" sx={styles.heading}>
                    Employees must be assigned a compensation band to:
                </Typography>
                <List sx={{ pt: '10px', listStyle: 'disc' }}>
                    {listItemData.map((item) => (
                        <ListItem key={item} sx={styles.listItem}>{item}</ListItem>
                    ))}
                </List>
                <Typography variant="body2" sx={({ palette }) => ({
                    color: palette.mode === "dark" ? palette.neutral[200] : palette.neutral[500], pt: 1.2
                })}>
                    Once you proceed, you will not be able to assign compensation bands to employees in this cycle.
                </Typography>
            </Box>
        </CustomModal>
    );
}

const styles = {
    listItem: (theme: Theme) => ({
        fontSize: '16px',
        fontWeight: 400,
        color: theme.palette.mode === 'dark' ? theme.palette.neutral[200] : theme.palette.neutral[500],
        display: 'list-item',
        listStylePosition: 'inside',
        pl: 0
    }),
    heading: (theme: Theme) => ({ color: theme.palette.mode === "dark" ? theme.palette.neutral[200] : theme.palette.neutral[500], pt: 1.2 })
}