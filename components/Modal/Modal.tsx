import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import css from "./Modal.module.css";

interface Props {
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ onClose, children }: Props) {
  const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    setModalRoot(document.getElementById("modal-root"));
    setIsVisible(true);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Escape") handleClose();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    // Фокус на першому input, textarea або select у модалці
    const firstInput = document.querySelector(
      "input, textarea, select"
    ) as HTMLElement;
    firstInput?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleClose = () => {
    if (isDirty) {
      const confirmClose = window.confirm("Discard changes?");
      if (!confirmClose) return;
    }
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!modalRoot) return null;

  return createPortal(
    <div
      className={`${css.backdrop} ${isVisible ? css.show : ""}`}
      onClick={handleBackdropClick}
    >
      <div
        className={css.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button className={css.close} onClick={handleClose}>
          ✕
        </button>
        <div onChange={() => setIsDirty(true)}>{children}</div>
      </div>
    </div>,
    modalRoot
  );
}
