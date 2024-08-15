import { Nav, NavLink } from "@/components/Nav";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Nav>
                <NavLink href="/admin">Dashboard</NavLink>
                <NavLink href="/products">Products</NavLink>
                <NavLink href="/users">Customers</NavLink>
                <NavLink href="/sales">Sales</NavLink>
            </Nav>
            <div>{children}</div>
        </>
    );
}
