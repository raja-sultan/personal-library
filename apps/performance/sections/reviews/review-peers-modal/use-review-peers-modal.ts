import { useGetProfileQuery } from '@services/profile/profile-api';
import {
  useGetNominateUserQuery,
  usePutNominateUserMutation,
} from "@services/user-review/user-review-api";
import toast from "react-hot-toast";
interface UseReviewPeersTypes {
  HandlerApproved: (reviewCycleId: string, user: string) => void;
  HandlerReject: (reviewCycleId: string, user: string) => void;
  nominateUser: any;
  loginUser:any;
}
export default function useReviewPeersModal({ tableId }): UseReviewPeersTypes {
  const { data: nominateUser } = useGetNominateUserQuery({
    reviewCycleId: tableId,
    reviewType: "peer_review",
  });

  const { data: loginUser } = useGetProfileQuery({});

  const [PutNominateUser] = usePutNominateUserMutation();

  const HandlerApproved = async (reviewCycleId, reviewee): Promise<void> => {
    const payload = {
      reviewCycleId,
      reviewee,
      reviewType: "peer_review",
      peerStatus: "approve",
    };

    try {
      await PutNominateUser(payload).unwrap();
      toast.success("Peers Nomination Approved successfully");
    } catch (error) {
      toast.error(error?.data?.message);
    }

    // Rest of your logic...
  };
  const HandlerReject = async (reviewCycleId, reviewee): Promise<void> => {
    const payload = {
      reviewCycleId,
      reviewee,
      reviewType: "peer_review",
      peerStatus: "reject",
    };

    try {
      await PutNominateUser(payload).unwrap();
      toast.success("Peers Nomination Rejected successfully");
    } catch (error) {
      toast.error(error?.data?.message);
    }

    // Rest of your logic...
  };

  return { nominateUser, HandlerApproved, HandlerReject,loginUser };
}
