import FroalaEditor from "froala-editor";
import { handleInsertInputField } from "~/components/plugin/InputField/insertHandler";
import { handleInsertFlashcard } from "~/components/plugin/Flashcard/insertHandler";
import { handleInsertDesignBlocks } from "~/components/plugin/DesignBlocks/insertHandler";
import "~/components/plugin/Flashcard/actions";

/**
 * Lightweight descriptor for Froala commands that we register via RegisterCommand.
 */
export interface FroalaPlugin {
  name: string;
  config: {
    title: string;
    icon?: string;
    focus?: boolean;
    undo?: boolean;
    refreshAfterCallback?: boolean;
    [key: string]: any;
  };
  callback: (this: any, ...args: any[]) => void | Promise<void>;
  initialize?: () => void;
  cleanup?: () => void;
}

// Single text icon reused across the dropdown items for clarity in the toolbar UI.
FroalaEditor.DefineIcon("gradpathIcon", {
  template: "text",
  NAME: '<span style="font-size:13px; font-weight:500;">GRADPATH CAPABILITIES</span>',
});

/**
 * Dropdown plugin that proxies user intent to the concrete insert handlers.
 */
const insertComponentsDropdownPlugin: FroalaPlugin = {
  name: "insertComponentsDropdown",
  config: {
    title: "Gradpath Capabilities",
    icon: "gradpathIcon",
    type: "dropdown",
    focus: false,
    undo: false,
    refreshAfterCallback: false,
    options: {
      assessmentInputBox: "Assessment Input Box",
      insertFlashcard: "Insert Flashcard",
      insertGraph: "Insert Graph",
      insertEquation: "Insert Equation",
      insertDesignBlocks: "Insert Design Blocks",
    },
  },
  callback: async function (this: any, _cmd: string, val: string) {
    const editor = this;
    console.log("Froala license key:", FroalaEditor.LICENSE_KEY);

    if (val === "assessmentInputBox") {
      await handleInsertInputField(editor);
    } else if (val === "insertFlashcard") {
      await handleInsertFlashcard(editor);
    } else if (val === "insertDesignBlocks") {
      await handleInsertDesignBlocks(editor);
    }
  },
};

// REGISTRY

const plugins: FroalaPlugin[] = [insertComponentsDropdownPlugin];

/**
 * Register all plugins with FroalaEditor.
 * Should typically be called once per browser session (see froalaEditor.vue guard).
 */
export const registerFroalaPlugins = (): void => {
  plugins.forEach((plugin) => {
    const { name, config, callback } = plugin;

    if (plugin.initialize) {
      plugin.initialize();
    }

    FroalaEditor.RegisterCommand(name, {
      ...config,
      callback: callback,
    });

    console.log(`Registered Froala plugin: ${name}`);
  });
};

/**
 * Allow each plugin to run its optional cleanup hook.
 * Froala does not expose unregistering commands, so this just forwards cleanup logic.
 */
export const unregisterFroalaPlugins = (): void => {
  plugins.forEach((plugin) => {
    if (plugin.cleanup) {
      plugin.cleanup();
    }
  });
};
