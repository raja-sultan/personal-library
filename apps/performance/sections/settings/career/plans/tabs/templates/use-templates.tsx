import { useState } from "react";
import { useGetCareerPlansQuery } from "@services/settings/career/plans/plans-api";

interface ReturnType {
    templateId: string | null;
    handleTemplateModalOpen: (id: string | null) => void;
    handleSearch: (val: string) => void;
    templateData: any;
    isLoading: any;
}

interface Filter {
    search?: string;
    limit: number;
    offset: number;
    listingType: string;
    status?: string;
}

export function useTemplate(): ReturnType {
    const [templateId, setTemplateId] = useState<string | null>(null);

    const filterValues = { limit: 17, offset: 0, listingType: 'templates' };
    const [filter, setFilter] = useState<Filter>(filterValues);

    const { data: templateData, isLoading } = useGetCareerPlansQuery(filter);

    function handleTemplateModalOpen(id: string | null): void {
        setTemplateId(id);
    }

    function handleSearch(): void {
        setFilter({ ...filter });
    }

    return {
        templateId,
        handleTemplateModalOpen,
        handleSearch,
        templateData,
        isLoading,
    }
}