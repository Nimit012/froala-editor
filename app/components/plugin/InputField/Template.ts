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

  const inputElement =
    inputType === "multi"
      ? `<assessment-input 
          class="fr-input-control" 
          contenteditable=false
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
        ><span>${placeholder}</span></assessment-input>`
      : `<assessment-input 
          type="${singleLineType}" 
          class="fr-input-control-single" 
          contenteditable=false
          data-placeholder="${placeholder || ""}"
          data-field-type="single"
          data-input-type="${singleLineType}"
          data-id="${fieldId}"
          data-spell-check="${spellCheck}"
        ><span>${placeholder}</span></assessment-input>`;

  return `${inputElement}`;
};

function escapeHtml(text: string): string {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}
