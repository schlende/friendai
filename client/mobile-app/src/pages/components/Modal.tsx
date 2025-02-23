import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "../../styles/Modal.css";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const [isVisible, setIsVisible] = useState(isOpen);

  useEffect(() => {
    setIsVisible(isOpen);
  }, [isOpen]);

  if (!isVisible) return null;

  const handleOverlayClick = () => {
    setIsVisible(false);
    onClose();
  };

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={handleOverlayClick}>
          &times;
        </button>
        {children}
      </div>
    </div>,
    document.body // Render the modal into the body element
  );
};
