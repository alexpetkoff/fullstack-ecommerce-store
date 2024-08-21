"use client";

import { formatCurrency } from "@/lib/formatters";
import { useState } from "react";
import { addProduct } from "../../_actions/products";
import { useFormStatus } from "react-dom";

export function ProductForm() {
    const [priceInCents, setPriceInCents] = useState<number>();

    return (
        <form action={addProduct} className="w-1/2 text-center flex flex-col items-center gap-4">
            <div className="flex flex-col items-center">
                <label htmlFor="name">Name</label>
                <input type="text" name="name" id="name" className="border-zinc-200 p-1 border-[1px]" required />
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
                    value={priceInCents}
                    onChange={(e) => setPriceInCents(Number(e.target.value))}
                />
                <div className="text-muted-foreground">{formatCurrency((priceInCents || 0) / 100)}</div>
            </div>
            <div className="flex flex-col items-center">
                <label htmlFor="description">Description</label>
                <textarea rows={5} placeholder=" " name="description" id="description" className="border-zinc-200 p-1 border-[1px]" required />
            </div>
            <div className="flex flex-col items-center">
                <label htmlFor="file">File</label>
                <input type="file" name="file" id="file" className="border-zinc-200 p-1 border-[1px]" required />
            </div>
            <div className="flex flex-col items-center">
                <label htmlFor="image">Image</label>
                <input type="file" name="image" id="image" className="border-zinc-200 p-1 border-[1px]" required />
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
