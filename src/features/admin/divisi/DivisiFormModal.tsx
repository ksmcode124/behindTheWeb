// DivisiFormModal.tsx
import * as React from 'react';
import { BaseModal } from '@/components/ui/base-modal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CrudDivisi } from '@/lib/btw/interfaces/btw';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: CrudDivisi | null;
  onSubmit: (data: { nama_divisi: string; deskripsi: string }) => void;
  loading?: boolean;
}

export function DivisiFormModal({
  open,
  onOpenChange,
  initialData,
  onSubmit,
  loading,
}: Props) {
  const [nama, setNama] = React.useState('');
  const [deskripsi, setDeskripsi] = React.useState('');

  React.useEffect(() => {
    if (initialData) {
      setNama(initialData.nama_divisi);
      setDeskripsi(initialData.deskripsi ?? '');
    } else {
      setNama('');
      setDeskripsi('');
    }
  }, [initialData, open]);

  const handleSubmit = () => {
    onSubmit({
      nama_divisi: nama,
      deskripsi,
    });
  };

  return (
    <BaseModal
      open={open}
      onOpenChange={onOpenChange}
      title={initialData ? 'Edit Divisi' : 'Tambah Divisi'}
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
      <div className="space-y-4">
        <Input
          placeholder="Nama Divisi"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
        />
        <Input
          placeholder="Deskripsi"
          value={deskripsi}
          onChange={(e) => setDeskripsi(e.target.value)}
        />
      </div>
    </BaseModal>
  );
}
