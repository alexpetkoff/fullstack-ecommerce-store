"use client";

import { ComponentProps } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Nav({ children }: { children: React.ReactNode }) {
    return <nav className="text-[18px] bg-slate-800 flex flex-row justify-center">{children}</nav>;
}

export function NavLink(props: Omit<ComponentProps<typeof Link>, "className">) {
    const pathname = usePathname();
    return (
        <Link
            {...props}
            className={`text-white hover:text-slate-800 hover:bg-white px-4 py-4
            ${pathname === props.href && "bg-white !text-slate-800"}`}
        />
    );
}
