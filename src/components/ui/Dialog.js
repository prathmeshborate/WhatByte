import React from "react";

export const Dialog = ({ isOpen, onClose, children, width = "w-1/3" }) =>
  isOpen ? (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      role="dialog"
      aria-hidden={!isOpen}
    >
      <div className={`bg-white p-6 rounded-lg ${width}`}>
        {children}
      </div>
    </div>
  ) : null;

export const DialogHeader = ({ children }) => (
  <div className="text-lg font-bold mb-4 flex justify-between items-center">
    {children}
  </div>
);

export const DialogContent = ({ children }) => (
  <div className="mb-6">{children}</div>
);

export const DialogFooter = ({ children }) => (
  <div className="flex justify-end space-x-4">{children}</div>
);
