import { Box, Typography } from "@mui/material";
import { ClockIcon } from 'assets/icons/clock-icon';
import { EmailIcon } from "@assets/icons/email-icon";
import { renderUserImage } from "@root/utils/render-user-image";
import { PhoneNumberIcon } from 'assets/icons/phone-number-icon';

interface CareerPrincipal {
    id: string;
    name: string;
    description: string;
    level?: any
}

export const overviewDetailData = [
    {
        _id: '1',
        heading: 'Personal Info',
        info: [
            { _id: '2', icon: <EmailIcon />, title: 'ronaldrichards@orcalo.co.uk' },
            { _id: '3', icon: <PhoneNumberIcon />, title: '+44 7700 900077' },
            { _id: '4', icon: <ClockIcon />, title: '8:25 Am (London)' },
        ],
        divider: true,
    },
    {
        _id: '2',
        heading: 'Bio',
        desc: 'My passion lies in creating intuitive, user-centered designs that provide exceptional user experiences. I have wealth of experience in designing for various platforms, including web, mobile, and desktop applications. My designs are not only visually appealing but also highly functional and easy to use.',
        divider: true,
    },
    {
        _id: '3',
        heading: 'Department',
        desc: 'Finance',
        mb: '24px'
    },
    {
        _id: '4',
        heading: 'Direct Reports',
        desc: <Box display='flex' alignItems='center' gap='5px'>
            {renderUserImage({ profileImage: '', firstName: 'R', lastName: 'R' })}
            <Typography variant="body2" color='neutral.500'>Ronald Richards</Typography>
        </Box>,
        divider: true,
    },
    {
        _id: '5',
        heading: 'Start Date',
        desc: 'Jan 01, 2023',
        mb: '24px'
    },
    {
        _id: '6',
        heading: 'Gender',
        desc: 'Male'
    },
]


export const careerAreasPrincipalData: CareerPrincipal[] = [
    {
        id: '1',
        name: "Design System",
        description: "Learn how to create layouts that adapt gracefully to various screen sizes and orientations, ensuring a consistent user experience across different devices.",
 
    },
    {
        id: '2',
        name: "Wireframes",
        description: "Learn how to create layouts that adapt gracefully to various screen sizes and orientations, ensuring a consistent user experience across different devices.",
        level: "Completed",
    },
    {
        id: '3',
        name: "Prototyping",
        description: "Learn how to create layouts that adapt gracefully to various screen sizes and orientations, ensuring a consistent user experience across different devices.",
 
    },
]