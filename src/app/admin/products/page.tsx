import { PageHeading } from "@/components/PageHeading";
import { Button } from "@/components/DefaultButton";
import { formatCurrency } from "@/lib/formatters";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Image from "next/image";
import prisma from "@/db/db";
import { CheckCircle2, MoreVertical, XCircle } from "lucide-react";
import Link from "next/link";
import { ActivateToggleDropdownItem, DeleteDropdownItem } from "./_components/ProductActions";

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
                    <th className="border-[1px] border-zinc-200 p-2">Image</th>
                    <th className="border-[1px] border-zinc-200 p-2">Name</th>
                    <th className="border-[1px] border-zinc-200 p-2">Price</th>
                    <th className="border-[1px] border-zinc-200 p-2">Orders</th>
                    <th className="border-[1px] border-zinc-200 p-2">
                        <span>Actions</span>
                    </th>
                </tr>
            </thead>
            <tbody>
                {products?.map((product) => (
                    <tr key={product.id}>
                        <td className="border-[1px] border-zinc-200 p-2">
                            {product.isAvailableForPurchase ? <CheckCircle2 className="stroke-green-700" /> : <XCircle className="stroke-red-700" />}
                        </td>
                        <td className="border-[1px] border-zinc-200 p-2 w-[50px]">
                            <Image style={{ objectFit: "contain", borderRadius: "5px" }} src={product?.imagePath} alt={product.name} width={50} height={50} />
                        </td>
                        <td className="border-[1px] border-zinc-200 p-2">{product.name}</td>
                        <td className="border-[1px] border-zinc-200 p-2">{formatCurrency(product.priceInCents / 100)}</td>
                        <td className="border-[1px] border-zinc-200 p-2">{product._count.orders}</td>
                        <td className="border-[1px] border-zinc-200 p-2">
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <MoreVertical />
                                    <span className="sr-only">Actions</span>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem>
                                        <a href={`/admin/products/${product.id}/download`}>Download</a>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                        <Link href={`/admin/products/${product.id}/edit`}>Edit</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <ActivateToggleDropdownItem id={product.id} isAvailableForPurchase={product.isAvailableForPurchase} />
                                    <DropdownMenuSeparator />
                                    <DeleteDropdownItem id={product.id} disabled={product._count.orders > 0} />
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
