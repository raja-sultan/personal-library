export interface LaunchPraiseWallTypes {
  type: string;
  autoplay: boolean;
  arrows: boolean;
  rewind: boolean;
  gap: string;
  interval: number;
  pagination: boolean;
  mouse: boolean;
  drag: boolean;
}
export interface LaunchPraiseWallProps {
  viewOnly?: boolean;
  startDate?: string;
  endDate?: string;
  slidesCount?: number;
  isRedirect?: boolean;
}

