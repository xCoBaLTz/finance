"use client";

import { columns } from "@/app/(dashboard)/accounts/columns";
import { useBulkDeleteAccounts } from "@/features/accounts/api/use-bulk-delete";
import { useNewAccount } from "@/features/accounts/hooks/use-new-account";

import { Loader2, Plus } from "lucide-react";

import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";

const AccountsPage = () => {
  const { onOpen } = useNewAccount();
  const accountsQuery = useGetAccounts();
  const deleteAccounts = useBulkDeleteAccounts();
  const accounts = accountsQuery.data || [];
  const isDisabled = accountsQuery.isLoading || deleteAccounts.isPending;

  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          {accountsQuery.isLoading ? (
            <Skeleton className="h-8 w-48" />
          ) : (
            <>
              <CardTitle className="text-xl line-clamp-1">
                AccountsPage
              </CardTitle>
              <Button size="sm" onClick={onOpen} className="gap-2">
                <Plus className="size-4" />
                Add new
              </Button>
            </>
          )}
        </CardHeader>
        <CardContent>
          {accountsQuery.isLoading ? (
            <div className="h-[500px] w-full flex items-center justify-center">
              <Loader2 className="size-6 text-slate-300 animate-spin"></Loader2>
            </div>
          ) : (
            <DataTable
              filterKey="email"
              columns={columns}
              data={accounts}
              onDelete={(row) => {
                deleteAccounts.mutate({
                  ids: row.map((r) => r.original.id),
                });
              }}
              disabled={isDisabled}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};
export default AccountsPage;
