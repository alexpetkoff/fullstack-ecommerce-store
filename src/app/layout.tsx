import type { Metadata } from "next";
import { Exo_2 } from "next/font/google";
import "./globals.css";

const exo2 = Exo_2({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Ecommerce Store",
    description: "Created for exercise purposes - NextJS, TailwindCSS, Stripe, Prisma, and more!",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={exo2.className}>{children}</body>
        </html>
    );
}
