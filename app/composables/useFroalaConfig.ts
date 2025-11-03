/**
 * Default Froala editor configuration
 * 
 * Note: FroalaEditorInstance type is not exported from froala-editor,
 * so we use a minimal interface for the event handler context
 */
interface FroalaEditor {
  html: {
    get: () => string;
    set: (html: string) => void;
  };
  el: HTMLElement;
}
export const useFroalaConfig = () => {
  const getDefaultConfig = (
    emit: (event: string, ...args: any[]) => void,
    autoSave: boolean,
    saveToStorage: (content: string) => void,
    loadFromStorage: () => string | null,
    initialModelValue: string
  ) => {
    return {
      documentReady: true,
      height: 480,
      width: 1200,

      fontSize: [
        "8",
        "10",
        "12",
        "14",
        "16",
        "18",
        "20",
        "24",
        "28",
        "32",
        "36",
        "48",
        "60",
        "72",
      ],

      imageUpload: true,
      imageUploadURL: "/api/upload-image",
      imageMaxSize: 5 * 1024 * 1024,
      imageAllowedTypes: ["jpeg", "jpg", "png", "gif"],

      htmlAllowedAttrs: [
        "style",
        "class",
        "id",
        "data-index",
        "alt",
        "src",
        "href",
        "placeholder",
        "data-field-id",
        "data-field-name",
        "data-input-type",
        "type",
        "contenteditable",
      ],
      htmlAllowedEmptyTags: ["textarea", "img", "br", "hr", "input"],
      htmlAllowedStyleProps: [".*"],
      htmlRemoveTags: [],
      htmlUntouched: true,
      htmlExecuteScripts: false,

      imageStyles: {
        rounded: "Rounded",
        bordered: "Bordered",
        shadow: "Shadow",
        circle: "Circle Image",
      },

      wordPasteModal: true,
      wordPasteKeepFormatting: true,
      wordAllowedStyleProps: [
        "font-family",
        "font-size",
        "background",
        "color",
        "width",
        "text-align",
        "vertical-align",
        "background-color",
        "padding",
        "margin",
        "border",
      ],

      toolbarButtons: [
        "fullscreen",
        "print",
        "getPDF",
        "undo",
        "redo",
        "|",
        "bold",
        "italic",
        "underline",
        "strikeThrough",
        "subscript",
        "superscript",
        "|",
        "fontFamily",
        "fontSize",
        "textColor",
        "backgroundColor",
        "|",
        "inlineClass",
        "inlineStyle",
        "clearFormatting",
        "|",
        "alignLeft",
        "alignCenter",
        "alignRight",
        "alignJustify",
        "|",
        "formatOL",
        "formatUL",
        "outdent",
        "indent",
        "|",
        "paragraphFormat",
        "paragraphStyle",
        "lineHeight",
        "quote",
        "|",
        "insertLink",
        "insertImage",
        "insertVideo",
        "insertFile",
        "|",
        "insertTable",
        "insertHR",
        "emoticons",
        "specialCharacters",
        "|",
        "selectAll",
        "html",
        "help",
        "insertInputField",
        "insertFlashcard"
      ],

      events: {
        contentChanged: function (this: FroalaEditor) {
          const content = this.html.get();
          emit("update:modelValue", content);

          // Auto-save to localStorage if enabled
          if (autoSave) {
            saveToStorage(content);
          }

          console.log("html", content);
        },

        initialized: function (this: FroalaEditor) {
          const contentElement = this.el.querySelector(".fr-element.fr-view") as HTMLElement;
          if (contentElement) {
            contentElement.style.setProperty("width", "20rem", "important");
            contentElement.style.setProperty("max-width", "10in", "important");
            contentElement.style.setProperty("margin", "0 auto", "important");
            contentElement.style.setProperty("padding", "1in", "important");
          }

          // Load content after editor is initialized
          const savedContent = loadFromStorage();
          const initialContent = savedContent || initialModelValue;

          if (initialContent) {
            this.html.set(initialContent);
          }
        },
      },
    };
  };

  return {
    getDefaultConfig,
  };
};

