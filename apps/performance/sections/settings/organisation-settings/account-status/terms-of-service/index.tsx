'use client'

import CustomCard from "@components/custom-card";
import { useRouter } from "next/navigation";
import { Typography, Box } from '@mui/material';
import { termsServicesData } from "./terms-services.data";

export function TermsOfServices(): JSX.Element {

    const router = useRouter()

    return (
        <CustomCard
            header
            cardHeader={{
                divider: true,
                title: 'Terms of Service',
                onBack: () => {
                    router.push('/settings/account-status')
                }
            }}
        >
            <Typography variant="h6" mb={2}>Last updated: May 5, 2023</Typography>
            <Typography variant="subtitle2">
                Welcome to Personal Library. By subscribing to the Service (defined below), or by checking or selecting an “I agree” or similarly worded box or button indicating your acceptance of these Terms of Service, you (“Customer”) agree to be bound by these Terms. If you are accepting these Terms on behalf of a company or other entity, you represent that you have the authority to, and do hereby, bind such entity by these Terms, and references to “Customer,” “you” or “your” will refer to such entity. If you do not have such authority, or if you do not agree with these Terms, you must not accept these Terms and neither you nor such entity may use the Service. In these Terms of Service (the “Terms”), references to “Company,” “we,” “us,” and “our” refer to Degree, Inc., a Delaware corporation (d/b/a Personal Library), and references to the “Service” refer to the online service(s) subscribed to by you and made available by us, which may include premium features or other related services, and including any offline components and any content, software, data and information provided by us or our licensors through or in connection with the foregoing. We and you are each sometimes referred to herein as a “party.”
            </Typography>
            {termsServicesData.map(({ title, subPoints, desc }) => (
                <Box key={title}>
                    <Typography variant="body1" fontWeight={600} my={2}>{title}</Typography>
                    {subPoints ? subPoints?.map((point) => (
                        <Typography key={point.title} variant="subtitle2" fontWeight={500} my={1}>
                            <strong>{point.title}</strong>&nbsp;
                            {point.desc}
                        </Typography>
                    )) :
                        <Typography>{desc}</Typography>
                    }
                </Box>
            ))}
        </CustomCard>
    )
}