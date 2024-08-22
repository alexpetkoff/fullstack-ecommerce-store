import { PageHeading } from "@/components/PageHeading";
import { Button } from "@/components/DefaultButton";
import { formatCurrency } from "@/lib/formatters";
import Image from "next/image";

export default function ProductsPage() {
    return (
        <div className="mt-10 flex flex-col items-center gap-4">
            <PageHeading>Products</PageHeading>
            <Button href="/admin/products/new">Add Product</Button>
            <ProductsTable />
        </div>
    );
}

async function ProductsTable() {
    const products = await prisma?.product.findMany({
        select: {
            id: true,
            name: true,
            priceInCents: true,
            isAvailableForPurchase: true,
            _count: { select: { orders: true } },
            imagePath: true,
        },
        orderBy: { name: "asc" },
    });

    if (products?.length === 0) return <p>No products found!</p>;

    return (
        <table className="w-1/2 text-center">
            <thead>
                <tr>
                    <th className="w-0">
                        <span className="sr-only">Available for purchase</span>
                    </th>
                    <th className="border-[1px] border-zinc-200 p-2">Name</th>
                    <th className="border-[1px] border-zinc-200 p-2">Price</th>
                    <th className="border-[1px] border-zinc-200 p-2">Orders</th>
                    <th className="w-0">
                        <span className="sr-only">Actions</span>
                    </th>
                </tr>
            </thead>
            <tbody>
                {products?.map((product) => (
                    <tr key={product.id}>
                        <td className="border-[1px] border-zinc-200 p-2">{product.isAvailableForPurchase ? <AvailableIcon /> : "No"}</td>
                        <td className="border-[1px] border-zinc-200 p-2 w-[50px]">
                            <Image style={{ objectFit: "contain", borderRadius: "5px" }} src={product?.imagePath} alt={product.name} width={50} height={50} />
                        </td>
                        <td className="border-[1px] border-zinc-200 p-2">{product.name}</td>
                        <td className="border-[1px] border-zinc-200 p-2">{formatCurrency(product.priceInCents / 100)}</td>
                        <td className="border-[1px] border-zinc-200 p-2">{product._count.orders}</td>
                        <td className="border-[1px] border-zinc-200 p-2">...</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

function AvailableIcon() {
    return (
        <svg className="w-5 h-5" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
                <path
                    d="M11.7071 6.70711C12.0976 6.31658 12.0976 5.68342 11.7071 5.29289C11.3166 4.90237 10.6834 4.90237 10.2929 5.29289L7 8.58579L5.70711 7.29289C5.31658 6.90237 4.68342 6.90237 4.29289 7.29289C3.90237 7.68342 3.90237 8.31658 4.29289 8.70711L6.29289 10.7071C6.68342 11.0976 7.31658 11.0976 7.70711 10.7071L11.7071 6.70711Z"
                    fill="#212121"
                ></path>
                <path
                    d="M0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8ZM8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2Z"
                    fill="#212121"
                ></path>
            </g>
        </svg>
    );
}
