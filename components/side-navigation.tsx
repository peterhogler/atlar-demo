"use client";
import { usePathname } from "next/navigation";

import { MdHome, MdOutlinePayments, MdOutlineSettings } from "react-icons/md";

import Link from "next/link";

export default function SideNavigation() {
    const pathname = usePathname();
    return (
        <aside className="hidden xl:flex flex-col min-w-[230px] h-full border  rounded-lg">
            <div className="text-lg py-5 px-4 border-b">Atlar</div>
            <div className="flex flex-col h-full py-2 ">
                <Link className={`inline-flex items-center gap-2 px-4 py-4  ${pathname !== "/" && "text-gray-500"}`} href="/">
                    <MdHome size={23} /> Dashboard
                </Link>
                <Link className={`inline-flex items-center gap-2 px-4 py-4  ${pathname !== "/transactions" && "text-gray-500"}`} href="/transactions">
                    <MdOutlinePayments size={23} />
                    Transactions
                </Link>
            </div>
            <hr />
            <div className="mt-auto ">
                <Link className="inline-flex items-center gap-2 px-4 py-4" href="/">
                    <MdOutlineSettings size={23} />
                    Settings
                </Link>
            </div>
        </aside>
    );
}
