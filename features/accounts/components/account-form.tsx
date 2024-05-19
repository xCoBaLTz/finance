import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { insertAccountSchema } from "@/db/schema";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = insertAccountSchema.pick({
  name: true,
});

type FormValues = z.input<typeof formSchema>;

type Props = {
  id?: string;
  defaultValues?: FormValues;
  onSubmit: (values: FormValues) => void;
  onDelete?: () => void;
  disabled?: boolean;
};

export const AccountForm = ({
  id,
  defaultValues,
  onSubmit,
  onDelete,
  disabled,
}: Props) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  const handleSubmit = (values: FormValues) => {
    onSubmit(values);
  };

  const handleDelete = () => {
    onDelete?.();
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-4 pt-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={disabled}
                      placeholder="eg. Cash, Bank, Credit Card"
                    />
                  </FormControl>
                </FormItem>
              );
            }}
          />
          <Button className="w-full" disabled={disabled}>
            {id ? "Save changes" : "Create account"}
          </Button>
          {id && (
            <Button
              className="w-full gap-2"
              variant="destructive"
              type="button"
              disabled={disabled}
              onClick={handleDelete}>
              <Trash className="size-4" />
              Delete accounts
            </Button>
          )}
        </form>
      </Form>
    </>
  );
};
