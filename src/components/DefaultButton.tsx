import Link from "next/link";

export function Button({ children, ...props }: { children: React.ReactNode; href: string }) {
    return (
        <button className="bg-slate-800 text-white px-4 py-2 rounded-md hover:bg-slate-600" {...props}>
            <Link href={props.href}>{children}</Link>
        </button>
    );
}
