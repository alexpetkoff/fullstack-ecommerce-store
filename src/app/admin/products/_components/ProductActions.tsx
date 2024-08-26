"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useTransition } from "react";
import { deleteProduct, toggleProductAvailability } from "../../_actions/products";
import { useRouter } from "next/navigation";

export function ActivateToggleDropdownItem({ id, isAvailableForPurchase }: { id: string; isAvailableForPurchase: boolean }) {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    return (
        <DropdownMenuItem
            disabled={isPending}
            onClick={() => {
                startTransition(async () => {
                    await toggleProductAvailability(id, !isAvailableForPurchase);
                    router.refresh();
                });
            }}
        >
            {isAvailableForPurchase ? "Deactivate" : "Activate"}
        </DropdownMenuItem>
    );
}

export function DeleteDropdownItem({ id, disabled }: { id: string; disabled: boolean }) {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    return (
        <DropdownMenuItem
            disabled={disabled || isPending}
            onClick={() => {
                startTransition(async () => {
                    await deleteProduct(id);
                    router.refresh();
                });
            }}
        >
            <span className="text-rose-600">Delete</span>
        </DropdownMenuItem>
    );
}
