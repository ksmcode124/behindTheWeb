import { Button } from '@/components/ui/Button';

export function DynamicRow({
  cells,
  onEdit,
  onDelete,
}: {
  cells: any[];
  onEdit?: () => void;
  onDelete?: () => void;
}) {
  return (
    <tr>
      {cells.map((cell, i) => (
        <td key={i} className="border px-4 py-2">
          {cell}
        </td>
      ))}

      <td className="border px-4 py-2 text-center">
        <div className="flex justify-center gap-2">
          <Button size="sm" variant="outline" onClick={onEdit}>
            Edit
          </Button>

          <Button size="sm" variant="outline" onClick={onDelete}>
            Hapus
          </Button>
        </div>
      </td>
    </tr>
  );
}
