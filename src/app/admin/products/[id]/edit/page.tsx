import { PageHeading } from "@/components/PageHeading";
import { ProductForm } from "../../_components/ProductForm";

export default async function EditProductPage({ params: { id } }: { params: { id: string } }) {
    const product = await prisma?.product.findUnique({
        where: { id },
    });

    return (
        <div className="mt-10 flex flex-col items-center gap-4">
            <PageHeading>Edit product</PageHeading>
            <ProductForm product={product} />
        </div>
    );
}
