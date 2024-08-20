import { PageHeading } from "@/components/PageHeading";
import { Button } from "@/components/DefaultButton";

export default function ProductsPage() {
    return (
        <div className="mt-10 flex flex-col items-center gap-4">
            <PageHeading>Products</PageHeading>
            <Button href="/admin/products/add">Add Product</Button>
        </div>
    );
}
