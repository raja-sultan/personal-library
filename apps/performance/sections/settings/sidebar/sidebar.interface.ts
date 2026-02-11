
export interface SUBLINKS {
    id?: string;
    name?: string;
    link?: string;
    permissionId?: string;
}
export interface SUBDATA {
    id?: string;
    name?: string;
    icon?: React.ReactNode;
    link?: string;
    subLinks?: SUBLINKS[];
    permissionId?: string;
}
export interface SIDEBAR {
    id: string,
    heading: string,
    subData: SUBDATA[]
}

export interface ACCORDION {
    expanded?: string | boolean;
    handleChange: (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => void;
    pathName?: string;
    id?: string | undefined;
    name?: string;
    icon?: React.ReactNode;
    link?: string;
    subLinks?: SUBLINKS[] | undefined;
}

export interface LINKCOMP {
    padding?: string,
    id?: string,
    icon?: React.ReactNode,
    name?: string,
    link?: string,
    className?: string,
    pathName?: string,
    onClick?: () => void
}