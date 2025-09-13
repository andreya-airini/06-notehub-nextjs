"use client";

import { useState } from "react";
import {
  useQuery,
  QueryClient,
  hydrate,
  QueryClientProvider,
} from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import css from "./NoteDetails.client.module.css";

export default function NoteDetailsClient({
  id,
  dehydratedState,
}: {
  id: number;
  dehydratedState: unknown;
}) {
  const [queryClient] = useState(() => new QueryClient());
  hydrate(queryClient, dehydratedState);

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  if (isLoading) return <p>Loading, please wait...</p>;
  if (error || !note) return <p>Something went wrong.</p>;

  return (
    <QueryClientProvider client={queryClient}>
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{note.title}</h2>
          </div>
          <p className={css.content}>{note.content}</p>
          <p className={css.date}>{note.createdAt}</p>
        </div>
      </div>
    </QueryClientProvider>
  );
}
