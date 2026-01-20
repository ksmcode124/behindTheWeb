// JabatanFormModal.tsx
import * as React from 'react';
import { BaseModal } from '@/components/ui/base-modal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CrudJabatan } from '@/lib/btw/interfaces/btw';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: CrudJabatan | null;
  onSubmit: (data: { nama_jabatan: string }) => void;
  loading?: boolean;
}

export function JabatanFormModal({
  open,
  onOpenChange,
  initialData,
  onSubmit,
  loading,
}: Props) {
  const [nama, setNama] = React.useState('');

  React.useEffect(() => {
    if (initialData) {
      setNama(initialData.nama_jabatan);
    } else {
      setNama('');
    }
  }, [initialData, open]);

  const handleSubmit = () => {
    onSubmit({ nama_jabatan: nama });
  };

  return (
    <BaseModal
      open={open}
      onOpenChange={onOpenChange}
      title={initialData ? 'Edit Jabatan' : 'Tambah Jabatan'}
      footer={
        <>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Batal
          </Button>
          <Button onClick={handleSubmit} disabled={!nama || loading}>
            {loading ? 'Menyimpan...' : initialData ? 'Simpan' : 'Tambah'}
          </Button>
        </>
      }
    >
      <Input
        placeholder="Nama Jabatan"
        value={nama}
        onChange={(e) => setNama(e.target.value)}
      />
    </BaseModal>
  );
}
