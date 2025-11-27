export interface InputFieldData {
  placeholder: string;
  fieldName: string;
  fieldId: string;
  inputType: "single" | "multi";
  singleLineType?: string;
  minRows?: number;
  maxRows?: number;
  maxWords?: number;
  enableFormatting?: boolean;
  allowImageUpload?: boolean;
  spellChecker?: boolean;
  disablePaste?: boolean;
}

export const generateInputFieldHtml = (data: InputFieldData): string => {
  const {
    placeholder,
    fieldName,
    fieldId,
    inputType,
    singleLineType = "text",
    minRows = 3,
    maxRows = 10,
    maxWords = 1000,
    enableFormatting = false,
    allowImageUpload = false,
    spellChecker = true,
    disablePaste = false,
  } = data;

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
          data-input-type="multi"
          data-field-id="${fieldId}"
          data-field-name="${fieldName}"
          data-min-rows="${minRows}"
          data-max-rows="${maxRows}"
          data-max-words="${maxWords}"
          data-enable-formatting="${enableFormatting}"
          data-allow-image-upload="${allowImageUpload}"
          data-spell-checker="${spellChecker}"
          data-disable-paste="${disablePaste}"
          contenteditable="false"
          style="flex: 1; padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; pointer-events: none; opacity: 0.7;"
        ></textarea>`
      : `<input 
          type="${singleLineType}" 
          class="fr-input-control" 
          placeholder="${placeholder || ""}"
          data-input-type="single"
          data-single-line-type="${singleLineType}"
          data-field-id="${fieldId}"
          data-field-name="${fieldName}"
          data-spell-checker="${spellChecker}"
          contenteditable="false"
          style="flex: 1; padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; pointer-events: none; opacity: 0.7;"
        />`;

  return `
      <style>${baseStyles}</style>
      <div 
        class="fr-input-field-container"
        data-field-id="${fieldId}"
        contenteditable="false"
        style="display: flex; align-items: center; gap: 8px; margin: 12px 0; user-select: none;"
      >
        ${inputElement}
      </div>
    `;
};

function escapeHtml(text: string): string {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}
