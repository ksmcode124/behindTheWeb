import * as React from 'react';

type Mode = 'create' | 'edit' | 'delete' | null;

export function useCrudModal<T extends { id?: number }>() {
  const [mode, setMode] = React.useState<Mode>(null);
  const [activeItem, setActiveItem] = React.useState<T | null>(null);

  const openCreate = () => {
    setMode('create');
    setActiveItem(null);
  };

  const openEdit = (item: T) => {
    setMode('edit');
    setActiveItem(item);
  };

  const openDelete = (item: T) => {
    setMode('delete');
    setActiveItem(item);
  };

  const close = () => {
    setMode(null);
    setActiveItem(null);
  };

  return {
    mode,
    activeItem,

    isCreate: mode === 'create',
    isEdit: mode === 'edit',
    isDelete: mode === 'delete',
    isOpen: mode !== null,

    openCreate,
    openEdit,
    openDelete,
    close,
  };
}
