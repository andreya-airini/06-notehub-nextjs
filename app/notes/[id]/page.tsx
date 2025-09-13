import { QueryClient, dehydrate } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import NoteDetailsClient from "./NoteDetails.client";
import { fetchNoteById } from "@/lib/api";

interface NoteDetailsPageProps {
  params: { id: number | undefined };
}

export default async function NoteDetailsPage(props: NoteDetailsPageProps) {
  const params = await props.params;
  const id = params?.id;
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

  return <NoteDetailsClient id={id} dehydratedState={dehydrate(queryClient)} />;
}
