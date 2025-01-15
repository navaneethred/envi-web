"use client"

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2 } from "lucide-react";
import Link from "next/link";

interface StartupCardProps {
    id?: string;
    name: string;
    description: string;
    invested: number;
    equity: number;
    status: string;
    isOwner?: boolean;
}

export function StartupCard({
    id,
    name,
    description,
    invested,
    equity,
    status,
    isOwner = false,
}: StartupCardProps) {
    const CardContent = () => (
        <>
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <Building2 className="h-8 w-8 text-primary" />
                    <div>
                        <h3 className="font-semibold text-lg">{name}</h3>
                        <Badge variant={status === "Active" ? "default" : "secondary"}>
                            {status}
                        </Badge>
                    </div>
                </div>
            </div>

            <p className="text-muted-foreground mb-4 line-clamp-2">{description}</p>

            <div className="space-y-2">
                <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                        {isOwner ? "Ownership" : "Investment"}
                    </span>
                    <span className="font-medium">
                        {isOwner ? "100%" : `₹${invested.toLocaleString()}`}
                    </span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Equity</span>
                    <span className="font-medium">{equity}%</span>
                </div>
            </div>
        </>
    );

    if (id) {
        return (
            <Link href={`/startups/${id}`}>
                <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent />
                </Card>
            </Link>
        );
    }

    return (
        <Card className="p-6">
            <CardContent />
        </Card>
    );
}