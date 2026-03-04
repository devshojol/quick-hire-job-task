"use client";

import { HiOutlineExclamationTriangle } from "react-icons/hi2";

export default function DeleteConfirmModal({ onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-40 p-4">
      <div className="bg-white p-6 max-w-sm w-full shadow-2xl rounded">
        <div className="flex items-center gap-3 mb-3">
          <HiOutlineExclamationTriangle size={24} className="text-red-500" />
          <h3 className="font-bold text-[#25324B]">Delete Job</h3>
        </div>
        <p className="text-gray-500 text-sm mb-5 pl-9">
          Are you sure you want to delete this job listing? This action cannot
          be undone.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onConfirm}
            className="flex-1 bg-red-500 text-white py-2.5 font-semibold hover:bg-red-600 transition-colors text-sm rounded"
          >
            Delete
          </button>
          <button
            onClick={onCancel}
            className="flex-1 border border-[#D6DDEB] text-gray-600 py-2.5 font-semibold hover:bg-gray-50 transition-colors text-sm rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
