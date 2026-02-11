import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useGetPeerSelectionQuery, usePostNominateUserMutation } from "@services/user-review/user-review-api";
import toast from "react-hot-toast";

interface UseSelectPeersTypes {
  methods: object;
  handleSubmit: any;
  onSubmit: any;
  peerSelectionData: any;
}

export default function useSelectPeersModal({
  tableId,open, setOpen,
}): UseSelectPeersTypes {
  const [postNominateUser] = usePostNominateUserMutation({});
  const onSubmit = async (formData: any): Promise<void> => {
    const reviewee = formData?.selectPeers?.map((obj) => obj.id);
    const payload = {
      reviewCycleId: tableId,
      reviewType: "peer_review",
      reviewee,
    };
    try {
      await postNominateUser(payload).unwrap();
      toast.success("Peers Nominated for review");
    } 
    catch (error) {
      toast.error(error?.data?.message);
    }
    setOpen(!open);
  };

  const { data: peerSelection } = useGetPeerSelectionQuery({});
  const peerSelectionData =
  peerSelection?.data?.map(
      ({  firstName,lastName ,_id,}: { firstName: string;lastName: string; _id: string}) => ({
        id:_id,
        name:`${firstName} ${lastName}`,
      })
    ) ?? [];
    // peerSelection?.data?.map(
    //   ({ firstName,lastName, _id }: { firstName: string;lastName: string;   _id: string }) => ({
    //     id: _id,
    //     name: `${firstName} ${lastName}`,
    //   })
    // ) ?? [];
  const FormSchema = Yup.object().shape({});

  const methods = useForm({
    resolver: yupResolver(FormSchema),
    defaultValues: {},
  });

  const { handleSubmit } = methods;

  return {
    methods,
    peerSelectionData,
    handleSubmit,
    onSubmit,
  };
}
