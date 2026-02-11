import Link from "next/link";
import type { CompanyMarketingProps } from "./types";

export const CompanyMarketingArray: CompanyMarketingProps[] = [
  {
    id: 1,
    srNo: "1.",
    title: "Job Board on your website",
    description: (
      <>
        Click to <Link href="/test"> Here </Link> set up your job board (without
        having to consult your IT department). Once you&apos;ve finished that, you
        can easily set up job posts for each of your open jobs and embed those
        applications in your job ads.
      </>
    ),
  },
  {
    id: 2,
    srNo: "2.",
    title: "Customer newsletter",
    description:
      "If you have a large customer pool, it can be a great source of candidates. Customers are familiar with and knowledgeable about your products and services, and therefore may be more excited to work for your company than other job-seekers. Since you already communicate with your customers, it's a snap to include a link to open jobs in the footer of your newsletters and emails.",
  },
  {
    id: 3,
    srNo: "3.",
    title: "Email signatures",
    description:
      "Think about how many people across how many organizations all of your employees talk to on a daily basis—that's a big pool of potential candidates. Get your team to add a link to open jobs in their email signature and you're likely to see a surge in applications from people who are already familiar with your company. Win-win.",
  },
  {
    id: 4,
    srNo: "4.",
    title: "Your company's social media presence",
    description:
      "In addition to your own personal social media network, be sure to leverage your company’s social presence. Consider your organization's Facebook page, LinkedIn page, Twitter feed, and even making a Pinterest board. These can all be important sources of candidates who are already enthusiastic about your brand.",
  },
];
