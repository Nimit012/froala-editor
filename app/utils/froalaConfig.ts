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
export const getFroalaConfig = (
  emit: (event: string, ...args: any[]) => void,
  autoSave: boolean,
  saveToStorage: (content: string) => void,
  loadFromStorage: () => string | null,
  initialModelValue: string,
) => {
  return {
    key: "MZC1rD1B4G4I3A15B10C8jF1QUg1Xc2OZE1ABVJRDRNGGUH1ITrA1C7A6B5E1E4H4E1A9B5==",
    documentReady: true,
    height: "auto",
    width: "100%",
    spellcheck: true,
    pastePlain: true,
    toolbarSticky: false,
    imageEditButtons: [
      "imageReplace",
      "imageAlign",
      "imageCaption",
      "imageRemove",
      "|",
      "imageLink",
      "linkOpen",
      "linkEdit",
      "linkRemove",
      "-",
      "imageDisplay",
      "imageStyle",
      "imageAlt",
      "imageSize",
      "wirisEditor",
      "wirisChemistry",
    ],

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
    ],
    paragraphFormat: {
      N: "Paragraph",
      H1: "Heading 1",
      H2: "Heading 2",
      H3: "Heading 3",
      H4: "Heading 4",
    },

    imageUpload: true,
    imageUploadURL: "/api/upload-image",
    imageMaxSize: 5 * 1024 * 1024,
    imageAllowedTypes: ["jpeg", "jpg", "png", "gif"],

    htmlAllowedAttrs: [".*"],
    htmlAllowedTags: [".*"],
    htmlAllowedEmptyTags: [
      "textarea",
      "img",
      "br",
      "hr",
      "input",
      "mprescripts",
      "none",
    ],
    htmlAllowedStyleProps: [".*"],
    htmlRemoveTags: [],
    htmlUntouched: true,
    htmlExecuteScripts: false,

    imageStyles: {
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
    videoResponsive: true,
    toolbarButtons: [
      "undo",
      "redo",
      "|",
      "paragraphFormat",
      "fontSize",
      "textColor",
      "backgroundColor",
      "|",
      "bold",
      "italic",
      "underline",
      "clearFormatting",
      "subscript",
      "superscript",
      "strikeThrough",
      "|",
      "alignLeft",
      "alignRight",
      "alignCenter",
      "alignJustify",
      "|",
      "lineHeight",
      "formatOL",
      "formatUL",
      "outdent",
      "indent",
      "|",
      "insertLink",
      "html",
      "insertImage",
      "insertVideo",
      "insertTable",
      "quote",
      "insertHR",
      "fullscreen",
      "specialCharacters",
      "|",
      "embedly",
      "wirisEditor", // WIRIS: Math formula button
      "wirisChemistry", // WIRIS: Chemistry formula button
    ],

    events: {
      contentChanged: function (this: FroalaEditor) {
        const content = this.html.get();

        if (autoSave) {
          saveToStorage(content);
        }
      },

      initialized: function (this: FroalaEditor) {
        const savedContent = loadFromStorage();
        const initialContent = savedContent || initialModelValue;

        if (initialContent) {
          this.html.set(initialContent);
        }
      },
    },
  };
};
