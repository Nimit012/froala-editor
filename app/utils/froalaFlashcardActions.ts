import FlashcardForm from "~/components/plugin/Flashcard/Form.vue";
import {
  generateFlashcardHtml,
  type FlashcardDeckData,
} from "~/components/plugin/Flashcard/Template";
import { openModal } from "./modal";

/**
 * Edit an existing deck by replaying the form modal with the deck's encoded data.
 * The rendered HTML replaces the current block in-place.
 */
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

/**
 * Remove the full deck container from the editor DOM.
 */
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

/**
 * Generic helper used by component wrappers (input fields, flashcards, etc.) to delete the host block.
 */
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
