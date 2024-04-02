"use client";
import { usePathname } from "next/navigation";

import { MdHome, MdOutlinePayments, MdOutlineSettings } from "react-icons/md";

import Link from "next/link";

export default function SideNavigation() {
    const pathname = usePathname();
    return (
        <aside className="hidden xl:flex flex-col min-w-[230px] h-full border  rounded-lg font-bold">
            <div className="text-xl py-5 px-4 border-b">Atlar</div>
            <div className="flex flex-col h-full  px-4 py-4  gap-5 ">
                <hr />
                <Link className={`inline-flex items-center gap-2 ${pathname !== "/" && "text-gray-500"}`} href="/">
                    <MdHome size={23} /> Dashboard
                </Link>
                <hr />
                <Link className={`inline-flex items-center gap-2 ${pathname !== "/transactions" && "text-gray-500"}`} href="/transactions">
                    <MdOutlinePayments size={23} />
                    Transactions
                </Link>
                <hr />
            </div>
            <div className="mt-auto pt-6 px-4 pb-3 space-y-5">
                <hr />
                <Link className="inline-flex items-center gap-2" href="/">
                    <MdOutlineSettings size={23} />
                    Settings
                </Link>
            </div>
        </aside>
    );
}
