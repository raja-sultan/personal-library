"use client"
import React from 'react'
import { CreateTemplate } from '@sections/settings/reviews/templates/create-template'
import { useSearchParams } from "next/navigation";

function Templates(): JSX.Element {
    const param = useSearchParams();
    const id: string = param.get("id") || "";

    return (
        <CreateTemplate templateId={id} title="Edit Template"/>
    )
}

export default Templates