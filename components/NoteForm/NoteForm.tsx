import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createNote } from "../../lib/api";
import type { CreateNoteData } from "../../lib/api";
import css from "./NoteForm.module.css";

const tags = ["Todo", "Work", "Personal", "Meeting", "Shopping"] as const;

const validationSchema = Yup.object({
  title: Yup.string()
    .min(3, "Must be at least 3 characters")
    .max(50, "Must be at most 50 characters")
    .required("Required"),
  content: Yup.string().max(500, "Max 500 characters"),
  tag: Yup.string().oneOf(tags).required("Required"),
});

interface NoteFormProps {
  onCancel: () => void;
}

const initialValues: CreateNoteData = {
  title: "",
  content: "",
  tag: "Todo",
};

export default function NoteForm({ onCancel }: NoteFormProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      toast.success("Note created!");
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      onCancel();
    },
    onError: () => {
      toast.error("Failed to create note");
    },
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, actions) => {
        mutation.mutate(values);
        actions.resetForm();
      }}
    >
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label>
            Title
            <Field name="title" className={css.input} />
            <ErrorMessage name="title" component="div" className={css.error} />
          </label>
          <label>
            Content
            <Field name="content" as="textarea" className={css.textarea} />
            <ErrorMessage
              name="content"
              component="div"
              className={css.error}
            />
          </label>
          <label>
            Tag
            <Field name="tag" as="select" className={css.select}>
              {tags.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </Field>
            <ErrorMessage name="tag" component="div" className={css.error} />
          </label>
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Create note
          </button>
          <button type="button" onClick={onCancel} className={css.cancelButton}>
            Cancel
          </button>
        </div>
      </Form>
    </Formik>
  );
}
