"use client";

import { useState, useEffect } from "react";
import type { CVTemplate } from "@/lib/types";
import { cssStringToObject } from "@/lib/utils"; // Tạo file utils để xử lý chuỗi CSS

interface CVPreviewProps {
  htmlContent: string;
  cssContent: string;
  onUpdateHtml: (html: string) => void;
  template: CVTemplate;
}

export function CVPreview({ htmlContent, cssContent, onUpdateHtml, template }: CVPreviewProps) {
  const [editableHtml, setEditableHtml] = useState<string>(htmlContent);
  const [editing, setEditing] = useState<boolean>(false);

  useEffect(() => {
    setEditableHtml(htmlContent);
  }, [htmlContent]);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    onUpdateHtml(editableHtml);
    setEditing(false);
  };

  const handleCancel = () => {
    setEditableHtml(htmlContent);
    setEditing(false);
  };

  // Chuyển đổi chuỗi CSS thành object CSSProperties
  const inlineStyles = template.customStyles || cssContent;
  const styleObject = inlineStyles ? cssStringToObject(inlineStyles) : {};

  return (
    <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
      <div className={`cv-preview ${template.className} p-8`} style={styleObject}>
        {editing ? (
          <div className="mb-6">
            <textarea
              className="w-full p-2 border rounded mb-2"
              rows={20}
              value={editableHtml}
              onChange={(e) => setEditableHtml(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={handleCancel}
                className="px-3 py-1 bg-gray-200 text-gray-700 rounded"
              >
                Hủy
              </button>
              <button
                onClick={handleSave}
                className="px-3 py-1 bg-emerald-600 text-white rounded"
              >
                Lưu
              </button>
            </div>
          </div>
        ) : (
          <div className="mb-6" dangerouslySetInnerHTML={{ __html: editableHtml }} />
        )}
        {!editing && (
          <div className="text-right">
            <button
              onClick={handleEdit}
              className="bg-gray-100 hover:bg-gray-200 p-2 rounded"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-10 10a2 2 0 01-.707.707l-4 1a1 1 0 01-1.414-1.414l1-4a2 2 0 01.707-.707l10-10z" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}