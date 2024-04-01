import { MdArrowBack } from "react-icons/md";
import AccountDetailsDashboard from "@/app/components/account/account-details";
import HeaderNavigation from "@/app/components/header-navigation";
import Link from "next/link";

const USERNAME = "hUfCzFeteKCZgfotD59I";
const PASSWORD = "xmYWTEClhhl9720KE7ccC5FsqRhD8UsTDlpxzJPW2AN34iHE3jl0zgaPcpKfeocQhb_g";

const fetchAtlarAccountDetails = async (accountId: string) => {
    const response = await fetch(`https://api.atlar.com/v1beta/accounts/${accountId}/balances`, {
        method: "GET",
        headers: {
            Authorization: `Basic ${Buffer.from(`${USERNAME}:${PASSWORD}`).toString("base64")}`,
        },
    });

    if (!response.ok) {
        throw new Error(`Unable to fetch from API status: ${response.status}`);
    }

    const { items } = await response.json();
    return items;
};

export default async function AccountDetails({ params }: { params: { accountId: string } }) {
    const { accountId } = params;
    const balances = await fetchAtlarAccountDetails(accountId as string);

    return (
        <main className="h-full flex flex-col gap-4">
            <HeaderNavigation title="Account Details" />
            <Link className="font-medium  inline-flex gap-2" href="/">
                <MdArrowBack size={23} />
                Back to dashboard
            </Link>
            <AccountDetailsDashboard balances={balances} accountId={accountId} />
        </main>
    );
}
