'use client';

import TableComponent from '@/components/TableComponent/TableComponent';
import Title from '@/components/Title/Title';
import React, { useState } from 'react';
import { headers } from './fakedata';
import Searchbar from '@/components/Inputs/Searchbar/Searchbar';
import useDebounce from '@/hooks/useDebounce';
import { useRouter } from 'next/navigation';
import protectedRoute from '@/hooks/protectedRoute';
import { useRequests } from '@/services/requests/requests/getRequests';
import { IRequestList } from '@/interfaces/Request';
import Loading from '@/components/Loading/Loading';

const dataToRows = (data: IRequestList) => {
  return data?.requests?.map(item => ({
    id: item?.documentId,
    active: true,
    data: [
      { text: item?.id?.toString() },
      { text: item?.name },
      { text: item?.createdAt?.slice(0, 10)?.split('-')?.reverse()?.join('/') },
      { text: item?.type || '-' },
      { text: item?.isFinished ? 'Finalizada' : 'Pendente' },
    ],
  }));
};

const RequestsPage = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 600);

  const { data, isFetching } = useRequests({
    page: currentPage,
    pageSize: 9,
    search: debouncedSearch,
  });

  return (
    <div className="flex flex-col gap-[34px]">
      {(isFetching || !data) && <Loading />}
      <Title>Solicitações</Title>
      <div className="w-full flex items-center justify-end">
        <Searchbar
          placeholder="Remetente"
          value={search}
          onChange={e => setSearch(e?.target?.value)}
        />
      </div>
      {data?.requests?.length > 0 && (
        <TableComponent
          headers={headers}
          rows={dataToRows(data)}
          page={currentPage}
          setPage={setCurrentPage}
          total={data?.totalItems}
          handleView={(id: string) => router.push(`/solicitacoes/ver/${id}`)}
        />
      )}
    </div>
  );
};

export default protectedRoute(RequestsPage);
