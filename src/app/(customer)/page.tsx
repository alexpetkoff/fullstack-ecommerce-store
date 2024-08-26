import { Button } from "@/components/DefaultButton";
import { ProductCard } from "@/components/ProductCard";
import prisma from "@/db/db";

export default function HomePage() {
    return (
        <main className="space-y-12">
            <ProductGridSection title="Most Popular" productsFetcher={getMostPopular} />
            <ProductGridSection title="Newest" productsFetcher={getNewestProducts} />
        </main>
    );
}

function getMostPopular() {
    return prisma?.product.findMany({
        where: { isAvailableForPurchase: true },
        orderBy: {
            orders: { _count: "desc" },
        },
        take: 6,
    });
}

function getNewestProducts() {
    return prisma?.product.findMany({
        where: { isAvailableForPurchase: true },
        orderBy: {
            createdAt: "desc",
        },
    });
}

type Product = {
    id: string;
    name: string;
    priceInCents: number;
    imagePath: string;
    description: string;
};

type ProductGridSectionProps = {
    title: string;
    productsFetcher: () => Promise<Product[]>;
};

async function ProductGridSection({ productsFetcher, title }: ProductGridSectionProps) {
    return (
        <div className="space-y-4">
            <div className="flex gap-4">
                <h2 className="text-3xl font-bold">{title}</h2>
                <Button href="/products">View All</Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {(await productsFetcher()).map((product) => (
                    <ProductCard key={product.id} {...product} />
                ))}
            </div>
        </div>
    );
}
