"use client";

type Variants = "success" | "warning" | "danger" | "started" | "custom";

export function statusColorHandler(variant: Variants): any {
  switch (variant) {
    case "success":
      return { bgcolor: "#D1FADF", color: "#05603A" };
    case "warning":
      return { bgcolor: "#FFF4DE", color: "#FFB016" };
    case "danger":
      return { bgcolor: "#FEE4E2", color: "#912018" };
    case "started":
      return { bgcolor: "#EBE9FE", color: "#4A1FB8" };
    case "custom":
      return { bgcolor: "#F2F4F7", color: "#101828" };
    default:
      return { bgcolor: "#EBE9FE", color: "#4A1FB8" };
  }
}
