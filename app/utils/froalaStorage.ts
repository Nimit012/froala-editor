/**
 * Load content from localStorage
 */
export function loadFromStorage(storageKey: string): string | null {
    try {
      const savedContent = localStorage.getItem(storageKey)
      if (savedContent) {
        console.log("Content loaded from localStorage")
        return savedContent
      }
    } catch (error) {
      console.error("Error loading from localStorage:", error)
    }
    return null
  }
  
  /**
   * Save content to localStorage
   */
  export function saveToStorage(storageKey: string, content: string): void {
    try {
      localStorage.setItem(storageKey, content)
      console.log("Content saved to localStorage")
    } catch (error) {
      console.error("Error saving to localStorage:", error)
    }
  }
  
  /**
   * Clear storage for a specific key
   */
  export function clearStorage(storageKey: string): void {
    try {
      localStorage.removeItem(storageKey)
      console.log("Storage cleared")
    } catch (error) {
      console.error("Error clearing storage:", error)
    }
  }