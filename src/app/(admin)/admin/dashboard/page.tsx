'use client';
import React, { useState, useEffect, useMemo } from 'react';
import {
  Home,
  Users,
  Briefcase,
  List,
  LogOut,
  X,
  Edit,
  Trash2,
  Search,
  Link,
  ChevronDown,
  Plus,
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
  Eye,
  User,
  Menu,
  Upload,
  Image as ImageIcon,
  AlertTriangle,
} from 'lucide-react';
import {
  CrudAnggota,
  CrudKepengurusan,
  CrudDivisi,
  CrudJabatan,
  DetailAnggota,
} from '@/lib/btw/interfaces/btw';
import { useUploadThing } from '@/lib/uploadthing';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

// ====================================================================
// A. KONSTANTA, TIPE DATA (Constants, Types)
// ====================================================================

type Page =
  | 'login'
  | 'home'
  | 'kepengurusan'
  | 'divisi'
  | 'anggota'
  | 'jabatan'
  | 'detail_anggota';

interface MenuItem {
  name: string;
  icon: React.ElementType;
  page: Page;
}

const API_BASE = '/api/btw';

// --- KONSTANTA WARNA UTAMA ---
const PRIMARY_COLOR = '#0f3148';
const LIGHT_BACKGROUND = '#e0f7ff';
const BUTTON_BLUE = '#3b82f6';
const BUTTON_GREY = '#d1d5db';

// ====================================================================
// B. KOMPONEN BERSAMA & LAYOUT (Shared & Layout Components)
// ====================================================================

const CustomModal: React.FC<{
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}> = ({ title, isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="bg-opacity-75 fixed inset-0 z-50 flex items-center justify-center bg-gray-900 p-4">
      <div className="relative w-full max-w-md rounded-xl bg-white p-6 shadow-2xl">
        <h2 className="mb-6 border-b pb-2 text-xl font-bold text-gray-800">
          {title}
        </h2>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
        >
          <X className="h-6 w-6" />
        </button>
        {children}
      </div>
    </div>
  );
};

const ConfirmationModal: React.FC<{
  title: string;
  message: string;
  isOpen: boolean;
  onConfirm: () => void;
  onClose: () => void;
}> = ({ title, message, isOpen, onConfirm, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="bg-opacity-75 fixed inset-0 z-60 flex items-center justify-center bg-gray-900 p-4">
      <div className="relative w-full max-w-sm rounded-xl bg-white p-6 shadow-2xl">
        <h3 className="mb-4 flex items-center text-xl font-bold text-red-600">
          <AlertTriangle className="mr-2 h-6 w-6" />
          {title}
        </h3>
        <p className="mb-6 text-gray-700">{message}</p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="rounded-lg px-4 py-2 font-semibold text-gray-700 transition-colors hover:bg-gray-200"
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            className="rounded-lg bg-red-600 px-4 py-2 font-semibold text-white shadow-md transition-colors hover:bg-red-700"
          >
            Ya, Hapus
          </button>
        </div>
      </div>
    </div>
  );
};

const InputField: React.FC<{
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  type?: 'text' | 'number' | 'url';
}> = ({ label, value, onChange, placeholder, type = 'text' }) => (
  <div className="mb-4">
    <label className="mb-1 block text-xs font-semibold text-gray-700 uppercase">
      {label}
    </label>
    <div className="relative">
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-gray-300 bg-gray-100 p-3 pr-10 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
      <Edit className="absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 transform text-gray-500" />
    </div>
  </div>
);

