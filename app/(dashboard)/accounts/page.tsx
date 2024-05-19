"use client";

import { Payment, columns } from "@/app/(dashboard)/accounts/columns";
import { useNewAccount } from "@/features/accounts/hooks/use-new-account";

import { Plus } from "lucide-react";

import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AccountsPage = () => {
  const { onOpen } = useNewAccount();

  const data: Payment[] = [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52g",
      amount: 101,
      status: "success",
      email: "q@example.com",
    },
    {
      id: "728ed52h",
      amount: 102,
      status: "failed",
      email: "s@example.com",
    },
  ];

  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">AccountsPage</CardTitle>
          <Button size="sm" onClick={onOpen} className="gap-2">
            <Plus className="size-4" />
            Add new
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable
            filterKey="email"
            columns={columns}
            data={data}
            onDelete={() => {}}
            disabled={false}
          />
        </CardContent>
      </Card>
    </div>
  );
};
export default AccountsPage;
