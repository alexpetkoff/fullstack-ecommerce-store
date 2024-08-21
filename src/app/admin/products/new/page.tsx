import { PageHeading } from "@/components/PageHeading";
import { ProductForm } from "../_components/ProductForm";

export default function NewProductPage() {
    return (
        <div className="mt-10 flex flex-col items-center gap-4">
            <PageHeading>Add new product</PageHeading>
            <ProductForm />
        </div>
    );
}
