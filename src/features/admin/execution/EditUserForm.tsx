'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/Dialog';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';

export function EditUserForm({
  user,
  fields,
  onClose,
  onSubmit,
}: {
  user: any;
  fields: { key: string; label: string; type?: string }[];
  onClose: () => void;
  onSubmit?: (data: any) => void;
}) {
  function handleSubmit(e: any) {
    e.preventDefault();

    const formData: any = {};
    fields.forEach((f) => {
      formData[f.key] = e.target[f.key].value;
    });

    onSubmit?.(formData);
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Data</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-4 grid gap-4">
          {fields.map((field) => (
            <div key={field.key} className="grid gap-2">
              <Label htmlFor={field.key}>{field.label}</Label>
              <Input
                id={field.key}
                name={field.key}
                type={field.type || 'text'}
                defaultValue={user[field.key]}
              />
            </div>
          ))}

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Batal</Button>
            </DialogClose>
            <Button type="submit">Simpan</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
