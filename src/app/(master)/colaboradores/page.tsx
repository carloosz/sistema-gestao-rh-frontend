'use client';

import TableComponent from '@/components/TableComponent/TableComponent';
import Title from '@/components/Title/Title';
import React, { useState } from 'react';
import { headers, rows } from './fakedata';
import Searchbar from '@/components/Inputs/Searchbar/Searchbar';
import AddButton from '@/components/Buttons/AddButton/AddButton';
import Tab2 from '@/components/Tabs/Tab2/Tab2';
import useDebounce from '@/hooks/useDebounce';
import { useRouter } from 'next/navigation';
import protectedRoute from '@/hooks/protectedRoute';

const CollaboratorsPage = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [tab, setTab] = useState<'ativos' | 'desligados'>('ativos');
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 600);
  console.log(debouncedSearch);

  return (
    <div className="flex flex-col gap-[34px]">
      <Title>Colaboradores</Title>
      <div className="w-full flex justify-between">
        <div className="flex items-center gap-[50px]">
          <Tab2
            active={tab === 'ativos'}
            onSelect={() => setTab('ativos')}
            children={'Ativos'}
          />
          <Tab2
            active={tab === 'desligados'}
            onSelect={() => setTab('desligados')}
            children={'Desligados'}
          />
        </div>
        <div className="flex items-center gap-[25px]">
          <Searchbar
            placeholder="Buscar colaborador"
            value={search}
            onChange={e => setSearch(e?.target?.value)}
          />
          <AddButton
            type="button"
            text="Novo colaborador"
            onClick={() => router.push('/colaboradores/cadastrar')}
          />
        </div>
      </div>
      <TableComponent
        headers={headers}
        rows={rows}
        page={currentPage}
        setPage={setCurrentPage}
        total={rows.length}
        handleView={(id: string) => router.push(`/colaboradores/ver/${id}`)}
      />
    </div>
  );
};

export default protectedRoute(CollaboratorsPage);
