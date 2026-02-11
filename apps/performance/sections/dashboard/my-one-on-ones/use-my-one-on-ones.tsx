import { useGetOneOnOneQuery } from "@services/dashboard/dashboard-api";
import { useRouter } from "next/navigation";

interface IUseReviews {
  data: any;
  isLoading: boolean;
  handleCreateOneOnOne: () => void;
}

export function useReviews(): IUseReviews {
  const { data, isLoading } = useGetOneOnOneQuery({});

  const router = useRouter();

  function handleCreateOneOnOne(): void {
    router.push('/one-on-ones');
  }

  return {
    data,
    isLoading,
    handleCreateOneOnOne
  };
}
