export interface InputFieldData {
  placeholder: string;
  fieldLabel: string;
  fieldName: string;
  fieldId: string;
  inputType: "single" | "multi";
}

export const generateInputFieldHtml = (data: InputFieldData): string => {
  const { placeholder, fieldLabel, fieldName, fieldId, inputType } = data;

  const baseStyles = `
      .fr-input-control::placeholder {
        font-style: italic;
        color: #9ca3af;
      }
    `;

  const inputElement =
    inputType === "multi"
      ? `<textarea 
          class="fr-input-control" 
          placeholder="${placeholder || ""}" 
          data-input-type="text"
          data-field-id="${fieldId}"
          data-field-name="${fieldName}"
          data-label="${escapeHtml(fieldLabel || "")}"
          contenteditable="false"
          style="flex: 1; padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; pointer-events: none; opacity: 0.7;"
        ></textarea>`
      : `<input 
          type="text" 
          class="fr-input-control" 
          placeholder="${placeholder || ""}"
          data-input-type="text"
          data-field-id="${fieldId}"
          data-field-name="${fieldName}"
          data-label="${escapeHtml(fieldLabel || "")}"
          contenteditable="false"
          style="flex: 1; padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; pointer-events: none; opacity: 0.7;"
        />`;

  return `
      <style>${baseStyles}</style>
      <div 
        class="fr-input-field-container fr-deletable"
        data-field-id="${fieldId}"
        contenteditable="false"
        style="display: flex; align-items: center; gap: 8px; margin: 12px 0; user-select: none;"
      >
        ${inputElement}
        <button 
          class="fr-input-delete-btn"
          data-field-id="${fieldId}"
          type="button"
          onclick="window.deleteInputField('${fieldId}'); return false;"
          style="padding: 6px 12px; background: #ef4444; color: white; border: none; border-radius: 6px; font-size: 13px; cursor: pointer; font-weight: 500; pointer-events: auto; opacity: 1; white-space: nowrap;"
        >
          Delete
        </button>
      </div>
    `;
};

function escapeHtml(text: string): string {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}
