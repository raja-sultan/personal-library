export interface CustomKeyResultsProps {
    id?: string;
    title?: string;
    currency?: string;
    percentage?: string;
    binary?: string;
    Usd?: string;
    number?: string;
    progress?: number;
    handleCheckIn?: () => void;
    onEditClick?: () => void;
    onDeleteClick?: () => void;
    query?:any,
    startValue:number,
    targetValue:number,
    owner?:any
}
