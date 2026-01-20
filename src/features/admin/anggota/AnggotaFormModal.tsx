// DivisiFormModal.tsx
import * as React from 'react';
import { BaseModal } from '@/components/ui/base-modal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CrudAnggota } from '@/lib/btw/interfaces/btw';
import { Label } from '@radix-ui/react-label';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: CrudAnggota | null;
  onSubmit: (data: {
    nama_anggota: string;
    linkedin: string;
    instagram: string;
  }) => void;
  loading?: boolean;
}

export function AnggotaFormModal({
  open,
  onOpenChange,
  initialData,
  onSubmit,
  loading,
}: Props) {
  const [nama, setNama] = React.useState('');
  const [linkedin, setLinkedin] = React.useState('');
  const [instagram, setInstagram] = React.useState('');

  React.useEffect(() => {
    if (initialData) {
      setNama(initialData.nama_anggota);
      setLinkedin(initialData.linkedin ?? '');
      setInstagram(initialData.instagram ?? '');
    } else {
      setNama('');
      setLinkedin('');
    }
  }, [initialData, open]);

  const handleSubmit = () => {
    onSubmit({
      nama_anggota: nama,
      linkedin: linkedin,
      instagram: instagram,
    });
  };

  return (
    <BaseModal
      open={open}
      onOpenChange={onOpenChange}
      title={initialData ? 'Edit Anggota' : 'Input Anggota'}
      footer={
        <>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!nama || loading}>
            {loading ? 'Saving...' : initialData ? 'Save Changes' : 'Add'}
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        <div className="space-y-4">
          <div>
            <Label htmlFor="nama" className="mb-1 block text-sm font-medium">
              Nama Anggota
            </Label>
            <Input
              id="nama"
              placeholder="Nama Anggota"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
            />
          </div>

          <div>
            <Label
              htmlFor="linkedin"
              className="mb-1 block text-sm font-medium"
            >
              LinkedIn
            </Label>
            <Input
              id="linkedin"
              placeholder="https://linkedin.com/in/..."
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
            />
          </div>

          <div>
            <Label
              htmlFor="instagram"
              className="mb-1 block text-sm font-medium"
            >
              Instagram
            </Label>
            <Input
              id="instagram"
              placeholder="https://instagram.com/..."
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
            />
          </div>
        </div>
      </div>
    </BaseModal>
  );
}
