export interface InputFieldData {
    placeholder: string
    fieldLabel: string
    fieldName: string
    fieldId: string
    inputType: 'single' | 'multi';
  }
  
  export const generateInputFieldHtml = (data: InputFieldData): string => {
    const { placeholder, fieldLabel, fieldName, fieldId, inputType } = data
     const baseStyles = `
    .fr-input-control::placeholder {
      font-style: italic;
      color: #9ca3af;
    }
  `

    if (inputType === 'multi') {
      return `
      <style>${baseStyles}</style>
        <textarea 
          class="fr-input-control" 
          placeholder="${placeholder || ""}" 
           data-input-type="text"
        data-field-id="${fieldId}"
        data-field-name="${fieldName}"
        data-label="${escapeHtml(fieldLabel || '')}"
          contenteditable="false"
        style="display: block; width: 100%; padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 6px; margin: 12px 0; font-size: 14px; pointer-events: none; opacity: 0.7;"
        ></textarea>
      `
    }
    return `
    <style>${baseStyles}</style>
      <input 
        type="text" 
        class="fr-input-control" 
        placeholder="${placeholder || ""}"
        data-input-type="text"
        data-field-id="${fieldId}"
        data-field-name="${fieldName}"
        data-label="${escapeHtml(fieldLabel || '')}"
        contenteditable="false"
        style="display: block; width: 100%; padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 6px; margin: 12px 0; font-size: 14px; pointer-events: none; opacity: 0.7;"
      />
    `
  }
  
  function escapeHtml(text: string): string {
    const div = document.createElement("div")
    div.textContent = text
    return div.innerHTML
  }