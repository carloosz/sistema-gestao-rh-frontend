'use client';

import TableComponent from '@/components/TableComponent/TableComponent';
import Title from '@/components/Title/Title';
import React, { useState } from 'react';
import { headers } from './fakedata';
import Searchbar from '@/components/Inputs/Searchbar/Searchbar';
import AddButton from '@/components/Buttons/AddButton/AddButton';
import Tab2 from '@/components/Tabs/Tab2/Tab2';
import useDebounce from '@/hooks/useDebounce';
import { useRouter } from 'next/navigation';
import protectedRoute from '@/hooks/protectedRoute';
import { useCollaborators } from '@/services/requests/collaborators/getCollaborators';
import { IClientList } from '@/interfaces/Client';
import { maskPhone } from '@/utils/masks';
import Loading from '@/components/Loading/Loading';

const dataToRows = (data: IClientList) => {
  return data?.users?.map(item => ({
    id: item?.documentId,
    active: true,
    data: [
      { text: item?.id?.toString() },
      { text: item?.name },
      { text: item?.natureOfThePosition },
      { text: item?.registrationNumber || '-' },
      { text: maskPhone(item?.phone) },
    ],
  }));
};

const CollaboratorsPage = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [tab, setTab] = useState<'ativos' | 'desligados'>('ativos');
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 600);

  const { data, isFetching } = useCollaborators({
    page: currentPage,
    pageSize: 10,
    isActive: tab === 'ativos',
    search: debouncedSearch,
  });

  return (
    <div className="flex flex-col gap-[34px]">
      {(isFetching || !data) && <Loading />}
      <Title>Colaboradores</Title>
      <div className="w-full flex flex-col lg:flex-row lg:justify-between gap-[20px]">
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
        <div className="max-w-[695px] w-full flex flex-col md:flex-row lg:items-center gap-[25px]">
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
      {data?.users?.length > 0 && (
        <TableComponent
          headers={headers}
          rows={dataToRows(data)}
          page={currentPage}
          setPage={setCurrentPage}
          total={data?.totalItems}
          handleView={(id: string) => router.push(`/colaboradores/ver/${id}`)}
        />
      )}
    </div>
  );
};

export default protectedRoute(CollaboratorsPage);
