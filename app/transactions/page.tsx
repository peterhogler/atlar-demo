import AccountDetailsDashboard from "../components/account/account-details";
import HeaderNavigation from "../components/header-navigation";
import Transactions from "../components/transactions/transactions";

const USERNAME = "hUfCzFeteKCZgfotD59I";
const PASSWORD = "xmYWTEClhhl9720KE7ccC5FsqRhD8UsTDlpxzJPW2AN34iHE3jl0zgaPcpKfeocQhb_g";

const fetchAtlarAccountBalance = async () => {
    const response = await fetch(`https://api.atlar.com/v1/transactions`, {
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

export default async function Page() {
    const transactions = await fetchAtlarAccountBalance();
    return (
        <main className="h-full flex flex-col gap-4">
            <HeaderNavigation title="Account Transactions" />
            <Transactions transactions={transactions} />
        </main>
    );
}
