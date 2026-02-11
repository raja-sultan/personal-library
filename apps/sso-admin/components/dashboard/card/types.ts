import type React from "react";

export interface HeaderProps {
  heading: string;
  activeUsers: number;
  inActiveUsers: number;
  HeadingIcon: React.JSX.Element;
  BgIcon: React.JSX.Element;
  isCompanyCard?: boolean | undefined;
}

export interface FooterProps {
  navigationLink: string;
}

export interface CardsProps extends HeaderProps {
  navigationLink: string;
}
