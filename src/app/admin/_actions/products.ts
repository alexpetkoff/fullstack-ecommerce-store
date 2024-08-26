"use server";

import { z } from "zod";
import prisma from "@/db/db";
import fs from "fs/promises";
import { notFound, redirect } from "next/navigation";

const fileSchema = z.instanceof(File, { message: "File is required" });
const imageSchema = fileSchema.refine((file) => file.size === 0 || file.type.startsWith("image/"), { message: "File must be an image" });

const addSchema = z.object({
    name: z.string().min(1),
    priceInCents: z.coerce.number().min(1).int(),
    description: z.string().min(1),
    file: fileSchema.refine((file) => file.size > 0, { message: "File is required" }),
    image: imageSchema.refine((file) => file.size > 0, { message: "File is required" }),
});

const editSchema = addSchema.extend({
    file: fileSchema.optional(),
    image: imageSchema.optional(),
});

export async function addProduct(prevState: unknown, formData: FormData) {
    const result = addSchema.safeParse(Object.fromEntries(formData.entries()));

    if (result.success === false) {
        return result.error.formErrors.fieldErrors;
    }

    const data = result.data;

    await fs.mkdir("products", { recursive: true });
    const filePath = `products/${crypto.randomUUID()}-${data.file.name}`;
    await fs.writeFile(filePath, Buffer.from(await data.file.arrayBuffer()));

    await fs.mkdir("public/products", { recursive: true });
    const imagePath = `/products/${crypto.randomUUID()}-${data.image.name}`;
    await fs.writeFile(`public${imagePath}`, Buffer.from(await data.image.arrayBuffer()));

    await prisma?.product.create({
        data: {
            name: data.name,
            description: data.description,
            priceInCents: data.priceInCents,
            isAvailableForPurchase: true,
            imagePath,
            filePath,
        },
    });

    redirect("/admin/products");
}

export async function updateProduct(id: string, prevState: unknown, formData: FormData) {
    const result = editSchema.safeParse(Object.fromEntries(formData.entries()));

    if (result.success === false) {
        return result.error.formErrors.fieldErrors;
    }

    const data = result.data;
    const product = await prisma?.product.findUnique({
        where: { id },
    });

    if (product === null) return notFound();

    let filePath = product.filePath;
    let imagePath = product.imagePath;

    if (data.file != null && data.file.size > 0) {
        await fs.unlink(product.filePath);
        filePath = `products/${crypto.randomUUID()}-${data.file.name}`;
        await fs.writeFile(filePath, Buffer.from(await data.file.arrayBuffer()));
    }

    if (data.image != null && data.image.size > 0) {
        await fs.unlink(`public${product.imagePath}`);
        imagePath = `products/${crypto.randomUUID()}-${data.image.name}`;
        await fs.writeFile(`public${imagePath}`, Buffer.from(await data.image.arrayBuffer()));
    }

    await prisma?.product.update({
        where: { id },
        data: {
            name: data.name,
            description: data.description,
            priceInCents: data.priceInCents,
            imagePath,
            filePath,
        },
    });

    redirect("/admin/products");
}

export async function toggleProductAvailability(id: string, isAvailableForPurchase: boolean) {
    await prisma?.product.update({
        where: { id },
        data: { isAvailableForPurchase },
    });
}

export async function deleteProduct(id: string) {
    const product = await prisma?.product.delete({
        where: { id },
    });

    if (product === null) return notFound();

    await fs.unlink(product.filePath);
    await fs.unlink(`public${product.imagePath}`);
}
