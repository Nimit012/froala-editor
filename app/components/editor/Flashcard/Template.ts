export interface FlashcardCard {
  id: string;
  frontText: string;
  frontImage: string;
  backText: string;
  backImage: string;
}

export interface FlashcardDeckData {
  deckId: string;
  title: string;
  description: string;
  cards: FlashcardCard[];
}

export const generateFlashcardHtml = (data: FlashcardDeckData): string => {
  const { deckId, title, description, cards } = data;

  // Serialize the data using base64 encoding for safe HTML attribute storage
  const serializedData = btoa(encodeURIComponent(JSON.stringify(data)));

  const cardsHtml = cards
    .map(
      (card, index) => `
    <div class="flashcard-item" style="border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin-bottom: 16px; background: white;">
      <div style="font-weight: 600; color: #64748b; margin-bottom: 12px; font-size: 14px;">
        Card ${index + 1}
      </div>
      
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
        <!-- Front -->
        <div>
          <div style="font-weight: 500; color: #334155; margin-bottom: 8px; font-size: 13px;">FRONT</div>
          ${
            card.frontImage
              ? `<img src="${card.frontImage}" alt="Front" style="max-width: 100%; max-height: 120px; border-radius: 6px; margin-bottom: 8px; object-fit: cover;" />`
              : ""
          }
          ${
            card.frontText
              ? `<div style="color: #475569; font-size: 14px; line-height: 1.5;">${escapeHtml(
                  card.frontText
                )}</div>`
              : ""
          }
        </div>
        
        <!-- Back -->
        <div>
          <div style="font-weight: 500; color: #334155; margin-bottom: 8px; font-size: 13px;">BACK</div>
          ${
            card.backImage
              ? `<img src="${card.backImage}" alt="Back" style="max-width: 100%; max-height: 120px; border-radius: 6px; margin-bottom: 8px; object-fit: cover;" />`
              : ""
          }
          ${
            card.backText
              ? `<div style="color: #475569; font-size: 14px; line-height: 1.5;">${escapeHtml(
                  card.backText
                )}</div>`
              : ""
          }
        </div>
      </div>
    </div>
  `
    )
    .join("");

  return `
    <div 
      class="fr-flashcard-deck" 
      data-deck-id="${deckId}"
      data-deck-data="${serializedData}"
      contenteditable="false"
      style="border: 2px solid #3b82f6; border-radius: 12px; padding: 20px; margin: 20px 0; background: #f8fafc; position: relative;"
    >
      <!-- Header -->
      <div style="margin-bottom: 16px; padding-bottom: 16px; border-bottom: 2px solid #e2e8f0;">
        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 8px;">
          <h3 style="margin: 0; font-size: 20px; font-weight: 600; color: #1e293b;">${escapeHtml(
            title
          )}</h3>
          <div>
          <button 
          class="fr-flashcard-edit-btn"
          data-deck-id="${deckId}"
          type="button"
          onclick="window.editFlashcardDeck('${deckId}'); return false;"
          style="padding: 6px 12px; background: #3b82f6; color: white; border: none; border-radius: 6px; font-size: 13px; cursor: pointer; font-weight: 500; transition: background 0.2s;"
          >
          Edit
          </button>
          <button 
          class="fr-flashcard-delete-btn"
          data-deck-id="${deckId}"
          type="button"
            onclick="window.deleteFlashcardDeck('${deckId}'); return false;"
            style="padding: 6px 12px; background: #ef4444; color: white; border: none; border-radius: 6px; font-size: 13px; cursor: pointer; font-weight: 500; transition: background 0.2s;"
            >
            Delete
            </button>
            </div>
          
        </div>
        ${
          description
            ? `<p style="margin: 0; color: #64748b; font-size: 14px;">${escapeHtml(
                description
              )}</p>`
            : ""
        }
      </div>
      
      <!-- Cards -->
      <div style="font-weight: 600; color: #3b82f6; margin-bottom: 12px; font-size: 12px; text-transform: uppercase;">
        ${cards.length} Card${cards.length !== 1 ? "s" : ""}
      </div>
      
      ${cardsHtml}
    </div>
  `;
};

function escapeHtml(text: string): string {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}
