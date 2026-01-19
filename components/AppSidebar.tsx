"use client";

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronRight, BarChart3, BadgeDollarSign, BadgePoundSterling, BadgeEuro, BadgeJapaneseYen, BadgeSwissFranc, LineChart, PieChart, TrendingUp } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
    {
        title: "Countries",
        items: [
            { title: "United States", href: "/", icon: BadgeDollarSign },
            { title: "Great Britain", href: "/us/inflation", icon: BadgePoundSterling },
            { title: "Europe", href: "/us/jobs", icon: BadgeEuro },
            { title: "Japan", href: "/us/yield", icon: BadgeJapaneseYen },
            { title: "Australia", href: "/us/yield", icon: BadgeDollarSign },
            { title: "Canada", href: "/us/yield", icon: BadgeDollarSign },
            { title: "Switzerland", href: "/us/yield", icon: BadgeSwissFranc },
            { title: "New Zealand", href: "/us/yield", icon: BadgeDollarSign },
        ],
    },
];

export function AppSidebar() {
    const pathname = usePathname();

    return (
        <Sidebar collapsible="offcanvas" className="border-r border-neutral-800 bg-neutral-900">
            <SidebarContent className="gap-0 py-4">
                {nav.map((group) => (
                    <Collapsible
                        key={group.title}
                        defaultOpen
                        className="group/collapsible"
                    >
                        <SidebarGroup>
                            <SidebarGroupLabel asChild>
                                <CollapsibleTrigger className="flex w-full items-center text-neutral-500 hover:text-neutral-300 transition-colors uppercase text-[10px] tracking-[0.2em] font-bold">
                                    {group.title}
                                    <ChevronRight className="ml-auto size-3 transition-transform group-data-[state=open]/collapsible:rotate-90" />
                                </CollapsibleTrigger>
                            </SidebarGroupLabel>

                            <CollapsibleContent className="mt-2">
                                <SidebarGroupContent>
                                    <SidebarMenu>
                                        {group.items.map((item) => (
                                            <SidebarMenuItem key={item.title}>
                                                <SidebarMenuButton
                                                    asChild
                                                    isActive={pathname === item.href}
                                                    className="data-[active=true]:bg-violet-500/10 data-[active=true]:text-violet-400"
                                                >
                                                    <Link href={item.href} className="flex items-center gap-2">
                                                        <item.icon className="size-4" />
                                                        <span className="font-medium">{item.title}</span>
                                                    </Link>
                                                </SidebarMenuButton>
                                            </SidebarMenuItem>
                                        ))}
                                    </SidebarMenu>
                                </SidebarGroupContent>
                            </CollapsibleContent>
                        </SidebarGroup>
                    </Collapsible>
                ))}
            </SidebarContent>

            <SidebarRail />
        </Sidebar>
    );
}
