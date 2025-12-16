function deleteBlock(blockId: string) {
  try {
    const element = document.querySelector(`[data-block-id="${blockId}"]`);
    if (element) {
      element.remove();
    }
  } catch (error) {
    console.error("Error deleting block:", error);
  }
}

if (typeof window !== "undefined") {
  (window as any).deleteBlock = deleteBlock;
}

export { deleteBlock };
