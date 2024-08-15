export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Nav></Nav>
            <div>{children}</div>
        </>
    );
}