const Sidebar: React.FC<{
  currentPage: Page;
  onNavigate: (page: Page) => void;
}> = ({ currentPage, onNavigate }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const menuItems: MenuItem[] = [
    { name: 'HOME', icon: Home, page: 'home' },
    { name: 'KEPENGURUSAN', icon: Briefcase, page: 'kepengurusan' },
    { name: 'DIVISI', icon: List, page: 'divisi' },
    { name: 'ANGGOTA', icon: Users, page: 'anggota' },
    { name: 'JABATAN', icon: Briefcase, page: 'jabatan' },
    { name: 'DETAIL ANGGOTA', icon: User, page: 'detail_anggota' },
  ];
  const router = useRouter();
  const handleLogout = async () => {
    try {
      console.log('Try to logout');
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
    } catch (e) {
      // ignore — still force logout UX
    }

    // close sidebar
    setIsSidebarOpen(false);

    router.replace('/login');
  };

  return (
    <>
      <button
        className="fixed top-4 left-4 z-50 rounded-full p-2 text-white shadow-lg lg:hidden"
        style={{ backgroundColor: PRIMARY_COLOR }}
        onClick={() => setIsSidebarOpen(true)}
      >
        <Menu className="h-6 w-6" />
      </button>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black opacity-50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      <div
        className={`fixed inset-y-0 left-0 z-50 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} flex min-h-screen w-[250px] flex-col justify-between text-white shadow-2xl transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0`}
        style={{ backgroundColor: PRIMARY_COLOR }}
      >
        <button
          className="absolute top-4 right-4 z-50 text-white hover:text-yellow-400 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        >
          <X className="h-6 w-6" />
        </button>

        <div>
          <div className="flex items-center space-x-2 border-b border-white/10 p-6">
            <div className="flex h-8 w-8 rotate-12 transform items-center justify-center rounded-full bg-white/20 text-sm font-bold text-white">
              <div className="h-4 w-4 -rotate-12 transform rounded-sm bg-white"></div>
            </div>
            <h1 className="text-2xl font-bold tracking-wide">DASHBOARD</h1>
          </div>
          <nav className="mt-4 space-y-2">
            {menuItems.map((item) => (
              <div
                key={item.name}
                onClick={() => {
                  onNavigate(item.page);
                  setIsSidebarOpen(false);
                }}
                className={`flex cursor-pointer items-center space-x-4 p-4 transition-all ${
                  currentPage === item.page
                    ? 'border-l-4 border-yellow-400 bg-white/10 font-semibold text-yellow-400'
                    : 'hover:bg-white/5'
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </div>
            ))}
          </nav>
        </div>
        <div
          onClick={() => {
            handleLogout();
          }}
          className="mb-4 flex cursor-pointer items-center space-x-4 p-4 hover:bg-white/10"
        >
          <LogOut className="h-5 w-5" />
          <span>KELUAR</span>
        </div>
      </div>
    </>
  );
};

const Header: React.FC<{ currentPage: Page }> = ({ currentPage }) => {
  const path = currentPage.toUpperCase();
  const title = path.charAt(0) + path.slice(1);

  return (
    <header className="flex items-center justify-between border-b border-gray-200 bg-white p-4 shadow-sm">
      <div className="hidden text-sm text-gray-500 sm:block">
        DASHBOARD / {path}
      </div>
      <div className="text-lg font-semibold sm:hidden">{title}</div>
      <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-green-700 text-lg font-bold text-white shadow-md">
        M
      </div>
    </header>
  );
};

const CardStats: React.FC<{
  title: string;
  count: number;
  color: string;
  icon: React.ElementType;
  detail: string;
  onClick: () => void;
}> = ({ title, count, color, icon: Icon, detail, onClick }) => (
  <div
    onClick={onClick}
    className={`min-h-40 min-w-[280px] flex-1 cursor-pointer overflow-hidden rounded-xl shadow-xl transition-transform hover:scale-[1.02]`}
    style={{ backgroundColor: color }}
  >
    <div className="flex items-center justify-between p-4">
      <div className="flex flex-col">
        <Icon className="h-8 w-8 text-white opacity-90" />
        <h3 className="mt-2 text-lg font-semibold text-white">{title}</h3>
      </div>
      <div className="text-5xl font-extrabold text-white">{count}</div>
    </div>
    <div
      className={`flex h-12 items-center justify-center text-sm font-medium text-white transition-all hover:brightness-125`}
      style={{
        backgroundColor: color.replace(')', ', 0.8)').replace('rgb(', 'rgba('),
      }}
    >
      {detail} &gt;
    </div>
  </div>
);

const Pagination: React.FC<{
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}> = ({ totalPages, currentPage, onPageChange }) => {
  const pages = useMemo(() => {
    const p = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) p.push(i);
    } else {
      p.push(1);
      if (currentPage > 3) p.push(-1);
      if (currentPage > 2 && currentPage < totalPages - 1) p.push(currentPage);
      if (currentPage < totalPages - 2) p.push(-1);
      p.push(totalPages);
    }
    return p.filter((v, i, a) => v !== -1 || a[i - 1] !== -1);
  }, [totalPages, currentPage]);

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center space-x-2 text-sm">
      <button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className="p-2 text-gray-500 hover:text-blue-500 disabled:opacity-50"
      >
        <ChevronsLeft className="h-4 w-4" />
      </button>
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="p-2 text-gray-500 hover:text-blue-500 disabled:opacity-50"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {pages.map((page, index) =>
        page === -1 ? (
          <span key={index} className="px-2 text-gray-500">
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`rounded-lg px-3 py-1 transition-colors ${
              page === currentPage
                ? 'bg-blue-500 font-bold text-white shadow-md'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            {page}
          </button>
        ),
      )}

      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="p-2 text-gray-500 hover:text-blue-500 disabled:opacity-50"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className="p-2 text-gray-500 hover:text-blue-500 disabled:opacity-50"
      >
        <ChevronsRight className="h-4 w-4" />
      </button>
    </div>
  );
};

// ====================================================================
// C. FUNGSI API SEDERHANA (Simple API Functions)
// ====================================================================

const normalizeItem = (endpoint: string, item: any) => {
  if (!item) return item;

  switch (endpoint) {
    case 'divisi':
      return {
        id: item.id_divisi ?? item.id,
        nama_divisi: item.nama_divisi,
        foto_divisi: item.foto_divisi,
      };
    case 'jabatan':
      return {
        id: item.id_jabatan ?? item.id,
        nama_jabatan: item.nama_jabatan,
      };
    case 'kepengurusan':
      return {
        id: item.id_btw ?? item.id,
        tahun_kerja: item.tahun_kerja,
        nama_kepengurusan: item.nama_kepengurusan,
      };
    case 'anggota':
      return {
        id: item.id_anggota ?? item.id,
        nama_anggota: item.nama_anggota,
        foto_anggota: item.foto_anggota,
        linkedin: item.linkedin,
        instagram: item.instagram,
      };
    case 'detail_anggota':
    case 'detail':
      return {
        id: item.id,
        anggota_id: item.id_anggota ?? item.anggota_id,
        kepengurusan_id: item.id_btw ?? item.kepengurusan_id,
        divisi_id: item.id_divisi ?? item.divisi_id,
        jabatan_id: item.id_jabatan ?? item.jabatan_id,
        anggota_nama: item.anggota?.nama_anggota ?? item.anggota_nama,
        kepengurusan_nama:
          item.kepengurusan?.nama_kepengurusan ?? item.kepengurusan_nama,
        divisi_nama: item.divisi?.nama_divisi ?? item.divisi_nama,
        jabatan_nama: item.jabatan?.nama_jabatan ?? item.jabatan_nama,
        foto_anggota: item.anggota?.foto_anggota ?? item.foto_anggota,
        linkedin: item.anggota?.linkedin ?? item.linkedin,
        instagram: item.anggota?.instagram ?? item.instagram,
      };
    default:
      return item;
  }
};

const resolveEndpoint = (endpoint: string) => {
  if (endpoint === 'detail_anggota') return 'detail';
  return endpoint;
};

const fetchDataFromAPI = async (endpoint: string) => {
  try {
    const resolved = resolveEndpoint(endpoint);
    console.log(`Mengambil data dari: ${API_BASE}/${endpoint}`);
    const response = await fetch(`${API_BASE}/${resolved}`);

    if (!response.ok) {
      console.error(`Error HTTP! status: ${response.status}`);
      return [];
    }

    const data = await response.json();
    console.log(`Data diterima dari ${endpoint}:`, data);

    if (Array.isArray(data))
      return data.map((item) => normalizeItem(endpoint, item));
    if (data && data.data && Array.isArray(data.data))
      return data.data.map((item: any) => normalizeItem(endpoint, item));

    console.error('Format data tidak dikenali:', data);
    return [];
  } catch (error) {
    console.error(`Error mengambil ${endpoint}:`, error);
    return [];
  }
};

const saveDataToAPI = async (endpoint: string, data: any, id?: number) => {
  try {
    const resolved = resolveEndpoint(endpoint);
    const url = id
      ? `${API_BASE}/${resolved}/${id}`
      : `${API_BASE}/${resolved}`;
    const method = id ? 'PUT' : 'POST';

    console.log(`Menyimpan ke: ${url}`, data);

    const response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log('Data berhasil disimpan:', result);

    // Normalisasi payload supaya selalu berupa objek data ter-normalisasi
    const raw = result?.data ?? result;
    return normalizeItem(endpoint, raw);
  } catch (error) {
    console.error(`Error menyimpan ${endpoint}:`, error);
    throw error;
  }
};

const deleteDataFromAPI = async (endpoint: string, id: number) => {
  try {
    const resolved = resolveEndpoint(endpoint);
    console.log(`Menghapus dari: ${API_BASE}/${resolved}/${id}`);
    const response = await fetch(`${API_BASE}/${resolved}/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) return false;

    // Jika API mengembalikan { success: boolean }, gunakan itu
    const result = await response.json().catch(() => null);
    return result?.success ?? true;
  } catch (error) {
    console.error(`Error menghapus ${endpoint}/${id}:`, error);
    return false;
  }
};

// ====================================================================
// D. KOMPONEN KEPENGURUSAN DENGAN API (Data Dasar)
// ====================================================================

const KepengurusanAdmin: React.FC = () => {
  const [data, setData] = useState<CrudKepengurusan[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<CrudKepengurusan | null>(null);
  const [itemToDeleteId, setItemToDeleteId] = useState<number | null>(null);
  const [tempTahun, setTempTahun] = useState('');
  const [tempNama, setTempNama] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadKepengurusan();
  }, []);

  const loadKepengurusan = async () => {
    setIsLoading(true);
    try {
      const kepengurusanData = await fetchDataFromAPI('kepengurusan');
      console.log('Data kepengurusan yang akan ditampilkan:', kepengurusanData);
      setData(kepengurusanData);
    } catch (error) {
      console.error('Gagal memuat data kepengurusan:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (item: CrudKepengurusan) => {
    setEditingItem(item);
    setTempTahun(item.tahun_kerja);
    setTempNama(item.nama_kepengurusan);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingItem(null);
    setTempTahun('');
    setTempNama('');
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    if (!tempNama || !tempTahun) return;

    setIsLoading(true);
    try {
      const saveData = {
        tahun_kerja: tempTahun,
        nama_kepengurusan: tempNama,
      };

      if (editingItem) {
        const updated = await saveDataToAPI(
          'kepengurusan',
          saveData,
          editingItem.id,
        );
        setData(data.map((p) => (p.id === editingItem.id ? updated : p)));
      } else {
        const newItem = await saveDataToAPI('kepengurusan', saveData);
        setData([...data, newItem]);
      }

      handleCloseModal();
    } catch (error) {
      console.error('Gagal menyimpan data:', error);
      alert('Gagal menyimpan data. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    setTempTahun('');
    setTempNama('');
  };

  const handleDeleteClick = (id: number) => {
    setItemToDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (itemToDeleteId !== null) {
      setIsLoading(true);
      try {
        const success = await deleteDataFromAPI('kepengurusan', itemToDeleteId);
        if (success) {
          setData(data.filter((p) => p.id !== itemToDeleteId));
        }
      } catch (error) {
        console.error('Gagal menghapus data:', error);
        alert('Gagal menghapus data. Silakan coba lagi.');
      } finally {
        setIsLoading(false);
      }
    }
    setIsDeleteModalOpen(false);
    setItemToDeleteId(null);
  };

  const itemsPerPage = 10;
  const currentPage = 1;
  const totalPages = Math.ceil(data.length / itemsPerPage);

  return (
    <div className="space-y-6 p-4 sm:p-8">
      <h2 className="text-xl font-bold text-gray-800 sm:text-2xl">
        KEPENGURUSAN
      </h2>

      <div className="flex items-center justify-between">
        <button
          onClick={handleAddNew}
          className="flex items-center space-x-2 rounded-lg bg-blue-500 px-4 py-2 font-semibold text-white shadow-md transition-colors hover:bg-blue-600"
          disabled={isLoading}
        >
          <Plus className="h-5 w-5" />
          <span>Tambah Baru</span>
        </button>
      </div>

      <div className="rounded-xl bg-white p-4 shadow-lg sm:p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between space-y-4 md:space-y-0">
          <div className="relative w-full md:w-1/3">
            <Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
            <input
              type="text"
              placeholder="Search Kepengurusan..."
              className="w-full rounded-xl border border-gray-300 p-3 pl-10 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>

        {isLoading && (
          <div className="flex min-h-[300px] items-center justify-center">
            <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-blue-500"></div>
          </div>
        )}

        {!isLoading && (
          <div className="min-h-[300px] overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                    TAHUN
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                    NAMA
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium tracking-wider text-gray-500 uppercase">
                    ACTION
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {data.length === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-6 py-4 text-center text-sm whitespace-nowrap text-gray-500"
                    >
                      Tidak ada data kepengurusan
                    </td>
                  </tr>
                ) : (
                  data.map((item) => (
                    <tr
                      key={item.id}
                      className="transition-colors hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-900">
                        {item.id}
                      </td>
                      <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                        {item.tahun_kerja}
                      </td>
                      <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                        {item.nama_kepengurusan}
                      </td>
                      <td className="px-6 py-4 text-center text-sm font-medium whitespace-nowrap">
                        <button
                          onClick={() => handleEdit(item)}
                          className="mr-3 rounded-full p-2 text-blue-600 hover:bg-blue-100 hover:text-blue-900"
                          disabled={isLoading}
                        >
                          <Edit className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(item.id)}
                          className="rounded-full p-2 text-red-600 hover:bg-red-100 hover:text-red-900"
                          disabled={isLoading}
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-6 flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
          <div className="text-sm text-gray-700">
            Menampilkan {data.length} entries.
          </div>
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={() => {}}
          />
        </div>
      </div>

      <CustomModal
        title={editingItem ? 'Edit Kepengurusan' : 'Tambah Kepengurusan Baru'}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      >
        <div className="space-y-4">
          <InputField
            label="TAHUN"
            value={tempTahun}
            onChange={setTempTahun}
            placeholder="2025"
            type="text"
          />
          <InputField
            label="NAMA"
            value={tempNama}
            onChange={setTempNama}
            placeholder="THE FIRST COMMIT"
          />
        </div>
        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={handleCloseModal}
            className={`rounded-lg px-6 py-2 font-semibold text-gray-700 transition-colors`}
            style={{ backgroundColor: BUTTON_GREY }}
            disabled={isLoading}
          >
            Batal
          </button>
          <button
            onClick={handleSave}
            className={`rounded-lg px-6 py-2 font-semibold text-white shadow-md transition-colors`}
            style={{ backgroundColor: BUTTON_BLUE }}
            disabled={!tempNama || !tempTahun || isLoading}
          >
            {isLoading
              ? 'Menyimpan...'
              : editingItem
                ? 'Simpan Perubahan'
                : 'Tambah Data'}
          </button>
        </div>
      </CustomModal>

      <ConfirmationModal
        title="Konfirmasi Hapus"
        message={`Apakah Anda yakin ingin menghapus kepengurusan dengan ID ${itemToDeleteId}? Data ini akan hilang secara permanen.`}
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

// ====================================================================
// E. KOMPONEN DIVISI DENGAN API & UPLOADTHING (Data Dasar)
// ====================================================================

const DivisiAdmin: React.FC = () => {
  const [data, setData] = useState<CrudDivisi[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<CrudDivisi | null>(null);
  const [itemToDeleteId, setItemToDeleteId] = useState<number | null>(null);
  const [tempNama, setTempNama] = useState('');
  const [tempFoto, setTempFoto] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Gunakan useUploadThing untuk imageUploader
  const { startUpload, isUploading } = useUploadThing('imageUploader', {
    onClientUploadComplete: (res) => {
      if (res && res[0]) {
        setTempFoto(res[0].url);
      }
      setSelectedFile(null);
      setUploadProgress(0);
    },
    onUploadProgress: (progress) => {
      setUploadProgress(progress);
    },
  });

  useEffect(() => {
    loadDivisi();
  }, []);

  const loadDivisi = async () => {
    setIsLoading(true);
    try {
      const divisiData = await fetchDataFromAPI('divisi');
      console.log('Data divisi yang akan ditampilkan:', divisiData);
      setData(divisiData);
    } catch (error) {
      console.error('Gagal memuat data divisi:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (item: CrudDivisi) => {
    setEditingItem(item);
    setTempNama(item.nama_divisi);
    setTempFoto(item.foto_divisi || '');
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingItem(null);
    setTempNama('');
    setTempFoto('');
    setIsModalOpen(true);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);

      // Preview image
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setTempFoto(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (!tempNama) return;

    setIsLoading(true);
    try {
      // Jika ada file yang dipilih, upload dulu
      let fotoUrl = tempFoto;
      if (selectedFile) {
        const uploadResult = await startUpload([selectedFile]);
        if (uploadResult && uploadResult[0]) {
          fotoUrl = uploadResult[0].url;
        }
      }

      // <-- perbaikan: kirim field sesuai API (nama_divisi)
      const saveData = {
        nama_divisi: tempNama,
        foto_divisi: fotoUrl ?? null,
      };

      if (editingItem) {
        const updated = await saveDataToAPI('divisi', saveData, editingItem.id);
        // handle kemungkinan response shape { success, data } atau langsung object
        const updatedItem = updated?.data ?? updated;
        setData(data.map((d) => (d.id === editingItem.id ? updatedItem : d)));
      } else {
        const newItem = await saveDataToAPI('divisi', saveData);
        const created = newItem?.data ?? newItem;
        setData([...data, created]);
      }

      handleCloseModal();
    } catch (error) {
      console.error('Gagal menyimpan data:', error);
      alert('Gagal menyimpan data. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    setTempNama('');
    setTempFoto('');
    setSelectedFile(null);
    setUploadProgress(0);
  };

  const handleDeleteClick = (id: number) => {
    setItemToDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (itemToDeleteId !== null) {
      setIsLoading(true);
      try {
        const success = await deleteDataFromAPI('divisi', itemToDeleteId);
        if (success) {
          setData(data.filter((d) => d.id !== itemToDeleteId));
        }
      } catch (error) {
        console.error('Gagal menghapus data:', error);
        alert('Gagal menghapus data. Silakan coba lagi.');
      } finally {
        setIsLoading(false);
      }
    }
    setIsDeleteModalOpen(false);
    setItemToDeleteId(null);
  };

  const itemsPerPage = 10;
  const currentPage = 1;
  const totalPages = Math.ceil(data.length / itemsPerPage);

  return (
    <div className="space-y-6 p-4 sm:p-8">
      <h2 className="text-xl font-bold text-gray-800 sm:text-2xl">DIVISI</h2>

      <div className="flex items-center justify-between">
        <button
          onClick={handleAddNew}
          className="flex items-center space-x-2 rounded-lg bg-blue-500 px-4 py-2 font-semibold text-white shadow-md transition-colors hover:bg-blue-600"
          disabled={isLoading}
        >
          <Plus className="h-5 w-5" />
          <span>Tambah Baru</span>
        </button>
      </div>

      <div className="rounded-xl bg-white p-4 shadow-lg sm:p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between space-y-4 md:space-y-0">
          <div className="relative w-full md:w-1/3">
            <Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
            <input
              type="text"
              placeholder="Search Divisi..."
              className="w-full rounded-xl border border-gray-300 p-3 pl-10 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>

        {isLoading && (
          <div className="flex h-64 items-center justify-center">
            <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-blue-500"></div>
          </div>
        )}

        {!isLoading && (
          <div className="min-h-[300px] overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                    NAMA DIVISI
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                    FOTO
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium tracking-wider text-gray-500 uppercase">
                    ACTION
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {data.length === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-6 py-4 text-center text-sm whitespace-nowrap text-gray-500"
                    >
                      Tidak ada data divisi
                    </td>
                  </tr>
                ) : (
                  data.map((item) => (
                    <tr
                      key={item.id}
                      className="transition-colors hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-900">
                        {item.id}
                      </td>
                      <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                        {item.nama_divisi}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item.foto_divisi ? (
                          <div className="h-10 w-10 overflow-hidden rounded-full">
                            <img
                              src={item.foto_divisi}
                              alt={item.nama_divisi}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200">
                            <ImageIcon className="h-5 w-5 text-gray-500" />
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center text-sm font-medium whitespace-nowrap">
                        <button
                          onClick={() => handleEdit(item)}
                          className="mr-3 rounded-full p-2 text-blue-600 hover:bg-blue-100 hover:text-blue-900"
                          disabled={isLoading}
                        >
                          <Edit className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(item.id)}
                          className="rounded-full p-2 text-red-600 hover:bg-red-100 hover:text-red-900"
                          disabled={isLoading}
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-6 flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
          <div className="text-sm text-gray-700">
            Menampilkan {data.length} entries.
          </div>
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={() => {}}
          />
        </div>
      </div>

      <CustomModal
        title={editingItem ? 'Edit Divisi' : 'Tambah Divisi Baru'}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      >
        <div className="space-y-4">
          <InputField
            label="NAMA DIVISI"
            value={tempNama}
            onChange={setTempNama}
            placeholder="UI UX DESIGNER"
          />

          <div className="mb-4">
            <label className="mb-1 block text-xs font-semibold text-gray-700 uppercase">
              FOTO DIVISI
            </label>
            <div className="space-y-3">
              {tempFoto && (
                <div className="flex justify-center">
                  <div className="h-32 w-32 overflow-hidden rounded-lg border">
                    <Image
                      src={tempFoto}
                      alt="Preview"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              )}

              <div className="flex items-center justify-center">
                <label className="cursor-pointer">
                  <div className="flex items-center space-x-2 rounded-lg bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600">
                    <Upload className="h-4 w-4" />
                    <span>Pilih Foto</span>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                    disabled={isUploading}
                  />
                </label>
              </div>

              {selectedFile && (
                <p className="text-center text-sm text-gray-600">
                  File: {selectedFile.name}
                </p>
              )}

              {isUploading && (
                <div className="space-y-2">
                  <div className="h-2 rounded-full bg-gray-200">
                    <div
                      className="h-2 rounded-full bg-blue-600 transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                  <p className="text-center text-xs text-gray-600">
                    {uploadProgress}%
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={handleCloseModal}
            className={`rounded-lg px-6 py-2 font-semibold text-gray-700 transition-colors`}
            style={{ backgroundColor: BUTTON_GREY }}
            disabled={isLoading || isUploading}
          >
            Batal
          </button>
          <button
            onClick={handleSave}
            className={`rounded-lg px-6 py-2 font-semibold text-white shadow-md transition-colors`}
            style={{ backgroundColor: BUTTON_BLUE }}
            disabled={!tempNama || isLoading || isUploading}
          >
            {isLoading || isUploading
              ? 'Menyimpan...'
              : editingItem
                ? 'Simpan Perubahan'
                : 'Tambah Data'}
          </button>
        </div>
      </CustomModal>

      <ConfirmationModal
        title="Konfirmasi Hapus"
        message={`Apakah Anda yakin ingin menghapus divisi ini? Data ini akan hilang secara permanen.`}
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

// ====================================================================
// F. KOMPONEN JABATAN DENGAN API (Data Dasar)
// ====================================================================

const JabatanAdmin: React.FC = () => {
  const [data, setData] = useState<CrudJabatan[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<CrudJabatan | null>(null);
  const [itemToDeleteId, setItemToDeleteId] = useState<number | null>(null);
  const [tempNama, setTempNama] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadJabatan();
  }, []);

  const loadJabatan = async () => {
    setIsLoading(true);
    try {
      const jabatanData = await fetchDataFromAPI('jabatan');
      console.log('Data jabatan yang akan ditampilkan:', jabatanData);
      setData(jabatanData);
    } catch (error) {
      console.error('Gagal memuat data jabatan:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (item: CrudJabatan) => {
    setEditingItem(item);
    setTempNama(item.nama_jabatan);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingItem(null);
    setTempNama('');
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    if (!tempNama) return;

    setIsLoading(true);
    try {
      const saveData = { nama_jabatan: tempNama };

      if (editingItem) {
        const updated = await saveDataToAPI(
          'jabatan',
          saveData,
          editingItem.id,
        );
        setData(data.map((j) => (j.id === editingItem.id ? updated : j)));
      } else {
        const newItem = await saveDataToAPI('jabatan', saveData);
        setData([...data, newItem]);
      }

      handleCloseModal();
    } catch (error) {
      console.error('Gagal menyimpan data:', error);
      alert('Gagal menyimpan data. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    setTempNama('');
  };

  const handleDeleteClick = (id: number) => {
    setItemToDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (itemToDeleteId !== null) {
      setIsLoading(true);
      try {
        const success = await deleteDataFromAPI('jabatan', itemToDeleteId);
        if (success) {
          setData(data.filter((j) => j.id !== itemToDeleteId));
        }
      } catch (error) {
        console.error('Gagal menghapus data:', error);
        alert('Gagal menghapus data. Silakan coba lagi.');
      } finally {
        setIsLoading(false);
      }
    }
    setIsDeleteModalOpen(false);
    setItemToDeleteId(null);
  };

  const itemsPerPage = 10;
  const currentPage = 1;
  const totalPages = Math.ceil(data.length / itemsPerPage);

  return (
    <div className="space-y-6 p-4 sm:p-8">
      <h2 className="text-xl font-bold text-gray-800 sm:text-2xl">JABATAN</h2>

      <div className="flex items-center justify-between">
        <button
          onClick={handleAddNew}
          className="flex items-center space-x-2 rounded-lg bg-blue-500 px-4 py-2 font-semibold text-white shadow-md transition-colors hover:bg-blue-600"
          disabled={isLoading}
        >
          <Plus className="h-5 w-5" />
          <span>Tambah Baru</span>
        </button>
      </div>

      <div className="rounded-xl bg-white p-4 shadow-lg sm:p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between space-y-4 md:space-y-0">
          <div className="relative w-full md:w-1/3">
            <Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
            <input
              type="text"
              placeholder="Search Jabatan..."
              className="w-full rounded-xl border border-gray-300 p-3 pl-10 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>

        {isLoading && (
          <div className="flex h-64 items-center justify-center">
            <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-blue-500"></div>
          </div>
        )}

        {!isLoading && (
          <div className="min-h-[300px] overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                    NAMA JABATAN
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium tracking-wider text-gray-500 uppercase">
                    ACTION
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {data.length === 0 ? (
                  <tr>
                    <td
                      colSpan={3}
                      className="px-6 py-4 text-center text-sm whitespace-nowrap text-gray-500"
                    >
                      Tidak ada data jabatan
                    </td>
                  </tr>
                ) : (
                  data.map((item) => (
                    <tr
                      key={item.id}
                      className="transition-colors hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-900">
                        {item.id}
                      </td>
                      <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                        {item.nama_jabatan}
                      </td>
                      <td className="px-6 py-4 text-center text-sm font-medium whitespace-nowrap">
                        <button
                          onClick={() => handleEdit(item)}
                          className="mr-3 rounded-full p-2 text-blue-600 hover:bg-blue-100 hover:text-blue-900"
                          disabled={isLoading}
                        >
                          <Edit className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(item.id)}
                          className="rounded-full p-2 text-red-600 hover:bg-red-100 hover:text-red-900"
                          disabled={isLoading}
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-6 flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
          <div className="text-sm text-gray-700">
            Menampilkan {data.length} entries.
          </div>
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={() => {}}
          />
        </div>
      </div>

      <CustomModal
        title={editingItem ? 'Edit Jabatan' : 'Tambah Jabatan Baru'}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      >
        <div className="space-y-4">
          <InputField
            label="NAMA JABATAN"
            value={tempNama}
            onChange={setTempNama}
            placeholder="KETUA"
          />
        </div>
        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={handleCloseModal}
            className={`rounded-lg px-6 py-2 font-semibold text-gray-700 transition-colors`}
            style={{ backgroundColor: BUTTON_GREY }}
            disabled={isLoading}
          >
            Batal
          </button>
          <button
            onClick={handleSave}
            className={`rounded-lg px-6 py-2 font-semibold text-white shadow-md transition-colors`}
            style={{ backgroundColor: BUTTON_BLUE }}
            disabled={!tempNama || isLoading}
          >
            {isLoading
              ? 'Menyimpan...'
              : editingItem
                ? 'Simpan Perubahan'
                : 'Tambah Data'}
          </button>
        </div>
      </CustomModal>

      <ConfirmationModal
        title="Konfirmasi Hapus"
        message={`Apakah Anda yakin ingin menghapus jabatan ini? Data ini akan hilang secara permanen.`}
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

// ====================================================================
// G. KOMPONEN ANGGOTA DENGAN API & UPLOADTHING (Data Dasar)
// ====================================================================

const AnggotaAdmin: React.FC = () => {
  const [data, setData] = useState<CrudAnggota[]>([]);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedAnggota, setSelectedAnggota] = useState<CrudAnggota | null>(
    null,
  );
  const [anggotaToDeleteId, setAnggotaToDeleteId] = useState<number | null>(
    null,
  );
  const [editingAnggota, setEditingAnggota] = useState<CrudAnggota | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Form State
  const EMPTY_ANGGOTA_FORM = useMemo(
    () => ({
      nama_anggota: '',
      linkedin: '',
      instagram: '',
      foto_anggota: '',
    }),
    [],
  );

  const [tempAnggota, setTempAnggota] = useState<any>(EMPTY_ANGGOTA_FORM);

  // Gunakan useUploadThing untuk avatarUploader
  const { startUpload, isUploading } = useUploadThing('avatarUploader', {
    onClientUploadComplete: (res) => {
      if (res && res[0]) {
        setTempAnggota({ ...tempAnggota, foto_anggota: res[0].url });
      }
      setSelectedFile(null);
      setUploadProgress(0);
    },
    onUploadProgress: (progress) => {
      setUploadProgress(progress);
    },
  });

  useEffect(() => {
    loadAnggota();
  }, []);

  const loadAnggota = async () => {
    setIsLoading(true);
    try {
      const anggotaData = await fetchDataFromAPI('anggota');
      console.log('Data anggota yang akan ditampilkan:', anggotaData);
      setData(anggotaData);
    } catch (error) {
      console.error('Gagal memuat data anggota:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);

      // Preview image
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setTempAnggota({
            ...tempAnggota,
            foto_anggota: event.target.result as string,
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // --- Handlers Modal Tambah/Edit ---
  const handleEdit = (anggota: CrudAnggota) => {
    setEditingAnggota(anggota);
    setTempAnggota({
      nama_anggota: anggota.nama_anggota,
      linkedin: anggota.linkedin || '',
      instagram: anggota.instagram || '',
      foto_anggota: anggota.foto_anggota || '',
    });
    setIsModalOpen(true);
    setIsProfileModalOpen(false);
    setSelectedFile(null);
  };

  const handleAddNew = () => {
    setEditingAnggota(null);
    setTempAnggota(EMPTY_ANGGOTA_FORM);
    setSelectedFile(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingAnggota(null);
    setTempAnggota(EMPTY_ANGGOTA_FORM);
    setSelectedFile(null);
    setUploadProgress(0);
  };

  const handleSave = async () => {
    if (!tempAnggota.nama_anggota) return;

    setIsLoading(true);
    try {
      let fotoUrl = tempAnggota.foto_anggota;

      // Jika ada file yang dipilih, upload dulu
      if (selectedFile) {
        const uploadResult = await startUpload([selectedFile]);
        if (uploadResult && uploadResult[0]) {
          fotoUrl = uploadResult[0].url;
        }
      }

      const saveData = {
        nama_anggota: tempAnggota.nama_anggota,
        linkedin: tempAnggota.linkedin,
        instagram: tempAnggota.instagram,
        foto_anggota: fotoUrl,
      };

      if (editingAnggota) {
        const updated = await saveDataToAPI(
          'anggota',
          saveData,
          editingAnggota.id,
        );
        setData(data.map((a) => (a.id === editingAnggota.id ? updated : a)));
      } else {
        const newItem = await saveDataToAPI('anggota', saveData);
        setData([...data, newItem]);
      }

      handleCloseModal();
    } catch (error) {
      console.error('Gagal menyimpan data:', error);
      alert('Gagal menyimpan data. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewProfile = (anggota: CrudAnggota) => {
    setSelectedAnggota(anggota);
    setIsProfileModalOpen(true);
  };

  const handleCloseProfileModal = () => {
    setIsProfileModalOpen(false);
    setSelectedAnggota(null);
  };

  const handleDeleteClick = (id: number) => {
    setAnggotaToDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (anggotaToDeleteId !== null) {
      setIsLoading(true);
      try {
        const success = await deleteDataFromAPI('anggota', anggotaToDeleteId);
        if (success) {
          setData(data.filter((a) => a.id !== anggotaToDeleteId));
        }
      } catch (error) {
        console.error('Gagal menghapus data:', error);
        alert('Gagal menghapus data. Silakan coba lagi.');
      } finally {
        setIsLoading(false);
      }
    }
    setIsDeleteModalOpen(false);
    setAnggotaToDeleteId(null);
  };

  const itemsPerPage = 10;
  const currentPage = 1;
  const totalPages = Math.ceil(data.length / itemsPerPage);

  return (
    <div className="space-y-6 p-4 sm:p-8">
      <h2 className="text-xl font-bold text-gray-800 sm:text-2xl">
        ANGGOTA (DATA DASAR)
      </h2>

      <div className="flex items-center justify-between">
        <button
          onClick={handleAddNew}
          className="flex items-center space-x-2 rounded-lg bg-blue-500 px-4 py-2 font-semibold text-white shadow-md transition-colors hover:bg-blue-600"
          disabled={isLoading}
        >
          <Plus className="h-5 w-5" />
          <span>Tambah Baru</span>
        </button>
      </div>

      <div className="rounded-xl bg-white p-4 shadow-lg sm:p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between space-y-4 md:space-y-0">
          <div className="relative w-full md:w-1/3">
            <Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
            <input
              type="text"
              placeholder="Search Anggota..."
              className="w-full rounded-xl border border-gray-300 p-3 pl-10 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>

        {isLoading && (
          <div className="flex h-64 items-center justify-center">
            <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-blue-500"></div>
          </div>
        )}

        {!isLoading && (
          <div className="min-h-[300px] overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                    NAMA ANGGOTA
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                    FOTO
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium tracking-wider text-gray-500 uppercase">
                    ACTION
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {data.length === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-6 py-4 text-center text-sm whitespace-nowrap text-gray-500"
                    >
                      Tidak ada data anggota
                    </td>
                  </tr>
                ) : (
                  data.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b border-gray-100 bg-white transition-colors hover:bg-gray-100"
                    >
                      <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-900">
                        {item.id}
                      </td>
                      <td className="px-6 py-4 text-sm whitespace-nowrap">
                        <span
                          className="flex cursor-pointer items-center text-blue-600 hover:underline"
                          onClick={() => handleViewProfile(item)}
                        >
                          <Eye className="mr-2 hidden h-4 w-4 sm:inline" />{' '}
                          {item.nama_anggota}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item.foto_anggota ? (
                          <div className="h-10 w-10 overflow-hidden rounded-full">
                            <img
                              src={item.foto_anggota}
                              alt={item.nama_anggota}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200">
                            <User className="h-5 w-5 text-gray-500" />
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center text-sm font-medium whitespace-nowrap">
                        <button
                          onClick={() => handleEdit(item)}
                          className="mr-3 rounded-full p-2 text-blue-600 hover:bg-blue-200 hover:text-blue-900"
                          disabled={isLoading}
                        >
                          <Edit className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(item.id)}
                          className="rounded-full p-2 text-red-600 hover:bg-red-200 hover:text-red-900"
                          disabled={isLoading}
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-6 flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
          <div className="text-sm text-gray-700">
            Menampilkan {data.length} entries.
          </div>
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={() => {}}
          />
        </div>
      </div>

      <CustomModal
        title={editingAnggota ? 'Edit Anggota' : 'Tambah Anggota Baru'}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      >
        <div className="space-y-4">
          <div className="mb-4">
            <label className="mb-1 block text-xs font-semibold text-gray-700 uppercase">
              FOTO ANGGOTA
            </label>
            <div className="space-y-3">
              {tempAnggota.foto_anggota && (
                <div className="flex justify-center">
                  <div className="h-32 w-32 overflow-hidden rounded-full border">
                    <img
                      src={tempAnggota.foto_anggota}
                      alt="Preview"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              )}

              <div className="flex items-center justify-center">
                <label className="cursor-pointer">
                  <div className="flex items-center space-x-2 rounded-lg bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600">
                    <Upload className="h-4 w-4" />
                    <span>Pilih Foto</span>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                    disabled={isUploading}
                  />
                </label>
              </div>

              {selectedFile && (
                <p className="text-center text-sm text-gray-600">
                  File: {selectedFile.name}
                </p>
              )}

              {isUploading && (
                <div className="space-y-2">
                  <div className="h-2 rounded-full bg-gray-200">
                    <div
                      className="h-2 rounded-full bg-blue-600 transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                  <p className="text-center text-xs text-gray-600">
                    {uploadProgress}%
                  </p>
                </div>
              )}
            </div>
          </div>

          <InputField
            label="NAMA LENGKAP"
            value={tempAnggota.nama_anggota}
            onChange={(v) =>
              setTempAnggota({ ...tempAnggota, nama_anggota: v })
            }
            placeholder="Nama Anggota"
          />

          <InputField
            label="LINKEDIN (URL)"
            value={tempAnggota.linkedin}
            onChange={(v) => setTempAnggota({ ...tempAnggota, linkedin: v })}
            placeholder="https://linkedin.com/in/..."
            type="url"
          />

          <InputField
            label="INSTAGRAM (URL)"
            value={tempAnggota.instagram}
            onChange={(v) => setTempAnggota({ ...tempAnggota, instagram: v })}
            placeholder="https://instagram.com/..."
            type="url"
          />
        </div>
        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={handleCloseModal}
            className={`rounded-lg px-6 py-2 font-semibold text-gray-700 transition-colors`}
            style={{ backgroundColor: BUTTON_GREY }}
            disabled={isLoading || isUploading}
          >
            Batal
          </button>
          <button
            onClick={handleSave}
            className={`rounded-lg px-6 py-2 font-semibold text-white shadow-md transition-colors`}
            style={{ backgroundColor: BUTTON_BLUE }}
            disabled={!tempAnggota.nama_anggota || isLoading || isUploading}
          >
            {isLoading || isUploading
              ? 'Menyimpan...'
              : editingAnggota
                ? 'Simpan Perubahan'
                : 'Tambah Anggota'}
          </button>
        </div>
      </CustomModal>

      <CustomModal
        title="Detail Profil Anggota"
        isOpen={isProfileModalOpen}
        onClose={handleCloseProfileModal}
      >
        {selectedAnggota && (
          <div className="flex flex-col items-start space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
            <div className="flex min-h-[150px] w-full flex-col items-center justify-center rounded-lg bg-gray-100 p-4 sm:w-1/3">
              {selectedAnggota.foto_anggota ? (
                <img
                  src={selectedAnggota.foto_anggota}
                  alt={selectedAnggota.nama_anggota}
                  className="h-24 w-24 rounded-full object-cover"
                />
              ) : (
                <User className="h-12 w-12 text-gray-500" />
              )}
            </div>
            <div className="flex-1 space-y-1">
              <h3 className="text-xl font-bold text-gray-900">
                {selectedAnggota.nama_anggota}
              </h3>
              <p className="mb-4 text-sm text-gray-500">
                ID Anggota: {selectedAnggota.id}
              </p>

              <div className="space-y-2 pt-2 text-sm">
                <p className="font-semibold text-gray-700">Linkedin</p>
                <a
                  href={selectedAnggota.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center wrap-break-word text-blue-600 hover:underline"
                >
                  <Link className="mr-1 h-4 w-4" />{' '}
                  {selectedAnggota.linkedin || 'Tidak ada'}
                </a>

                <p className="pt-2 font-semibold text-gray-700">Instagram</p>
                <a
                  href={selectedAnggota.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center wrap-break-word text-blue-600 hover:underline"
                >
                  <Link className="mr-1 h-4 w-4" />{' '}
                  {selectedAnggota.instagram || 'Tidak ada'}
                </a>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  title="Edit"
                  onClick={() => handleEdit(selectedAnggota)}
                  className="rounded-full p-2 text-blue-600 transition-colors hover:bg-blue-100 hover:text-blue-800"
                >
                  <Edit className="h-5 w-5" />
                </button>
                <button
                  title="Delete"
                  onClick={() => {
                    handleCloseProfileModal();
                    handleDeleteClick(selectedAnggota.id);
                  }}
                  className="rounded-full p-2 text-red-600 transition-colors hover:bg-red-100 hover:text-red-800"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </CustomModal>

      <ConfirmationModal
        title="Konfirmasi Hapus Anggota"
        message={`Apakah Anda yakin ingin menghapus anggota ini? Data ini akan hilang secara permanen.`}
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

// ====================================================================
// H. KOMPONEN DETAIL ANGGOTA (JOIN TABLE)
// ====================================================================

const DetailAnggotaAdmin: React.FC = () => {
  const [data, setData] = useState<DetailAnggota[]>([]);
  const [anggotaList, setAnggotaList] = useState<CrudAnggota[]>([]);
  const [kepengurusanList, setKepengurusanList] = useState<CrudKepengurusan[]>(
    [],
  );
  const [divisiList, setDivisiList] = useState<CrudDivisi[]>([]);
  const [jabatanList, setJabatanList] = useState<CrudJabatan[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<DetailAnggota | null>(null);
  const [itemToDeleteId, setItemToDeleteId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Form State
  const EMPTY_FORM = useMemo(
    () => ({
      anggota_id: '',
      kepengurusan_id: '',
      divisi_id: '',
      jabatan_id: '',
    }),
    [],
  );

  const [tempDetail, setTempDetail] = useState<any>(EMPTY_FORM);

  useEffect(() => {
    loadAllData();
  }, []);

  const enrichDetail = (detail: DetailAnggota) => ({
    ...detail,
    anggota_nama:
      anggotaList.find((a) => a.id === detail.anggota_id)?.nama_anggota ||
      detail.anggota_nama,
    kepengurusan_nama:
      kepengurusanList.find((k) => k.id === detail.kepengurusan_id)
        ?.nama_kepengurusan || detail.kepengurusan_nama,
    divisi_nama:
      divisiList.find((d) => d.id === detail.divisi_id)?.nama_divisi ||
      detail.divisi_nama,
    jabatan_nama:
      jabatanList.find((j) => j.id === detail.jabatan_id)?.nama_jabatan ||
      detail.jabatan_nama,
  });

  const loadAllData = async () => {
    setIsLoading(true);
    try {
      const [
        detailData,
        anggotaData,
        kepengurusanData,
        divisiData,
        jabatanData,
      ] = await Promise.all([
        fetchDataFromAPI('detail_anggota'),
        fetchDataFromAPI('anggota'),
        fetchDataFromAPI('kepengurusan'),
        fetchDataFromAPI('divisi'),
        fetchDataFromAPI('jabatan'),
      ]);

      const detailWithNames = detailData.map((item: DetailAnggota) => ({
        ...item,
        anggota_nama:
          anggotaData.find((a: CrudAnggota) => a.id === item.anggota_id)
            ?.nama_anggota || item.anggota_nama,
        kepengurusan_nama:
          kepengurusanData.find(
            (k: CrudKepengurusan) => k.id === item.kepengurusan_id,
          )?.nama_kepengurusan || item.kepengurusan_nama,
        divisi_nama:
          divisiData.find((d: CrudDivisi) => d.id === item.divisi_id)
            ?.nama_divisi || item.divisi_nama,
        jabatan_nama:
          jabatanData.find((j: CrudJabatan) => j.id === item.jabatan_id)
            ?.nama_jabatan || item.jabatan_nama,
      }));

      setData(detailWithNames);
      setAnggotaList(anggotaData);
      setKepengurusanList(kepengurusanData);
      setDivisiList(divisiData);
      setJabatanList(jabatanData);
    } catch (error) {
      console.error('Gagal memuat data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // --- Handlers Modal Tambah/Edit ---
  const handleEdit = (item: DetailAnggota) => {
    setEditingItem(item);
    setTempDetail({
      anggota_id: item.anggota_id.toString(),
      kepengurusan_id: item.kepengurusan_id.toString(),
      divisi_id: item.divisi_id.toString(),
      jabatan_id: item.jabatan_id.toString(),
    });
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingItem(null);
    setTempDetail(EMPTY_FORM);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    setTempDetail(EMPTY_FORM);
  };

  const handleSave = async () => {
    if (
      !tempDetail.anggota_id ||
      !tempDetail.kepengurusan_id ||
      !tempDetail.divisi_id ||
      !tempDetail.jabatan_id
    ) {
      alert('Harap isi semua field!');
      return;
    }

    setIsLoading(true);
    try {
      const saveData = {
        anggota_id: parseInt(tempDetail.anggota_id),
        kepengurusan_id: parseInt(tempDetail.kepengurusan_id),
        divisi_id: parseInt(tempDetail.divisi_id),
        jabatan_id: parseInt(tempDetail.jabatan_id),
      };

      if (editingItem) {
        const updated = await saveDataToAPI(
          'detail_anggota',
          saveData,
          editingItem.id,
        );
        const enriched = enrichDetail(updated);
        setData(data.map((d) => (d.id === editingItem.id ? enriched : d)));
      } else {
        const newItem = await saveDataToAPI('detail_anggota', saveData);
        const enriched = enrichDetail(newItem);
        setData([...data, enriched]);
      }

      handleCloseModal();
    } catch (error) {
      console.error('Gagal menyimpan data:', error);
      alert('Gagal menyimpan data. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteClick = (id: number) => {
    setItemToDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (itemToDeleteId !== null) {
      setIsLoading(true);
      try {
        const success = await deleteDataFromAPI(
          'detail_anggota',
          itemToDeleteId,
        );
        if (success) {
          setData(data.filter((d) => d.id !== itemToDeleteId));
        }
      } catch (error) {
        console.error('Gagal menghapus data:', error);
        alert('Gagal menghapus data. Silakan coba lagi.');
      } finally {
        setIsLoading(false);
      }
    }
    setIsDeleteModalOpen(false);
    setItemToDeleteId(null);
  };

  const SelectField: React.FC<{
    label: string;
    value: string;
    onChange: (v: string) => void;
    options: { id: number; name: string }[];
  }> = ({ label, value, onChange, options }) => (
    <div className="mb-4">
      <label className="mb-1 block text-xs font-semibold text-gray-700 uppercase">
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none rounded-lg border border-gray-300 bg-gray-100 p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <option value="">Pilih {label}</option>
          {options.map((opt) => (
            <option key={opt.id} value={opt.id}>
              {opt.name}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 transform text-gray-500" />
      </div>
    </div>
  );

  const itemsPerPage = 10;
  const currentPage = 1;
  const totalPages = Math.ceil(data.length / itemsPerPage);

  return (
    <div className="space-y-6 p-4 sm:p-8">
      <h2 className="text-xl font-bold text-gray-800 sm:text-2xl">
        DETAIL ANGGOTA (JOIN DATA)
      </h2>

      <div className="flex items-center justify-between">
        <button
          onClick={handleAddNew}
          className="flex items-center space-x-2 rounded-lg bg-blue-500 px-4 py-2 font-semibold text-white shadow-md transition-colors hover:bg-blue-600"
          disabled={isLoading}
        >
          <Plus className="h-5 w-5" />
          <span>Tambah Baru</span>
        </button>
      </div>

      <div className="rounded-xl bg-white p-4 shadow-lg sm:p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between space-y-4 md:space-y-0">
          <div className="relative w-full md:w-1/3">
            <Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
            <input
              type="text"
              placeholder="Search Detail Anggota..."
              className="w-full rounded-xl border border-gray-300 p-3 pl-10 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>

        {isLoading && (
          <div className="flex h-64 items-center justify-center">
            <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-blue-500"></div>
          </div>
        )}

        {!isLoading && (
          <div className="min-h-[300px] overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                    NAMA ANGGOTA
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                    KEPENGURUSAN
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                    JABATAN
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                    DIVISI
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium tracking-wider text-gray-500 uppercase">
                    ACTION
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {data.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-4 text-center text-sm whitespace-nowrap text-gray-500"
                    >
                      Tidak ada data detail anggota
                    </td>
                  </tr>
                ) : (
                  data.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b border-gray-100 bg-white transition-colors hover:bg-gray-100"
                    >
                      <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-900">
                        {item.id}
                      </td>
                      <td className="px-6 py-4 text-sm whitespace-nowrap">
                        {item.anggota_nama || 'N/A'}
                      </td>
                      <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                        {item.kepengurusan_nama || 'N/A'}
                      </td>
                      <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                        {item.jabatan_nama || 'N/A'}
                      </td>
                      <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                        {item.divisi_nama || 'N/A'}
                      </td>
                      <td className="px-6 py-4 text-center text-sm font-medium whitespace-nowrap">
                        <button
                          onClick={() => handleEdit(item)}
                          className="mr-3 rounded-full p-2 text-blue-600 hover:bg-blue-200 hover:text-blue-900"
                          disabled={isLoading}
                        >
                          <Edit className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(item.id)}
                          className="rounded-full p-2 text-red-600 hover:bg-red-200 hover:text-red-900"
                          disabled={isLoading}
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-6 flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
          <div className="text-sm text-gray-700">
            Menampilkan {data.length} entries.
          </div>
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={() => {}}
          />
        </div>
      </div>

      <CustomModal
        title={
          editingItem ? 'Edit Detail Anggota' : 'Tambah Detail Anggota Baru'
        }
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      >
        <div className="space-y-4">
          <SelectField
            label="ANGGOTA"
            value={tempDetail.anggota_id}
            onChange={(v) => setTempDetail({ ...tempDetail, anggota_id: v })}
            options={anggotaList.map((a) => ({
              id: a.id,
              name: a.nama_anggota,
            }))}
          />

          <SelectField
            label="KEPENGURUSAN"
            value={tempDetail.kepengurusan_id}
            onChange={(v) =>
              setTempDetail({ ...tempDetail, kepengurusan_id: v })
            }
            options={kepengurusanList.map((p) => ({
              id: p.id,
              name: p.nama_kepengurusan,
            }))}
          />

          <SelectField
            label="JABATAN"
            value={tempDetail.jabatan_id}
            onChange={(v) => setTempDetail({ ...tempDetail, jabatan_id: v })}
            options={jabatanList.map((j) => ({
              id: j.id,
              name: j.nama_jabatan,
            }))}
          />

          <SelectField
            label="DIVISI"
            value={tempDetail.divisi_id}
            onChange={(v) => setTempDetail({ ...tempDetail, divisi_id: v })}
            options={divisiList.map((d) => ({ id: d.id, name: d.nama_divisi }))}
          />
        </div>
        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={handleCloseModal}
            className={`rounded-lg px-6 py-2 font-semibold text-gray-700 transition-colors`}
            style={{ backgroundColor: BUTTON_GREY }}
            disabled={isLoading}
          >
            Batal
          </button>
          <button
            onClick={handleSave}
            className={`rounded-lg px-6 py-2 font-semibold text-white shadow-md transition-colors`}
            style={{ backgroundColor: BUTTON_BLUE }}
            disabled={
              !tempDetail.anggota_id ||
              !tempDetail.kepengurusan_id ||
              !tempDetail.divisi_id ||
              !tempDetail.jabatan_id ||
              isLoading
            }
          >
            {isLoading
              ? 'Menyimpan...'
              : editingItem
                ? 'Simpan Perubahan'
                : 'Tambah Data'}
          </button>
        </div>
      </CustomModal>

      <ConfirmationModal
        title="Konfirmasi Hapus Detail"
        message={`Apakah Anda yakin ingin menghapus detail anggota ini? Data ini akan hilang secara permanen.`}
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

// ====================================================================
// I. DASHBOARD HOME
// ====================================================================

const DashboardHome: React.FC<{ onNavigate: (page: Page) => void }> = ({
  onNavigate,
}) => {
  const [stats, setStats] = useState({
    totalAnggota: 0,
    totalDivisi: 0,
    totalKepengurusan: 0,
    totalJabatan: 0,
    totalDetailAnggota: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    setIsLoading(true);
    try {
      const [anggota, divisi, kepengurusan, jabatan, detailAnggota] =
        await Promise.all([
          fetchDataFromAPI('anggota'),
          fetchDataFromAPI('divisi'),
          fetchDataFromAPI('kepengurusan'),
          fetchDataFromAPI('jabatan'),
          fetchDataFromAPI('detail_anggota'),
        ]);

      setStats({
        totalAnggota: anggota.length,
        totalDivisi: divisi.length,
        totalKepengurusan: kepengurusan.length,
        totalJabatan: jabatan.length,
        totalDetailAnggota: detailAnggota.length,
      });
    } catch (error) {
      console.error('Gagal memuat statistik:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-69px)] space-y-8 rounded-xl bg-white p-4 shadow-xl sm:p-8">
        <h2 className="mb-6 text-xl font-bold text-gray-800 sm:text-2xl">
          Dashboard Admin Web CODE124
        </h2>
        <div className="flex h-64 items-center justify-center">
          <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-69px)] space-y-8 rounded-xl bg-white p-4 shadow-xl sm:p-8">
      <h2 className="mb-6 text-xl font-bold text-gray-800 sm:text-2xl">
        Dashboard Admin Web CODE124
      </h2>

      <div className="flex flex-wrap justify-center gap-4 sm:justify-start sm:gap-6">
        <CardStats
          title="Kepengurusan"
          count={stats.totalKepengurusan}
          color="#f59e0b"
          icon={Briefcase}
          detail="Lihat Detail"
          onClick={() => onNavigate('kepengurusan')}
        />
        <CardStats
          title="Divisi"
          count={stats.totalDivisi}
          color="#34d399"
          icon={List}
          detail="Lihat Detail"
          onClick={() => onNavigate('divisi')}
        />
        <CardStats
          title="Anggota"
          count={stats.totalAnggota}
          color="#059669"
          icon={Users}
          detail="Lihat Detail"
          onClick={() => onNavigate('anggota')}
        />
        <CardStats
          title="Jabatan"
          count={stats.totalJabatan}
          color="#3b82f6"
          icon={Briefcase}
          detail="Lihat Detail"
          onClick={() => onNavigate('jabatan')}
        />
        <CardStats
          title="Detail Anggota"
          count={stats.totalDetailAnggota}
          color="#8b5cf6"
          icon={User}
          detail="Lihat Detail"
          onClick={() => onNavigate('detail_anggota')}
        />
      </div>
    </div>
  );
};

// ====================================================================
// J. KOMPONEN UTAMA
// ====================================================================

function Dashboard() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const renderContent = () => {
    switch (currentPage) {
      case 'home':
        return <DashboardHome onNavigate={setCurrentPage} />;
      case 'kepengurusan':
        return <KepengurusanAdmin />;
      case 'divisi':
        return <DivisiAdmin />;
      case 'anggota':
        return <AnggotaAdmin />;
      case 'jabatan':
        return <JabatanAdmin />;
      case 'detail_anggota':
        return <DetailAnggotaAdmin />;
      default:
        return <DashboardHome onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div
      className="flex min-h-screen font-sans"
      style={{ backgroundColor: LIGHT_BACKGROUND }}
    >
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />
      <div className="flex flex-1 flex-col overflow-x-hidden">
        <Header currentPage={currentPage} />
        <main className="flex-1 p-4 sm:p-6">
          <div className="min-h-full">{renderContent()}</div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
