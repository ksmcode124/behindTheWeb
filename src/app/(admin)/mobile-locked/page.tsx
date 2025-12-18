import React from 'react'
import { FaLock } from 'react-icons/fa'

export default function page() {
  return (
    <div className="flex items-center justify-center h-screen flex-col gap-4 px-6 text-center">
        <FaLock size={48} className="text-gray-500" />
        <h1 className="text-2xl font-semibold">Dashboard Admin Dikunci</h1>
        <p className="text-gray-600">Akses halaman dashboard admin Web Behind The Web dengan menggunakan perangkat <strong>Desktop</strong></p>
    </div>
  )
}
