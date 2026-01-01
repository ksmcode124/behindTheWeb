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

export function DeleteConfirmation({
  item,
  fields,
  title,
  description,
  onClose,
  onConfirm,
}: {
  item: any;
  fields: { key: string; label: string }[];
  title: string;
  description?: string;
  onClose: (open: boolean) => void;
  onConfirm: (data: any) => void;
}) {
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && (
            <p className="text-sm text-gray-500">{description}</p>
          )}
        </DialogHeader>

        <div className="mt-3 space-y-2">
          {fields.map((f) => (
            <p key={f.key}>
              <strong>{f.label}:</strong> {String(item?.[f.key] ?? '')}
            </p>
          ))}
        </div>

        <DialogFooter className="mt-4">
          <DialogClose asChild>
            <Button variant="outline">Batal</Button>
          </DialogClose>

          <Button variant="outline" onClick={() => onConfirm(item)}>
            Hapus
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
