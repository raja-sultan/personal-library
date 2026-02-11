import React, { useState } from 'react';
import {
    Box,
    Button,
    FormLabel,
    TextField,
    Typography,
} from '@mui/material';
import { Add } from '@mui/icons-material'
import CustomModal from '@components/custom-modal';
import { EditIcon } from '@assets/icons/edit-icon';
import { DeleteIconCurrentColor } from '@assets/icons/delete-icon-current-color';
import { DragDropIcon } from '@assets/icons/drag-and-drop-icon';
import { useAddCompanyLocationMutation, useDeleteCompanyLocationMutation, useGetCompanyLocationsQuery, useUpdateCompanyLocationMutation } from '@services/settings/company/locations/company-locations';
import toast from 'react-hot-toast';

interface Location {
    _id: string;
    address: string;
}

export function CompanyLocation(): JSX.Element {
    const [openCustomModal, setOpenCustomModal] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [selectedLocation, setSelectedLocation] = useState<string>('');
    const [editedLocation, setEditedLocation] = useState<string>('');
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [locationId, setLocationId] = useState<string>("");


    const { data: companyLocations } = useGetCompanyLocationsQuery({});

    const [addCompanyLocation] = useAddCompanyLocationMutation({})

    const [updateCompanyLocation] = useUpdateCompanyLocationMutation({})

    const [deleteCompanyLocation] = useDeleteCompanyLocationMutation({})

    const handleOpenDeleteModal = (): void => {
        setOpenDeleteModal(!openDeleteModal);
    };

    const handleOpenCustomModal = (id: string, location: string): void => {
        setSelectedLocation(location);
        setEditedLocation(location);
        setLocationId(id)
        if (location) {
            setModalTitle('Edit Company Location');
        } else {
            setModalTitle('Add Company Location');
        }
        setOpenCustomModal(true);
    };

    const handleAcceptModal = async (): Promise<void> => {
        const payload = { id: locationId, address: editedLocation }
        if (selectedLocation) {
            try {
                await updateCompanyLocation(payload).unwrap();
                toast.success("Location updated successfully")
            }
            catch (error) {
                toast.error(error?.data?.message)
            }
        } else {
            try {
                await addCompanyLocation(payload).unwrap();
                toast.success("Location added successfully")
            }
            catch (error) {
                toast.error(error?.data?.message)
            }
        }
        setOpenCustomModal(false);
        setSelectedLocation('');
    }
    const handleDeleteLocation = async (): Promise<void> => {
        const payload = { id: locationId }
        try {
            await deleteCompanyLocation(payload).unwrap();
            toast.success("Location deleted successfully")
        }
        catch (error) {
            toast.error(error?.data?.message)
        }
        setOpenDeleteModal(false);
    }

    return (
        <Box>
            <FormLabel>Company Location</FormLabel>
            <br />
            <Button
                sx={{ mt: '0.6rem' }}
                onClick={() => { handleOpenCustomModal('', '') }}
                variant="contained"
            >
                <Add sx={{ fontSize: '18px', mr: 1 }} />
                {companyLocations?.data?.length > 0
                    ? 'Add another company location'
                    : 'Add company location'}
            </Button>
            <Box>
                {companyLocations?.data?.map(({ _id, address }: Location) => (
                    <Box
                        key={_id}
                        display="flex"
                        alignItems="center"
                        gap={2}
                        width="100%"
                        mt="1.6rem"
                        sx={{ border: '1px solid #EAECF0', borderRadius: '8px' }}
                    >
                        <Box p="2.4rem 1.6rem" pr={0}>
                            <DragDropIcon />
                        </Box>
                        <Typography
                            flex={1}
                            minHeight="80px"
                            borderLeft="1px solid #EAECF0"
                            py="2.4rem"
                            pl="1.6rem"
                            variant="subtitle1"
                            fontWeight={400}
                            style={{ wordBreak: "break-all" }}
                        >
                            {address}
                        </Typography>
                        <Box pr="1.6rem" display="flex" gap="1.5rem">
                            <EditIcon sx={{ cursor: "pointer" }} onClick={() => { handleOpenCustomModal(_id, address) }} />
                            {/* <DeleteIconCurrentColor sx={{ cursor: "pointer" }} onClick={() => { handleOpenDeleteModal(); setLocationId(id) }} /> */}
                            <DeleteIconCurrentColor sx={{ cursor: "pointer" }} onClick={() => { handleOpenDeleteModal(); setLocationId(_id) }} />
                        </Box>
                    </Box>
                ))}
            </Box>
            {openCustomModal && <CustomModal
                open={openCustomModal}
                onClose={() => {
                    setOpenCustomModal(false);
                    setSelectedLocation('');
                }}
                message={false}
                title={modalTitle}
                headerIcon=""
                acceptText={selectedLocation ? 'Save' : 'Add'}
                onAccept={handleAcceptModal}
                acceptButtonProps={{ color: 'primary', disabled: !editedLocation || editedLocation?.length > 300 }}
            >
                <Box>
                    <Typography variant="body2" mb="0.6rem" fontWeight={600}>
                        Address
                    </Typography>
                    <TextField
                        variant="outlined"
                        fullWidth
                        placeholder="Enter company location"
                        value={editedLocation}
                        onChange={(e) => { setEditedLocation(e.target.value) }}
                    />
                    {editedLocation?.length > 300 && <Typography variant="subtitle2" color="red" mt={1}>Location should be maximum 300 characters.</Typography>}
                </Box>
            </CustomModal>}

            {openDeleteModal && <CustomModal
                open={openDeleteModal}
                onClose={handleOpenDeleteModal}
                onAccept={handleDeleteLocation}
            />}
        </Box>
    );
}
