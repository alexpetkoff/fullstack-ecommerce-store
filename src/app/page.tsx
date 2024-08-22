import type { Viewport } from "next";

export const viewport: Viewport = {
    themeColor: "red",
};

export default function Home() {
    return <h1 className="text-3xl font-bold text-center">NextJS Store 🛒 tutorial :)</h1>;
}
