import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

export function HeaderSection({
  page,
  title,
  handleTambah,
}: {
  page: string;
  title: string;
  handleTambah?: () => void;
}) {
  return (
    <div className="mb-10 flex w-full flex-col gap-5 uppercase">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/admin">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>/</BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage>{page}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold italic">{title}</h1>
        {handleTambah && (
          <Button onClick={handleTambah}>
            <PlusCircle /> Tambah Baru
          </Button>
        )}
      </div>
    </div>
  );
}
