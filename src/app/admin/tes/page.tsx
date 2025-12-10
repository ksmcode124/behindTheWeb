'use client'
import { DynamicRow } from "../components/dynamicRow"
import { DeleteConfirmation } from "../components/execution/DeleteConfirmation"
import { EditUserForm } from "../components/execution/EditUserForm"
import { useState } from "react"

export default function tes() {
  const [selected, setSelected] = useState<any>(null)
  const [modal, setModal] = useState<any>(null)

  const users = [
    { id: 1, name: "Budi", jabatan: "Admin" },
    { id: 2, name: "Sinta", jabatan: "Manager" },
  ]

  const deleteFields = [
    { key: "name", label: "Nama" },
    { key: "jabatan", label: "Jabatan" },
  ]

  return (
    <div>
      <table className="w-full border-collapse">
        <tbody>
          {users.map(user => (
            <DynamicRow
              key={user.id}
              cells={[user.name, user.jabatan]}
              onEdit={() => {
                setSelected(user)
                setModal("edit")
              }}
              onDelete={() => {
                setSelected(user)
                setModal("delete")
              }}
            />
          ))}
        </tbody>
      </table>

      {modal === "edit" && (
        <EditUserForm
          user={selected}
          fields={[
            { key: "name", label: "Nama", type: "text" },
            { key: "jabatan", label: "Jabatan", type: "text" },
          ]}
          onClose={() => setModal(null)}
          onSubmit={(data) => {
            console.log("update:", data)
            setModal(null)
          }}
        />
      )}

      {modal === "delete" && (
        <DeleteConfirmation
          item={selected}
          fields={deleteFields}
          title="Hapus User?"
          description="Data berikut akan dihapus secara permanen."
          onClose={() => setModal(null)}
          onConfirm={(data) => {
            console.log("hapus:", data)
            setModal(null)
          }}
        />
      )}
    </div>
  )
}
