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
  spellCheck?: boolean;
  disablePaste?: boolean;
}

export const generateInputFieldHtml = (data: InputFieldData): string => {
  const {
    placeholder,
    fieldId,
    inputType,
    singleLineType = "text",
    minRows = 3,
    maxRows = 10,
    maxWords = 1000,
    enableFormatting = false,
    allowImageUpload = false,
    spellCheck = true,
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
      ? `<assessment-input 
          class="fr-input-control" 
          data-placeholder="${placeholder || ""}" 
          data-field-type="multi"
          data-id="${fieldId}"
          data-min-rows="${minRows}"
          data-max-rows="${maxRows}"
          data-max-words="${maxWords}"
          data-basic-formatting="${enableFormatting}"
          data-image-upload="${allowImageUpload}"
          data-spell-check="${spellCheck}"
          data-disable-paste="${disablePaste}"
          style="flex: 1; padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; pointer-events: none; opacity: 0.7; height: 150px; width: 100%;"
        ><span>${placeholder}</span></assessment-input>`
      : `<assessment-input 
          type="${singleLineType}" 
          class="fr-input-control" 
          data-placeholder="${placeholder || ""}"
          data-field-type="single"
          data-input-type="${singleLineType}"
          data-id="${fieldId}"
          data-spell-check="${spellCheck}"
          style="flex: 1; padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; pointer-events: none; opacity: 0.7; height: 150px; width: 100%;"
        ><span>${placeholder}</span></assessment-input>`;

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
