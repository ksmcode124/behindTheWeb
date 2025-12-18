'use client';
import React, { useState, useMemo } from 'react';
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
  ChevronUp,
  AlertTriangle,
} from 'lucide-react';

// ====================================================================
// A. KONSTANTA, TIPE DATA, DAN DATA DUMMY (Constants, Types, & Mock Data)
// ====================================================================

// --- TIPE DATA UTAMA (Main Data Types) ---

type Page =
  | 'login'
  | 'home'
  | 'kepengurusan'
  | 'divisi'
  | 'anggota'
  | 'jabatan';

interface MenuItem {
  name: string;
  icon: React.ElementType;
  page: Page;
}

interface Pengurus {
  id: number;
  tahun: number;
  nama: string;
}

interface Divisi {
  id: number;
  nama: string;
}

interface Jabatan {
  id: number;
  nama: string;
}

interface Anggota {
  id: number;
  nama: string;
  kepengurusan: string;
  jabatan: string;
  divisi: string;
  isExpanded: boolean;
  details: {
    linkedin: string;
    instagram: string;
  };
}

// --- DATA DUMMY (Mockup Data) ---

const MOCK_PENGURUSAN: Pengurus[] = [
  { id: 111, tahun: 2025, nama: 'THE FIRST COMMIT' },
  { id: 222, tahun: 2024, nama: 'KOMUNITAS WEB' },
  { id: 333, tahun: 2023, nama: 'GENERASI SATU' },
];

const MOCK_DIVISI: Divisi[] = [
  { id: 111, nama: 'UI UX DESIGNER' },
  { id: 222, nama: 'FRONT END DEVELOPER' },
  { id: 333, nama: 'BACK END DEVELOPER' },
  { id: 444, nama: 'FULL STACK ENGINEER' },
  { id: 555, nama: 'MARKETING & PROMOTION' },
];

const MOCK_JABATAN: Jabatan[] = [
  { id: 111, nama: 'KETUA' },
  { id: 222, nama: 'WAKIL' },
  { id: 333, nama: 'KADIV' },
  { id: 444, nama: 'STAFF' },
  { id: 555, nama: 'MENTOR' },
];

const MOCK_ANGGOTA: Anggota[] = [
  {
    id: 111,
    nama: 'BARITA DAVITYA',
    kepengurusan: 'THE FIRST COMMIT',
    jabatan: 'KETUA',
    divisi: 'INTI',
    isExpanded: false,
    details: {
      linkedin: 'https://linkedin.com/in/barita',
      instagram: 'https://instagram.com/barita',
    },
  },
  {
    id: 222,
    nama: 'NOBEL WURJAYATMA',
    kepengurusan: 'KOMUNITAS WEB',
    jabatan: 'WAKIL KETUA',
    divisi: 'INTI',
    isExpanded: false,
    details: {
      linkedin: 'https://linkedin.com/in/nobel',
      instagram: 'https://instagram.com/nobel',
    },
  },
  {
    id: 333,
    nama: 'RIFKI DWI PRATAMA',
    kepengurusan: 'THE FIRST COMMIT',
    jabatan: 'STAFF',
    divisi: 'FRONT END DEVELOPER',
    isExpanded: false,
    details: {
      linkedin: 'https://linkedin.com/in/rifki',
      instagram: 'https://instagram.com/rifki',
    },
  },
];

const DASHBOARD_DATA = [
  { name: '2023 Generasi Satu', count: 28, height: 'h-1/2' },
  { name: '2024 Komunitas Web', count: 34, height: 'h-3/5' },
  { name: '2025 The First Commit', count: 42, height: 'h-4/5' },
];

// --- KONSTANTA WARNA UTAMA ---
const PRIMARY_COLOR = '#0f3148'; // Warna Sidebar (Dark Teal/Blue)
const LIGHT_BACKGROUND = '#e0f7ff'; // Warna Background Halaman (Light Cyan/Blue)
const BUTTON_BLUE = '#3b82f6'; // Warna tombol Save Change
const BUTTON_GREY = '#d1d5db'; // Warna tombol Cancel

// ====================================================================
// B. KOMPONEN BERSAMA & LAYOUT (Shared & Layout Components)
// ====================================================================

// --- 1. MODAL DAN INPUT REUSABLE ---

// Modal Umum untuk Form Edit/Tambah
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

