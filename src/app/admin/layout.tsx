import { Nav, NavLink } from "@/components/Nav";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
    title: "Ecommerce Store - Admin panel",
    description: "Created for exercise purposes - NextJS, TailwindCSS, Stripe, Prisma, and more!",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Nav>
                <NavLink href="/admin">Dashboard</NavLink>
                <NavLink href="/admin/products">Products</NavLink>
                <NavLink href="/admin/users">Customers</NavLink>
                <NavLink href="/admin/orders">Sales</NavLink>
            </Nav>
            <div className="container my-6">{children}</div>
        </>
    );
}
