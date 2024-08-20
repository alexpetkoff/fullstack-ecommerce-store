import prisma from "@/db/db";
import Card from "@/components/Card";
import { formatCurrency, formatNumber } from "@/lib/formatters";

function wait(time: number) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

async function getSalesData() {
    const data = await prisma?.order.aggregate({
        _sum: { pricePaidInCents: true },
        _count: true,
    });

    await wait(2000);

    return {
        amount: (data?._sum.pricePaidInCents || 0) / 100,
        numberOfSales: data?._count || 0,
    };
}

async function getUserData() {
    const [userCount, orderData] = await Promise.all([
        prisma?.user.count(),
        prisma?.order.aggregate({
            _sum: { pricePaidInCents: true },
        }),
    ]);

    return {
        userCount,
        averageValuePerUser: userCount === 0 ? 0 : (orderData?._sum.pricePaidInCents || 0) / userCount / 100,
    };
}

async function getProductsData() {
    const [activeCount, inactiveCount] = await Promise.all([
        prisma?.product.count({
            where: { isAvailableForPurchase: true },
        }),
        prisma?.product.count({
            where: { isAvailableForPurchase: false },
        }),
    ]);

    return {
        activeCount,
        inactiveCount,
    };
}

export default async function AdminDashboard() {
    const [salesData, usersData, productsData] = await Promise.all([getSalesData(), getUserData(), getProductsData()]);

    return (
        <div className="m-10">
            <h1 className="text-3xl font-bold text-center">Admin Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-6 px-10 gap-4">
                <Card title="Sales" subtitle={formatNumber(salesData?.numberOfSales) + " Orders"} body={formatCurrency(salesData?.amount)} />
                <Card title="Customers" subtitle={`${formatCurrency(usersData.averageValuePerUser)} Average value`} body={formatNumber(usersData.userCount)} />
                <Card title="Active products" subtitle={`${formatNumber(productsData.inactiveCount)} Inactive`} body={formatNumber(productsData.activeCount)} />
            </div>
        </div>
    );
}
