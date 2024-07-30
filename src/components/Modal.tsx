import { useEffect, useRef } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      // Adding `focusin` for better accessibility
      document.addEventListener("focusin", handleClickOutside as any);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("focusin", handleClickOutside as any);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside as any);
      document.removeEventListener("focusin", handleClickOutside as any);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none"
        aria-modal="true"
        role="dialog"
      >
        <div
          ref={modalRef}
          className="relative w-auto max-w-3xl mx-auto my-6 bg-gray-800 rounded-lg shadow-lg outline-none focus:outline-none"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-gray-700 rounded-t">
            <h3 className="text-xl font-semibold text-white">{title}</h3>
            <button
              className="text-white"
              onClick={onClose}
              aria-label="Close modal"
            >
              <span className="text-2xl">&times;</span>
            </button>
          </div>
          {/* Body */}
          <div className="relative p-6 flex-auto">{children}</div>
        </div>
      </div>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40 bg-black opacity-50"></div>
    </>
  );
};

export default Modal;
