interface ListVersionOneData {
  id: number;
  mainTitle: string;
  category: {
    requestApproval: string;
    createdDate: string;
    status: string;
    buttonApproval: string;
    // buttonCandidateDeclined: string;
  }[];
}
interface ListOfferDetailsButtons {
  id: number;
  // updateButton: string;
  // downloadOfferPacket: string;
  // deleteButton: string;
  startDate: string;
  employmentType: string;
  offerDocuments: string;
}
// interface ListOfferDocumentsData {
//   id: number;
//   uploadButton: string;
//   generateButton: string;
// }

export const VersionOneData: ListVersionOneData[] = [
  {
    id: 1,
    mainTitle: `Version 1`,
    category: [
      {
        requestApproval: "05/06/2023",
        createdDate: "05/06/2023",
        status: "Approved",
        buttonApproval: "Request Approval",
        // buttonCandidateDeclined: "Candidate Declined",
      },
    ],
  },
];

export const OfferDetailsButtons: ListOfferDetailsButtons[] = [
  {
    id: 1,
    // updateButton: "Update Button",
    // downloadOfferPacket: "Download Offer Packet",
    // deleteButton: "Delete",
    startDate: "05/06/2023",
    employmentType: "Contract",
    offerDocuments: "-",
  },
];

// export const OfferDocumentsButton: ListOfferDocumentsData[] = [
//   {
//     id: 1,
//     uploadButton: "Upload",
//     generateButton: "Generate",
//   },
// ];
