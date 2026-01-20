import { BaseModal } from '@/components/ui/base-modal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import * as React from 'react';
import { CrudKepengurusan } from '@/lib/btw/interfaces/btw';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: CrudKepengurusan | null;
  onSubmit: (data: { tahun_kerja: string; nama_kepengurusan: string }) => void;
  loading?: boolean;
}

export function KepengurusanFormModal({
  open,
  onOpenChange,
  initialData,
  onSubmit,
  loading,
}: Props) {
  const [tahun, setTahun] = React.useState('');
  const [nama, setNama] = React.useState('');

  React.useEffect(() => {
    if (initialData) {
      setTahun(initialData.tahun_kerja);
      setNama(initialData.nama_kepengurusan);
    } else {
      setTahun('');
      setNama('');
    }
  }, [initialData, open]);

  const handleSubmit = () => {
    onSubmit({
      tahun_kerja: tahun,
      nama_kepengurusan: nama,
    });
  };

  return (
    <BaseModal
      open={open}
      onOpenChange={onOpenChange}
      title={initialData ? 'Edit Kepengurusan' : 'Tambah Kepengurusan'}
      footer={
        <>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Batal
          </Button>
          <Button onClick={handleSubmit} disabled={!tahun || !nama || loading}>
            {loading ? 'Menyimpan...' : initialData ? 'Simpan' : 'Tambah'}
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        <Input
          placeholder="Tahun Kerja"
          value={tahun}
          onChange={(e) => setTahun(e.target.value)}
        />
        <Input
          placeholder="Nama Kepengurusan"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
        />
      </div>
    </BaseModal>
  );
}
