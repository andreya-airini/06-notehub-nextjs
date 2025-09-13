import css from "./Loading.module.css";

export default function LoadingSpinner() {
  return (
    <div className={css.loadingContainer}>
      <div className={css.spinner}></div>
    </div>
  );
}
