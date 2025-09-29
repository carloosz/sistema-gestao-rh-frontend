'use client';

import TableComponent from '@/components/TableComponent/TableComponent';
import Title from '@/components/Title/Title';
import React, { useState } from 'react';
import { headers, rows } from './fakedata';
import Searchbar from '@/components/Inputs/Searchbar/Searchbar';
import useDebounce from '@/hooks/useDebounce';
import { useRouter } from 'next/navigation';
<<<<<<< HEAD
import protectedRoute from '@/hooks/protectedRoute';
=======
>>>>>>> b4a91cc7aa32a3da5c98084b8fcce3be2af10c3c

const RequestsPage = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 600);
  console.log(debouncedSearch);

  return (
    <div className="flex flex-col gap-[34px]">
      <Title>Solicitações</Title>
      <div className="w-full flex items-center justify-end">
        <Searchbar
          placeholder="Remetente"
          value={search}
          onChange={e => setSearch(e?.target?.value)}
        />
      </div>
      <TableComponent
        headers={headers}
        rows={rows}
        page={currentPage}
        setPage={setCurrentPage}
        total={rows.length}
        handleView={(id: string) => router.push(`/solicitacoes/ver/${id}`)}
      />
    </div>
  );
};

<<<<<<< HEAD
export default protectedRoute(RequestsPage);
=======
export default RequestsPage;
>>>>>>> b4a91cc7aa32a3da5c98084b8fcce3be2af10c3c
