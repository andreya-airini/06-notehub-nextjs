"use client";

import { useState } from "react";
import { useQuery, QueryClient, hydrate } from "@tanstack/react-query";
import { useDebounce } from "@uidotdev/usehooks";
import { fetchNotes } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";
import Loading from "@/components/Loading/Loading";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";

export default function NotesClient({
  dehydratedState,
}: {
  dehydratedState: unknown;
}) {
  const [queryClient] = useState(() => new QueryClient());
  hydrate(queryClient, dehydratedState);

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const debouncedSearch = useDebounce(search, 1000);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", page, debouncedSearch],
    queryFn: () => fetchNotes(page, debouncedSearch),
  });

  const handleSearch = (query: string) => setSearch(query);

  if (isLoading) return <Loading />;
  if (isError) return <ErrorMessage />;

  return (
    <>
      <div>
        <SearchBox onSearch={handleSearch} />
        <button onClick={() => setIsOpen(true)}>Create note+</button>
      </div>

      {data && data.notes.length > 0 && <NoteList notes={data.notes} />}
      {data && data.totalPages > 1 && (
        <Pagination
          forcePage={page - 1}
          pageCount={data.totalPages}
          onPageChange={({ selected }) => setPage(selected + 1)}
        />
      )}

      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <NoteForm onCancel={() => setIsOpen(false)} />
        </Modal>
      )}
    </>
  );
}
