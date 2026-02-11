import type { StaticImageData } from "next/image";

export interface profileDataProps {
  profileReviewsData: reviewData[];
  profileGoalsData: goalData[];
  profileGrowthAreas: growthArea[];
  information: {
    personalInfo: personalInfo[];
    desc: string;
    department: string;
    directReports: directReportsProps;
    startDate: string;
    gender: string;
  }
}

export interface reviewData {
  id: number;
  title: string;
  status: string;
  buttonText: string;
}

export interface goalData {
  id: number;
  title: string;
  status: string;
  percentage: string;
}

export interface growthArea {
  id: number;
  title: string;
  status?: string;
  desc: string;
}

export interface personalInfo {
  id: number;
  icon: React.ReactNode; 
  title: string;
}

export interface directReportsProps  {
  img: StaticImageData;
  name: string;
}