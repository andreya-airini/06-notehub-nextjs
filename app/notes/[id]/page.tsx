import { QueryClient, dehydrate } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import { HydrationBoundary } from "@tanstack/react-query";
import NoteDetailsClient from "./NoteDetails.client";
import { fetchNoteById } from "@/lib/api";

interface NoteDetailsPageProps {
  params: { id: string };
}

export default async function NoteDetailsPage({
  params,
}: NoteDetailsPageProps) {
  const id = params.id;
  if (!id) {
    notFound();
  }

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  const note = queryClient.getQueryData(["note", id]);
  if (!note) {
    notFound();
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient id={id} />
    </HydrationBoundary>
  );
}
