import { ChatStatus } from "@prisma/client";
import React, { useState } from "react";

export const chatStatuses = [
  { status: ChatStatus.AVAILABLE, label: "Available", color: "bg-green-500" },
  { status: ChatStatus.OCCUPIED, label: "In Progress", color: "bg-yellow-400" },
  { status: ChatStatus.CLOSED, label: "Closed", color: "bg-red-500" },
];

interface Props {
  chatId: number;
  chatStatus: ChatStatus;
  changeStatus: (chatId: number, status: ChatStatus) => Promise<void>;
  onChange?: (status: ChatStatus) => void;
}

export const ModalDropdown = ({ chatId, chatStatus, changeStatus, onChange }: Props) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(
    chatStatuses.find((s) => s.status === chatStatus) || chatStatuses[0]
  );

  const handleSelect = async (s: typeof chatStatuses[number]) => {
    setSelected(s);
    setOpen(false);
    await changeStatus(chatId, s.status);
    onChange?.(s.status);
  };

  return (
    <div className="absolute left-2 inline-block text-left">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-44 px-4 py-2 border rounded-lg bg-white shadow-sm hover:bg-gray-50"
      >
        <div className="flex items-center gap-2">
          <span className={`w-3 h-3 rounded-full ${selected.color}`}></span>
          <span className="text-sm font-medium">{selected.label}</span>
        </div>
        <svg
          className={`w-4 h-4 text-gray-500 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute mt-2 w-44 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
          {chatStatuses.map((s) => (
            <button
              key={s.status}
              onClick={() => handleSelect(s)}
              className={`flex items-center gap-2 w-full px-4 py-2 text-sm text-left
                ${s.status === selected.status ? "bg-red-300" : "hover:bg-gray-100"}`}
            >
              <span className={`w-3 h-3 rounded-full ${s.color}`}></span>
              {s.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
