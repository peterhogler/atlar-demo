import { Account } from "@/typings/account.typings";
import Dashboard from "../components/dashboard/dashboard";
import HeaderNavigation from "../components/header-navigation";

const USERNAME = "hUfCzFeteKCZgfotD59I";
const PASSWORD = "xmYWTEClhhl9720KE7ccC5FsqRhD8UsTDlpxzJPW2AN34iHE3jl0zgaPcpKfeocQhb_g";

const fetchAtlarAccounts = async (): Promise<Account[]> => {
    try {
        const response = await fetch("https://api.atlar.com/v1/accounts", {
            method: "GET",
            headers: {
                Authorization: `Basic ${Buffer.from(`${USERNAME}:${PASSWORD}`).toString("base64")}`,
            },
        });

        if (!response.ok) {
            throw new Error(`API call failed with status: ${response.status}`);
        }

        const { items } = await response.json();
        return items;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Error occured while trying to fetch accounts: ${error.message}`);
        } else {
            throw new Error("Unknown error has occured while fetching Atlar accounts.");
        }
    }
};

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

export default async function Home() {
    const accounts = await fetchAtlarAccounts();
    const balance = await fetchAtlarAccountBalance();
    return (
        <main className="h-full flex flex-col gap-4">
            <HeaderNavigation title="Dashboard" />
            <Dashboard accounts={accounts} balance={balance} />
        </main>
    );
}