// Modal Konfirmasi Hapus
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

// Komponen Input Field Reusable
const InputField: React.FC<{
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  type?: 'text' | 'number';
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

// --- 2. KOMPONEN NAVIGASI & LAYOUT ---

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
  ];

  return (
    <>
      {/* Tombol Menu untuk Mobile */}
      <button
        className="fixed top-4 left-4 z-50 rounded-full p-2 text-white shadow-lg lg:hidden"
        style={{ backgroundColor: PRIMARY_COLOR }}
        onClick={() => setIsSidebarOpen(true)}
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Overlay untuk Mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black opacity-50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar - Penuh pada desktop, modal pada mobile */}
      <div
        className={`fixed inset-y-0 left-0 z-50 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} flex min-h-screen w-[250px] flex-col justify-between text-white shadow-2xl transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0`}
        style={{ backgroundColor: PRIMARY_COLOR }}
      >
        {/* Tombol Tutup untuk Mobile */}
        <button
          className="absolute top-4 right-4 z-50 text-white hover:text-yellow-400 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        >
          <X className="h-6 w-6" />
        </button>

        <div>
          <div className="flex items-center space-x-2 border-b border-white/10 p-6">
            {/* Logo Placeholder */}
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
            onNavigate('login');
            setIsSidebarOpen(false);
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
      {/* Profile Icon Placeholder */}
      <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-green-700 text-lg font-bold text-white shadow-md">
        M
      </div>
    </header>
  );
};

// --- 3. KOMPONEN DATA & PAGINASI ---

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

// Komponen Pagination Reusable
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
      if (currentPage > 3) p.push(-1); // ...
      if (currentPage > 2 && currentPage < totalPages - 1) p.push(currentPage);
      if (currentPage < totalPages - 2) p.push(-1); // ...
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
// C. KOMPONEN HALAMAN (Page Components)
// ====================================================================

// --- 1. LOGIN PAGE ---

