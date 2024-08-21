import { PageHeading } from "@/components/PageHeading";
import { Button } from "@/components/DefaultButton";

export default function ProductsPage() {
    return (
        <div className="mt-10 flex flex-col items-center gap-4">
            <PageHeading>Products</PageHeading>
            <Button href="/admin/products/new">Add Product</Button>
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
                    {/* <tr>
                        <th className="border-[1px] border-zinc-200 p-2">Product 1</th>
                        <th className="border-[1px] border-zinc-200 p-2">199.99$</th>
                        <th className="border-[1px] border-zinc-200 p-2">Available</th>
                    </tr> */}
                </tbody>
            </table>
        </div>
    );
}

function ProductsTable() {}
