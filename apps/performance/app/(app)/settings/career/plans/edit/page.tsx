'use client'
import { CreatePlan } from "@sections/settings/career/plans/create";
import { useSearchParams } from "next/navigation";

export default function Page(): JSX.Element {

    const id = useSearchParams().get('id');

    return (
        <CreatePlan id={id} type='edit' />
    )
}