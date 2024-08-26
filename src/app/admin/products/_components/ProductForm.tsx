"use client";

import { formatCurrency } from "@/lib/formatters";
import { useState } from "react";
import { addProduct, updateProduct } from "../../_actions/products";
import { useFormState, useFormStatus } from "react-dom";
import { Product } from "@prisma/client";

export function ProductForm({ product }: { product?: Product | null }) {
    const [error, action] = useFormState(product == null ? addProduct : updateProduct.bind(null, product.id), {});
    const [priceInCents, setPriceInCents] = useState<number | undefined>(product?.priceInCents);

    return (
        <form action={action} className="w-1/2 text-center flex flex-col items-center gap-4">
            <div className="flex flex-col items-center">
                <label htmlFor="name">Name</label>
                <input type="text" name="name" id="name" className="border-zinc-200 p-1 border-[1px]" required defaultValue={product?.name || ""} />
                {error.name && <div className="text-rose-700">{error.name}</div>}
            </div>
            <div className="flex flex-col items-center">
                <label htmlFor="priceInCents">Price in cents</label>
                <input
                    type="number"
                    name="priceInCents"
                    id="priceInCents"
                    className="border-zinc-200 p-1 border-[1px]"
                    required
                    minLength={1}
                    // value={priceInCents}
                    defaultValue={product?.priceInCents || undefined}
                    onChange={(e) => setPriceInCents(Number(e.target.value))}
                />
                <div className="text-muted-foreground">{formatCurrency((priceInCents || 0) / 100)}</div>
                {error.priceInCents && <div className="text-rose-700">{error.priceInCents}</div>}
            </div>
            <div className="flex flex-col items-center">
                <label htmlFor="description">Description</label>
                <textarea
                    rows={5}
                    placeholder=" "
                    name="description"
                    id="description"
                    className="border-zinc-200 p-1 border-[1px]"
                    required
                    defaultValue={product?.description || ""}
                />
                {error.description && <div className="text-rose-700">{error.description}</div>}
            </div>
            <div className="flex flex-col items-center">
                <label htmlFor="file">File</label>
                <input type="file" name="file" id="file" className="border-zinc-200 p-1 border-[1px]" required={product === null} />
                {error.file && <div className="text-rose-700">{error.file}</div>}
                {product != null && <div className="text-slate-400 text-[12px]">{product.filePath}</div>}
            </div>
            <div className="flex flex-col items-center">
                <label htmlFor="image">Image</label>
                <input type="file" name="image" id="image" className="border-zinc-200 p-1 border-[1px]" required={product === null} />
                {error.image && <div className="text-rose-700">{error.image}</div>}
                {product != null && <div className="text-slate-400 text-[12px]">{product.imagePath}</div>}
            </div>
            <SubmitButton />
        </form>
    );
}

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <button type="submit" disabled={pending} className="px-4 py-2 rounded-lg bg-slate-500 hover:bg-slate-400 w-1/4">
            {pending ? "Saving..." : "Save"}
        </button>
    );
}
