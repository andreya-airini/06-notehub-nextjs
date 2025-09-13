import { QueryClient, dehydrate } from "@tanstack/react-query";
import NotesClient from "./Notes.client";
import { fetchNotes } from "@/lib/api";

export default async function NotesPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", 1, ""],
    queryFn: ({ queryKey }) => {
      const [, page, search] = queryKey; // видалено _key
      return fetchNotes(page as number, search as string);
    },
  });

  return <NotesClient dehydratedState={dehydrate(queryClient)} />;
}
