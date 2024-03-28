interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title: string;
  children: React.ReactNode;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <div className="fixed inset-0 transition-opacity" onClick={onClose}>
          <div className="absolute inset-0 bg-black/30 dark:bg-black/70"></div>
        </div>
        <div className="w-full md:max-w-md max-w-[350px] overflow-hidden transition-all transform border rounded-lg shadow-xl dark:bg-primary bg-secondary">
          <div className="p-4">{children}</div>
          <div className="flex justify-end gap-2 px-4 py-3 border-t">
            <button
              className="primary-button"
              onClick={onClose}
              autoFocus
              type="button"
              title="Cancel"
            >
              Cancel
            </button>
            <button
              className="secondary-button"
              onClick={onSubmit}
              type="button"
              title="Confirm"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
