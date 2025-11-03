/**
 * Composable for managing Froala editor storage operations
 */
export const useFroalaStorage = (storageKey: string) => {
  /**
   * Load content from localStorage
   */
  const loadFromStorage = (): string | null => {
    try {
      const savedContent = localStorage.getItem(storageKey);
      if (savedContent) {
        console.log("Content loaded from localStorage");
        return savedContent;
      }
    } catch (error) {
      console.error("Error loading from localStorage:", error);
    }
    return null;
  };

  /**
   * Save content to localStorage
   */
  const saveToStorage = (content: string): void => {
    try {
      localStorage.setItem(storageKey, content);
      console.log("Content saved to localStorage");
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  };

  /**
   * Clear storage
   */
  const clearStorage = (): void => {
    try {
      localStorage.removeItem(storageKey);
      console.log("Storage cleared");
    } catch (error) {
      console.error("Error clearing storage:", error);
    }
  };

  return {
    loadFromStorage,
    saveToStorage,
    clearStorage,
  };
};

