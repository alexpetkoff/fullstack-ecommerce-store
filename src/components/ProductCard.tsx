import { formatCurrency } from "@/lib/formatters";
import Link from "next/link";
import { Button } from "./DefaultButton";
import Image from "next/image";

type ProductCardProps = {
    name: string;
    priceInCents: number;
    description: string;
    id: string;
    imagePath: string;
};

export function ProductCard({ name, priceInCents, description, id, imagePath }: ProductCardProps) {
    return (
        <div className="flex overflow-hidden flex-col m-2 gap-2 rounded-xl max-w-[300px] border-[1px] border-slate-200 p-4">
            <div className="relative w-full h-auto aspect-square">
                <Image src={imagePath} alt={name} fill />
            </div>
            <div className="title">
                <h3>{name}</h3>
                <p>{formatCurrency(priceInCents / 100)}</p>
            </div>
            <div className="flex-grow">
                <p className="line-clamp-4">{description}</p>
            </div>
            <div className="max-w-1/3">
                <Button href={`/product/${id}/purchase`}>Purchase</Button>
            </div>
        </div>
    );
}
