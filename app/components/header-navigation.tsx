import { MdOutlineAddCard } from "react-icons/md";

export default function HeaderNavigation({ title }: { title: string }) {
    return (
        <nav className="relative flex justify-between items-center px-4 py-3 border-y border rounded-lg">
            <div className="font-bold text-lg inline-flex items-center gap-2 ">
                <span>{title}</span>
            </div>
            <button className="inline-flex items-center gap-2 bg-slate-900 text-white px-3 py-2 rounded-md font-medium">
                <MdOutlineAddCard size={19} /> Create New
            </button>
        </nav>
    );
}
