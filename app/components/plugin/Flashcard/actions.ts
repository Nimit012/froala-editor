import FlashcardForm from "./Form.vue";
import { generateFlashcardHtml, type FlashcardDeckData } from "./Template";
import { openModal } from "~/utils/modal";

async function editFlashcardDeck(deckId: string) {
  try {
    const deckElement = document.querySelector(`[data-deck-id="${deckId}"]`);

    if (!deckElement) {
      console.error("Deck not found:", deckId);
      return;
    }

    const serializedData = deckElement.getAttribute("data-deck-data");
    if (!serializedData) {
      console.error("Deck data not found");
      return;
    }

    const existingData: FlashcardDeckData = JSON.parse(
      decodeURIComponent(atob(serializedData))
    );

    const result = await openModal<FlashcardDeckData>(FlashcardForm, {
      existingData,
      uploadEndpoint: "/api/upload-image",
    });

    if (!result.confirmed || !result.data) return;

    const newHtml = generateFlashcardHtml(result.data);
    deckElement.outerHTML = newHtml;
  } catch (error) {
    console.error("Error editing flashcard:", error);
    alert("Failed to edit flashcard. Please try again.");
  }
}

function deleteFlashcardDeck(deckId: string) {
  try {
    const deckElement = document.querySelector(`[data-deck-id="${deckId}"]`);
    if (deckElement) {
      deckElement.remove();
    }
  } catch (error) {
    console.error("Error deleting flashcard:", error);
    alert("Failed to delete flashcard. Please try again.");
  }
}

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
  (window as any).editFlashcardDeck = editFlashcardDeck;
  (window as any).deleteFlashcardDeck = deleteFlashcardDeck;
  (window as any).deleteBlock = deleteBlock;
}

export { editFlashcardDeck, deleteFlashcardDeck, deleteBlock };
