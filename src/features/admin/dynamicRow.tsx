import { Button } from "@/components/ui/button"

export function DynamicRow({
  cells,
  onEdit,
  onDelete,
}: {
  cells: any[]
  onEdit?: () => void
  onDelete?: () => void
}) {
  return (
    <tr>
      {cells.map((cell, i) => (
        <td key={i} className="px-4 py-2 border">
          {cell}
        </td>
      ))}

      <td className="px-4 py-2 border text-center">
        <div className="flex gap-2 justify-center">
          <Button size="sm" variant="outline" onClick={onEdit}>
            Edit
          </Button>

          <Button size="sm" variant="outline" onClick={onDelete}>
            Hapus
          </Button>
        </div>
      </td>
    </tr>
  )
}

