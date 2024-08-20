import Link from "next/link";

export function Button({ children, ...props }) {
    return (
        <button className="bg-slate-800 text-white px-4 py-2 rounded-md hover:bg-slate-700" {...props}>
            <Link href={props.href}>{children}</Link>
        </button>
    );
}