const LoginPage: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  const [email, setEmail] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');

  const handleLogin = () => {
    const validEmail = 'admin';
    const validPassword = 'admin123';

    setError('');

    if (email === validEmail && password === validPassword) {
      onLogin();
    } else {
      setError('ID/Email atau Password salah. (Hint: admin / admin123)');
    }
  };

  return (
    <div
      className="flex min-h-screen flex-col font-sans"
      style={{ backgroundColor: LIGHT_BACKGROUND }}
    >
      <header
        className="flex items-center p-4 text-white shadow-lg"
        style={{ backgroundColor: PRIMARY_COLOR }}
      >
        {/* Logo Placeholder */}
        <div className="flex h-8 w-8 rotate-12 transform items-center justify-center rounded-full bg-white/20 text-sm font-bold text-white">
          <div className="h-4 w-4 -rotate-12 transform rounded-sm bg-white"></div>
        </div>
        <h1 className="ml-2 text-xl font-bold sm:text-2xl">ADMIN DASHBOARD</h1>
      </header>
      <main className="flex grow items-center justify-center p-4">
        <div
          className="w-full max-w-sm rounded-2xl p-8 shadow-2xl"
          style={{ backgroundColor: PRIMARY_COLOR }}
        >
          <h2 className="mb-8 text-center font-serif text-3xl text-white italic">
            Login
          </h2>
          <div className="space-y-6">
            <div>
              <label className="mb-2 block font-medium text-white">
                ID atau Email
              </label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                // FIX: Tambahkan suppressHydrationWarning untuk mengabaikan atribut injeksi eksternal (seperti fdprocessedid)
                suppressHydrationWarning={true}
                className="w-full rounded-lg border-2 border-transparent bg-white p-3 text-gray-800 focus:border-blue-500 focus:ring-0 focus:outline-none"
                placeholder="admin"
              />
            </div>
            <div>
              <label className="mb-2 block font-medium text-white">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                // FIX: Tambahkan suppressHydrationWarning
                suppressHydrationWarning={true}
                className="w-full rounded-lg border-2 border-transparent bg-white p-3 text-gray-800 focus:border-blue-500 focus:ring-0 focus:outline-none"
                placeholder="admin123"
              />
            </div>
            {error && (
              <div className="rounded-lg bg-red-500 p-3 text-center text-sm font-medium text-white shadow-md">
                {error}
              </div>
            )}
            <button
              onClick={handleLogin}
              // FIX: Tambahkan suppressHydrationWarning
              suppressHydrationWarning={true}
              className="mt-4 w-full rounded-lg py-3 text-lg font-bold text-gray-800 shadow-xl transition-all hover:brightness-110"
              style={{ backgroundColor: '#ffae00' }} // Warna orange pada contoh
            >
              Login
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

// --- 2. DASHBOARD HOME ---
const DashboardHome: React.FC<{ onNavigate: (page: Page) => void }> = ({
  onNavigate,
}) => {
  const totalAnggota = MOCK_ANGGOTA.length;
  const totalKepengurusan = MOCK_PENGURUSAN.length;
  const totalDivisi = MOCK_DIVISI.length;

  return (
    <div className="min-h-[calc(100vh-69px)] space-y-8 rounded-xl bg-white p-4 shadow-xl sm:p-8">
      <h2 className="mb-6 text-xl font-bold text-gray-800 sm:text-2xl">
        Dashboard Admin Web CODE124
      </h2>

      {/* Kartu Statistik */}
      <div className="flex flex-wrap justify-center gap-4 sm:justify-start sm:gap-6">
        <CardStats
          title="Kepengurusan"
          count={totalKepengurusan}
          color="#f59e0b" // Orange-500
          icon={Briefcase}
          detail="Lihat Detail"
          onClick={() => onNavigate('kepengurusan')}
        />
        <CardStats
          title="Divisi"
          count={totalDivisi}
          color="#34d399" // Green-400
          icon={List}
          detail="Lihat Detail"
          onClick={() => onNavigate('divisi')}
        />
        <CardStats
          title="Anggota"
          count={totalAnggota}
          color="#059669" // Emerald-600
          icon={Users}
          detail="Lihat Detail"
          onClick={() => onNavigate('anggota')}
        />
      </div>

      {/* Grafik - Dibuat dengan Tailwind CSS sebagai pengganti recharts */}
      <div className="mt-8 h-96 w-full max-w-full rounded-xl bg-white p-4 shadow-lg sm:p-6 lg:max-w-xl">
        <h3 className="mb-6 text-lg font-semibold text-gray-800">
          Jumlah Anggota per Kepengurusan
        </h3>
        <div className="flex h-full flex-col justify-end">
          <div className="flex h-4/5 items-end justify-around border-b border-gray-300 pb-2">
            {DASHBOARD_DATA.map((item, index) => (
              <div
                key={index}
                className="group flex h-full w-1/4 flex-col items-center justify-end"
              >
                <div
                  className={`w-2/3 rounded-t-lg bg-indigo-600 transition-all duration-500 ease-in-out ${item.height} relative shadow-lg hover:bg-indigo-700`}
                >
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-8 transform rounded-md bg-gray-700 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
                    {item.count} Anggota
                  </div>
                </div>
                <p className="mt-2 w-full text-center text-xs text-gray-600">
                  {item.name.split(' ')[0]}
                </p>
              </div>
            ))}
          </div>
          <div className="flex justify-around pt-2 text-xs text-gray-500">
            {DASHBOARD_DATA.map((item, index) => (
              <p key={index} className="w-1/4 text-center">
                {item.name.split(' ').slice(1).join(' ')}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- 3. KEPENGURUSAN (Term) ---

const KepengurusanAdmin: React.FC = () => {
  const [data, setData] = useState<Pengurus[]>(MOCK_PENGURUSAN);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Pengurus | null>(null);
  const [itemToDeleteId, setItemToDeleteId] = useState<number | null>(null);
  const [tempTahun, setTempTahun] = useState('');
  const [tempNama, setTempNama] = useState('');

  const handleEdit = (item: Pengurus) => {
    setEditingItem(item);
    setTempTahun(item.tahun.toString());
    setTempNama(item.nama);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingItem(null);
    setTempTahun('');
    setTempNama('');
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (!tempNama || !tempTahun) return;

    if (editingItem) {
      setData(
        data.map((p) =>
          p.id === editingItem.id
            ? { ...p, tahun: parseInt(tempTahun), nama: tempNama }
            : p,
        ),
      );
    } else {
      const newId = Math.max(...data.map((d) => d.id)) + 1;
      const newItem: Pengurus = {
        id: newId,
        tahun: parseInt(tempTahun),
        nama: tempNama,
      };
      setData([...data, newItem]);
    }
    handleCloseModal();
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

  const handleConfirmDelete = () => {
    if (itemToDeleteId !== null) {
      setData(data.filter((p) => p.id !== itemToDeleteId));
    }
    setIsDeleteModalOpen(false);
    setItemToDeleteId(null);
  };

  // Pagination & Search placeholder
  const itemsPerPage = 10;
  const currentPage = 1;
  const totalPages = Math.ceil(data.length / itemsPerPage);

  return (
    <div className="space-y-6 p-4 sm:p-8">
      <h2 className="text-xl font-bold text-gray-800 sm:text-2xl">
        KEPENGURUSAN
      </h2>

      {/* Area Kontrol & Tambah Baru */}
      <div className="flex items-center justify-between">
        <button
          onClick={handleAddNew}
          className="flex items-center space-x-2 rounded-lg bg-blue-500 px-4 py-2 font-semibold text-white shadow-md transition-colors hover:bg-blue-600"
        >
          <Plus className="h-5 w-5" />
          <span>Tambah Baru</span>
        </button>
      </div>

      {/* Kontainer Utama Data */}
      <div className="rounded-xl bg-white p-4 shadow-lg sm:p-6">
        {/* Filter/Search Bar */}
        <div className="mb-4 flex flex-wrap items-center justify-between space-y-4 md:space-y-0">
          <div className="relative w-full md:w-1/3">
            <Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
            <input
              type="text"
              placeholder="Search Kepengurusan..."
              className="w-full rounded-xl border border-gray-300 p-3 pl-10 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          {/* Placeholder Filter/Sort */}
        </div>

        {/* Tabel Data */}
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
              {data.map((item) => (
                <tr
                  key={item.id}
                  className="transition-colors hover:bg-gray-50"
                >
                  <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-900">
                    {item.id}
                  </td>
                  <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                    {item.tahun}
                  </td>
                  <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                    {item.nama}
                  </td>
                  <td className="px-6 py-4 text-center text-sm font-medium whitespace-nowrap">
                    <button
                      onClick={() => handleEdit(item)}
                      className="mr-3 rounded-full p-2 text-blue-600 hover:bg-blue-100 hover:text-blue-900"
                    >
                      <Edit className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(item.id)}
                      className="rounded-full p-2 text-red-600 hover:bg-red-100 hover:text-red-900"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination & Show Entries */}
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

      {/* Pop-up Edit Kepengurusan (Modal) */}
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
            type="number"
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
          >
            Batal
          </button>
          <button
            onClick={handleSave}
            className={`rounded-lg px-6 py-2 font-semibold text-white shadow-md transition-colors`}
            style={{ backgroundColor: BUTTON_BLUE }}
            disabled={!tempNama || !tempTahun}
          >
            {editingItem ? 'Simpan Perubahan' : 'Tambah Data'}
          </button>
        </div>
      </CustomModal>

      {/* Modal Konfirmasi Hapus */}
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

// --- 4. DIVISI ---

const DivisiAdmin: React.FC = () => {
  const [data, setData] = useState<Divisi[]>(MOCK_DIVISI);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Divisi | null>(null);
  const [itemToDeleteId, setItemToDeleteId] = useState<number | null>(null);
  const [tempNama, setTempNama] = useState('');

  const handleEdit = (item: Divisi) => {
    setEditingItem(item);
    setTempNama(item.nama);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingItem(null);
    setTempNama('');
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (!tempNama) return;

    if (editingItem) {
      setData(
        data.map((d) =>
          d.id === editingItem.id ? { ...d, nama: tempNama } : d,
        ),
      );
    } else {
      const newId = Math.max(...data.map((d) => d.id)) + 1;
      const newItem: Divisi = { id: newId, nama: tempNama };
      setData([...data, newItem]);
    }
    handleCloseModal();
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

  const handleConfirmDelete = () => {
    if (itemToDeleteId !== null) {
      setData(data.filter((d) => d.id !== itemToDeleteId));
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
        >
          <Plus className="h-5 w-5" />
          <span>Tambah Baru</span>
        </button>
      </div>

      <div className="rounded-xl bg-white p-4 shadow-lg sm:p-6">
        {/* Filter/Search Bar */}
        <div className="mb-4 flex flex-wrap items-center justify-between space-y-4 md:space-y-0">
          <div className="relative w-full md:w-1/3">
            <Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
            <input
              type="text"
              placeholder="Search Divisi..."
              className="w-full rounded-xl border border-gray-300 p-3 pl-10 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          {/* Placeholder Filter/Sort */}
        </div>

        {/* Tabel Data */}
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
                <th className="px-6 py-3 text-center text-xs font-medium tracking-wider text-gray-500 uppercase">
                  ACTION
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {data.map((item) => (
                <tr
                  key={item.id}
                  className="transition-colors hover:bg-gray-50"
                >
                  <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-900">
                    {item.id}
                  </td>
                  <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                    {item.nama}
                  </td>
                  <td className="px-6 py-4 text-center text-sm font-medium whitespace-nowrap">
                    <button
                      onClick={() => handleEdit(item)}
                      className="mr-3 rounded-full p-2 text-blue-600 hover:bg-blue-100 hover:text-blue-900"
                    >
                      <Edit className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(item.id)}
                      className="rounded-full p-2 text-red-600 hover:bg-red-100 hover:text-red-900"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination & Show Entries */}
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

      {/* Pop-up Edit Divisi (Modal) */}
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
        </div>
        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={handleCloseModal}
            className={`rounded-lg px-6 py-2 font-semibold text-gray-700 transition-colors`}
            style={{ backgroundColor: BUTTON_GREY }}
          >
            Batal
          </button>
          <button
            onClick={handleSave}
            className={`rounded-lg px-6 py-2 font-semibold text-white shadow-md transition-colors`}
            style={{ backgroundColor: BUTTON_BLUE }}
            disabled={!tempNama}
          >
            {editingItem ? 'Simpan Perubahan' : 'Tambah Data'}
          </button>
        </div>
      </CustomModal>

      {/* Modal Konfirmasi Hapus */}
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

// --- 5. JABATAN (Position) ---

const JabatanAdmin: React.FC = () => {
  const [data, setData] = useState<Jabatan[]>(MOCK_JABATAN);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Jabatan | null>(null);
  const [itemToDeleteId, setItemToDeleteId] = useState<number | null>(null);
  const [tempNama, setTempNama] = useState('');

  const handleEdit = (item: Jabatan) => {
    setEditingItem(item);
    setTempNama(item.nama);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingItem(null);
    setTempNama('');
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (!tempNama) return;

    if (editingItem) {
      setData(
        data.map((j) =>
          j.id === editingItem.id ? { ...j, nama: tempNama } : j,
        ),
      );
    } else {
      const newId = Math.max(...data.map((d) => d.id)) + 1;
      const newItem: Jabatan = { id: newId, nama: tempNama };
      setData([...data, newItem]);
    }
    handleCloseModal();
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

  const handleConfirmDelete = () => {
    if (itemToDeleteId !== null) {
      setData(data.filter((j) => j.id !== itemToDeleteId));
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
        >
          <Plus className="h-5 w-5" />
          <span>Tambah Baru</span>
        </button>
      </div>

      <div className="rounded-xl bg-white p-4 shadow-lg sm:p-6">
        {/* Filter/Search Bar */}
        <div className="mb-4 flex flex-wrap items-center justify-between space-y-4 md:space-y-0">
          <div className="relative w-full md:w-1/3">
            <Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
            <input
              type="text"
              placeholder="Search Jabatan..."
              className="w-full rounded-xl border border-gray-300 p-3 pl-10 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          {/* Placeholder Filter/Sort */}
        </div>

        {/* Tabel Data */}
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
              {data.map((item) => (
                <tr
                  key={item.id}
                  className="transition-colors hover:bg-gray-50"
                >
                  <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-900">
                    {item.id}
                  </td>
                  <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                    {item.nama}
                  </td>
                  <td className="px-6 py-4 text-center text-sm font-medium whitespace-nowrap">
                    <button
                      onClick={() => handleEdit(item)}
                      className="mr-3 rounded-full p-2 text-blue-600 hover:bg-blue-100 hover:text-blue-900"
                    >
                      <Edit className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(item.id)}
                      className="rounded-full p-2 text-red-600 hover:bg-red-100 hover:text-red-900"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination & Show Entries */}
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

      {/* Pop-up Edit Jabatan (Modal) */}
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
          >
            Batal
          </button>
          <button
            onClick={handleSave}
            className={`rounded-lg px-6 py-2 font-semibold text-white shadow-md transition-colors`}
            style={{ backgroundColor: BUTTON_BLUE }}
            disabled={!tempNama}
          >
            {editingItem ? 'Simpan Perubahan' : 'Tambah Data'}
          </button>
        </div>
      </CustomModal>

      {/* Modal Konfirmasi Hapus */}
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

// --- 6. ANGGOTA (Member) ---

const AnggotaAdmin: React.FC = () => {
  const [data, setData] = useState<Anggota[]>(MOCK_ANGGOTA);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal untuk Tambah/Edit

  const [selectedAnggota, setSelectedAnggota] = useState<Anggota | null>(null);
  const [anggotaToDeleteId, setAnggotaToDeleteId] = useState<number | null>(
    null,
  );
  const [editingAnggota, setEditingAnggota] = useState<Anggota | null>(null);

  // Form State
  const EMPTY_ANGGOTA_FORM = useMemo(
    () => ({
      nama: '',
      kepengurusan: MOCK_PENGURUSAN[0]?.nama || '',
      jabatan: MOCK_JABATAN[0]?.nama || '',
      divisi: MOCK_DIVISI[0]?.nama || '',
      linkedin: '',
      instagram: '',
    }),
    [],
  );

  const [tempAnggota, setTempAnggota] = useState<
    typeof EMPTY_ANGGOTA_FORM | null
  >(null);

  const handleToggleExpand = (id: number) => {
    setData(
      data.map((a) => (a.id === id ? { ...a, isExpanded: !a.isExpanded } : a)),
    );
  };

  // --- Handlers Modal Tambah/Edit ---
  const handleEdit = (anggota: Anggota) => {
    setEditingAnggota(anggota);
    setTempAnggota({
      nama: anggota.nama,
      kepengurusan: anggota.kepengurusan,
      jabatan: anggota.jabatan,
      divisi: anggota.divisi,
      linkedin: anggota.details.linkedin,
      instagram: anggota.details.instagram,
    });
    setIsModalOpen(true);
    setIsProfileModalOpen(false); // Tutup modal profil jika terbuka
  };

  const handleAddNew = () => {
    setEditingAnggota(null);
    setTempAnggota(EMPTY_ANGGOTA_FORM);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingAnggota(null);
    setTempAnggota(null);
  };

  const handleSave = () => {
    if (
      !tempAnggota ||
      !tempAnggota.nama ||
      !tempAnggota.kepengurusan ||
      !tempAnggota.jabatan ||
      !tempAnggota.divisi
    )
      return;

    if (editingAnggota) {
      setData(
        data.map((a) =>
          a.id === editingAnggota.id
            ? {
                ...a,
                nama: tempAnggota.nama,
                kepengurusan: tempAnggota.kepengurusan,
                jabatan: tempAnggota.jabatan,
                divisi: tempAnggota.divisi,
                details: {
                  linkedin: tempAnggota.linkedin,
                  instagram: tempAnggota.instagram,
                },
              }
            : a,
        ),
      );
    } else {
      const newId = Math.max(...data.map((d) => d.id), 0) + 1; // ID baru
      const newItem: Anggota = {
        id: newId,
        nama: tempAnggota.nama,
        kepengurusan: tempAnggota.kepengurusan,
        jabatan: tempAnggota.jabatan,
        divisi: tempAnggota.divisi,
        isExpanded: false,
        details: {
          linkedin: tempAnggota.linkedin,
          instagram: tempAnggota.instagram,
        },
      };
      setData([...data, newItem]);
    }
    handleCloseModal();
  };
  // --- Akhir Handlers Modal Tambah/Edit ---

  const handleViewProfile = (anggota: Anggota) => {
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

  const handleConfirmDelete = () => {
    if (anggotaToDeleteId !== null) {
      setData(data.filter((a) => a.id !== anggotaToDeleteId));
    }
    setIsDeleteModalOpen(false);
    setAnggotaToDeleteId(null);
  };

  // Komponen Select Reusable lokal untuk AnggotaAdmin
  const SelectField: React.FC<{
    label: string;
    value: string;
    onChange: (v: string) => void;
    options: string[];
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
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
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
      <h2 className="text-xl font-bold text-gray-800 sm:text-2xl">ANGGOTA</h2>

      <div className="flex items-center justify-between">
        <button
          onClick={handleAddNew}
          className="flex items-center space-x-2 rounded-lg bg-blue-500 px-4 py-2 font-semibold text-white shadow-md transition-colors hover:bg-blue-600"
        >
          <Plus className="h-5 w-5" />
          <span>Tambah Baru</span>
        </button>
      </div>

      <div className="rounded-xl bg-white p-4 shadow-lg sm:p-6">
        {/* Filter/Search Bar */}
        <div className="mb-4 flex flex-wrap items-center justify-between space-y-4 md:space-y-0">
          <div className="relative w-full md:w-1/3">
            <Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
            <input
              type="text"
              placeholder="Search Anggota..."
              className="w-full rounded-xl border border-gray-300 p-3 pl-10 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          {/* Placeholder Filter/Sort */}
        </div>

        {/* Tabel Data */}
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
              {data.map((item) => (
                <React.Fragment key={item.id}>
                  {/* Main Row */}
                  <tr className="border-b border-gray-100 bg-white transition-colors hover:bg-gray-100">
                    <td className="flex items-center px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-900">
                      <button
                        onClick={() => handleToggleExpand(item.id)}
                        className="mr-2 rounded-full p-1 transition-colors hover:bg-gray-200"
                      >
                        {item.isExpanded ? (
                          <ChevronUp className="h-4 w-4 text-gray-600" />
                        ) : (
                          <ChevronDown className="h-4 w-4 text-gray-600" />
                        )}
                      </button>
                      {item.id}
                    </td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap">
                      <span
                        className="flex cursor-pointer items-center text-blue-600 hover:underline"
                        onClick={() => handleViewProfile(item)}
                      >
                        <Eye className="mr-2 hidden h-4 w-4 sm:inline" />{' '}
                        {item.nama}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                      {item.kepengurusan}
                    </td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                      {item.jabatan}
                    </td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                      {item.divisi}
                    </td>
                    <td className="px-6 py-4 text-center text-sm font-medium whitespace-nowrap">
                      <button
                        onClick={() => handleEdit(item)}
                        className="mr-3 rounded-full p-2 text-blue-600 hover:bg-blue-200 hover:text-blue-900"
                      >
                        <Edit className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(item.id)}
                        className="rounded-full p-2 text-red-600 hover:bg-red-200 hover:text-red-900"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>

                  {/* Expanded Detail Rows (Dummy Data) */}
                  {item.isExpanded && (
                    <>
                      <tr className="border-b border-gray-100 bg-gray-50 transition-colors">
                        <td className="px-6 py-2 pl-14 text-right text-sm font-medium whitespace-nowrap text-gray-900">
                          2024:
                        </td>
                        <td
                          className="px-6 py-2 text-sm whitespace-nowrap text-gray-500"
                          colSpan={2}
                        >
                          KOMUNITAS WEB
                        </td>
                        <td className="px-6 py-2 text-sm whitespace-nowrap text-gray-500">
                          STAFF
                        </td>
                        <td
                          className="px-6 py-2 text-sm whitespace-nowrap text-gray-500"
                          colSpan={2}
                        >
                          FRONT END DEVELOPER
                        </td>
                      </tr>
                      <tr className="border-b border-gray-100 bg-gray-50 transition-colors">
                        <td className="px-6 py-2 pl-14 text-right text-sm font-medium whitespace-nowrap text-gray-900">
                          2023:
                        </td>
                        <td
                          className="px-6 py-2 text-sm whitespace-nowrap text-gray-500"
                          colSpan={2}
                        >
                          GENERASI SATU
                        </td>
                        <td className="px-6 py-2 text-sm whitespace-nowrap text-gray-500">
                          MENTOR
                        </td>
                        <td
                          className="px-6 py-2 text-sm whitespace-nowrap text-gray-500"
                          colSpan={2}
                        >
                          BACK END DEVELOPER
                        </td>
                      </tr>
                    </>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination & Show Entries */}
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

      {/* Pop-up Edit/Tambah Anggota (Modal) */}
      <CustomModal
        title={editingAnggota ? 'Edit Anggota' : 'Tambah Anggota Baru'}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      >
        {tempAnggota && (
          <div className="space-y-4">
            <InputField
              label="NAMA LENGKAP"
              value={tempAnggota.nama}
              onChange={(v) => setTempAnggota({ ...tempAnggota, nama: v })}
              placeholder="Nama Anggota"
            />

            <SelectField
              label="KEPENGURUSAN"
              value={tempAnggota.kepengurusan}
              onChange={(v) =>
                setTempAnggota({ ...tempAnggota, kepengurusan: v })
              }
              options={MOCK_PENGURUSAN.map((p) => p.nama)}
            />

            <SelectField
              label="JABATAN"
              value={tempAnggota.jabatan}
              onChange={(v) => setTempAnggota({ ...tempAnggota, jabatan: v })}
              options={MOCK_JABATAN.map((j) => j.nama)}
            />

            <SelectField
              label="DIVISI"
              value={tempAnggota.divisi}
              onChange={(v) => setTempAnggota({ ...tempAnggota, divisi: v })}
              options={MOCK_DIVISI.map((d) => d.nama)}
            />

            <InputField
              label="LINKEDIN (URL)"
              value={tempAnggota.linkedin}
              onChange={(v) => setTempAnggota({ ...tempAnggota, linkedin: v })}
              placeholder="https://linkedin.com/in/..."
            />

            <InputField
              label="INSTAGRAM (URL)"
              value={tempAnggota.instagram}
              onChange={(v) => setTempAnggota({ ...tempAnggota, instagram: v })}
              placeholder="https://instagram.com/..."
            />
          </div>
        )}
        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={handleCloseModal}
            className={`rounded-lg px-6 py-2 font-semibold text-gray-700 transition-colors`}
            style={{ backgroundColor: BUTTON_GREY }}
          >
            Batal
          </button>
          <button
            onClick={handleSave}
            className={`rounded-lg px-6 py-2 font-semibold text-white shadow-md transition-colors`}
            style={{ backgroundColor: BUTTON_BLUE }}
            disabled={!tempAnggota || !tempAnggota.nama}
          >
            {editingAnggota ? 'Simpan Perubahan' : 'Tambah Anggota'}
          </button>
        </div>
      </CustomModal>

      {/* Pop-up Profile Anggota (Modal) */}
      <CustomModal
        title="Detail Profil Anggota"
        isOpen={isProfileModalOpen}
        onClose={handleCloseProfileModal}
      >
        {selectedAnggota && (
          <div className="flex flex-col items-start space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
            <div className="flex min-h-[150px] w-full flex-col items-center justify-center rounded-lg bg-gray-100 p-4 sm:w-1/3">
              <User className="h-12 w-12 text-gray-500" />
            </div>
            <div className="flex-1 space-y-1">
              <h3 className="text-xl font-bold text-gray-900">
                {selectedAnggota.nama}
              </h3>
              <p className="mb-4 text-sm text-gray-500">
                ID Anggota: {selectedAnggota.id}
              </p>

              <div className="space-y-2 pt-2 text-sm">
                <p className="font-semibold text-gray-700">Linkedin</p>
                <a
                  href={selectedAnggota.details.linkedin}
                  target="_blank"
                  className="flex items-center wrap-break-word text-blue-600 hover:underline"
                >
                  <Link className="mr-1 h-4 w-4" />{' '}
                  {selectedAnggota.details.linkedin}
                </a>

                <p className="pt-2 font-semibold text-gray-700">Instagram</p>
                <a
                  href={selectedAnggota.details.instagram}
                  target="_blank"
                  className="flex items-center wrap-break-word text-blue-600 hover:underline"
                >
                  <Link className="mr-1 h-4 w-4" />{' '}
                  {selectedAnggota.details.instagram}
                </a>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  title="Edit"
                  onClick={() => handleEdit(selectedAnggota)} // <-- Diperbarui
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

      {/* Modal Konfirmasi Hapus */}
      <ConfirmationModal
        title="Konfirmasi Hapus Anggota"
        message={`Apakah Anda yakin ingin menghapus anggota ${anggotaToDeleteId ? MOCK_ANGGOTA.find((a) => a.id === anggotaToDeleteId)?.nama : 'ini'}? Data ini akan hilang secara permanen.`}
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

// ====================================================================
// D. KOMPONEN APLIKASI UTAMA (Main Application Component)
// ====================================================================

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('login');

  const renderContent = () => {
    switch (currentPage) {
      case 'login':
        return <LoginPage onLogin={() => setCurrentPage('home')} />;
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
      default:
        return <DashboardHome onNavigate={setCurrentPage} />;
    }
  };

  if (currentPage === 'login') {
    return renderContent();
  }

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
};

export default App;
