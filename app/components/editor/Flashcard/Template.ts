export interface FlashcardData {
    question: string
    answer: string
    flashcardNumber: number
    flashcardId: string
  }
  
  export const generateFlashcardHtml = (data: FlashcardData): string => {
    const { question, answer, flashcardNumber, flashcardId } = data
    
    return `
      <div 
        class="fr-flashcard-block" 
        data-flashcard-id="${flashcardId}"
        data-flashcard-number="${flashcardNumber}"
        contenteditable="false"
        style="border: 2px solid #3b82f6; border-radius: 8px; padding: 16px; margin: 16px 0; background: #f8fafc; pointer-events: none;"
      >
        <div style="font-weight: 600; color: #3b82f6; margin-bottom: 12px; font-size: 12px; text-transform: uppercase;">
          Flashcard ${flashcardNumber}
        </div>
        <div 
          class="fr-flashcard-question" 
          data-question="${escapeHtml(question)}"
          style="margin-bottom: 12px;"
        >
          <strong style="color: #1e293b;">Q:</strong> ${question}
        </div>
        <div 
          class="fr-flashcard-answer" 
          data-answer="${escapeHtml(answer)}"
          style="border-top: 1px solid #cbd5e1; padding-top: 12px; color: #475569;"
        >
          <strong style="color: #1e293b;">A:</strong> ${answer}
        </div>
      </div>
    `
  }
  
  function escapeHtml(text: string): string {
    const div = document.createElement("div")
    div.textContent = text
    return div.innerHTML
  }