import axios from "axios";
import type { Note, NoteTag } from "@/app/types/note";

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface CreateNoteData {
  title: string;
  content: string;
  tag: NoteTag;
}

const instance = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
  },
});

export const fetchNotes = async (
  page: number,
  search?: string
): Promise<FetchNotesResponse> => {
  const params: Record<string, unknown> = { page, perPage: 12 };
  if (search) params.search = search;
  const res = await instance.get<FetchNotesResponse>("/notes", { params });
  return res.data;
};

export const createNote = async (data: CreateNoteData) => {
  const res = await instance.post<Note>("/notes", data);
  return res.data;
};

export const deleteNote = async (id: string) => {
  const res = await instance.delete<Note>(`/notes/${id}`);
  return res.data;
};

export const fetchNoteById = async (id: string | number) => {
  const res = await instance.get<Note>(`/notes/${id}`);
  return res.data;
};
