import { BaseModal } from '@/components/ui/base-modal';
import { Button } from '@/components/ui/button';

interface ConfirmModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description: string;
  onConfirm: () => void;
  loading?: boolean;
}

export function ConfirmModal({
  open,
  onOpenChange,
  title = 'Konfirmasi',
  description,
  onConfirm,
  loading,
}: ConfirmModalProps) {
  return (
    <BaseModal
      open={open}
      onOpenChange={onOpenChange}
      title={title}
      footer={
        <>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            className="bg-red-500 text-white"
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? 'Menghapus...' : 'Hapus'}
          </Button>
        </>
      }
    >
      <p className="text-muted-foreground">{description}</p>
    </BaseModal>
  );
}
