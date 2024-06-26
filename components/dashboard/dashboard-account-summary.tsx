import { Account } from "@/typings/account.typings";
import Link from "next/link";

export default function DashboardAccountSummary({ accounts }: { accounts: Account[] }) {
    return (
        <div className="h-full flex flex-col w-full border rounded-lg bg-gradient-to-t from-transparent to-gray-50">
            <div className="flex items-center px-4 py-5  border-b gap-4 bg-white rounded-t-lg">
                <span>Active</span>
                <div className="border-r h-[20px]"></div>
                <span>Available</span>
            </div>
            <div className="p-4 bg-white">
                <div className="text-3xl ">54 788 750.00kr</div>
                <div>
                    <span>Current cash in </span>
                    <select className=" bg-transparent" name="currency" id="currency" defaultValue="SEK">
                        <option value="SEK">SEK</option>
                    </select>
                </div>
            </div>
            <hr />
            <div className=" p-4 grid grid-cols-3 align-center gap-3 overflow-scroll">
                {accounts &&
                    accounts.map((account: Account) => {
                        return (
                            <Link href={`/account/${account.id}`}>
                                <div key={account.id} className="grid place-items-center text-xs border px-2 py-1 rounded-lg bg-white">
                                    {account.name}
                                </div>
                            </Link>
                        );
                    })}
            </div>
        </div>
    );
}
