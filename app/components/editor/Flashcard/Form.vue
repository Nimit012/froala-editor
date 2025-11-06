<template>
    <ModalWrapper v-if="wrapInModal" @cancel="handleCancel" maxWidth="max-w-4xl">
      <!-- Header -->
      <div class="p-6 border-b border-gray-200">
        <h3 class="text-2xl font-semibold text-slate-900 mb-4">
          {{ isEditMode ? 'Edit Flashcard Deck' : 'Create Flashcard Deck' }}
        </h3>
        
        <!-- Title Field -->
        <div class="mb-4">
          <label class="block mb-2 font-medium text-slate-700">
            Deck Title <span class="text-red-500">*</span>
          </label>
          <input
            v-model="deckTitle"
            type="text"
            placeholder="e.g., Spanish Vocabulary, Biology Chapter 5..."
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            ref="titleInput"
          />
        </div>

        <!-- Description Field -->
        <div>
          <label class="block mb-2 font-medium text-slate-700">
            Description (Optional)
          </label>
          <textarea
            v-model="deckDescription"
            rows="2"
            placeholder="What is this flashcard deck about?"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>
      </div>

      <!-- Cards Section (Scrollable) -->
      <div class="flex-1 overflow-y-auto p-6 space-y-6">
        <div
          v-for="(card, index) in cards"
          :key="card.id"
          class="border-2 border-gray-200 rounded-lg p-4 bg-gray-50"
        >
          <!-- Card Header -->
          <div class="flex items-center justify-between mb-4">
            <h4 class="text-lg font-semibold text-slate-800">Card {{ index + 1 }}</h4>
            <button
              v-if="cards.length > 1"
              @click="removeCard(index)"
              class="text-red-500 hover:text-red-700 transition-colors p-2 hover:bg-red-50 rounded"
              title="Delete card"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Front Side -->
            <div class="space-y-3">
              <label class="block font-medium text-slate-700">Front</label>
              
              <!-- Front Image Upload -->
              <div class="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 transition-colors">
                <div v-if="card.frontImage" class="relative">
                  <img :src="card.frontImage" alt="Front" class="max-h-32 mx-auto rounded" />
                  <button
                    @click="card.frontImage = ''"
                    class="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                  </button>
                </div>
                <div v-else>
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 mx-auto text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p class="text-sm text-gray-500 mb-2">Click to upload image</p>
                  <input
                    type="file"
                    accept="image/*"
                    @change="(e) => handleImageUpload(e, card, 'front')"
                    class="hidden"
                    :ref="`frontImage${index}`"
                  />
                  <button
                    @click="($refs as any)[`frontImage${index}`][0].click()"
                    class="text-blue-500 hover:text-blue-600 text-sm"
                  >
                    Choose file
                  </button>
                </div>
              </div>

              <!-- Front Text -->
              <textarea
                v-model="card.frontText"
                rows="4"
                placeholder="Front of card..."
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
              />
            </div>

            <!-- Back Side -->
            <div class="space-y-3">
              <label class="block font-medium text-slate-700">Back</label>
              
              <!-- Back Image Upload -->
              <div class="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 transition-colors">
                <div v-if="card.backImage" class="relative">
                  <img :src="card.backImage" alt="Back" class="max-h-32 mx-auto rounded" />
                  <button
                    @click="card.backImage = ''"
                    class="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                  </button>
                </div>
                <div v-else>
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 mx-auto text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p class="text-sm text-gray-500 mb-2">Click to upload image</p>
                  <input
                    type="file"
                    accept="image/*"
                    @change="(e) => handleImageUpload(e, card, 'back')"
                    class="hidden"
                    :ref="`backImage${index}`"
                  />
                  <button
                    @click="($refs as any)[`backImage${index}`][0].click()"
                    class="text-blue-500 hover:text-blue-600 text-sm"
                  >
                    Choose file
                  </button>
                </div>
              </div>

              <!-- Back Text -->
              <textarea
                v-model="card.backText"
                rows="4"
                placeholder="Back of card..."
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
              />
            </div>
          </div>
        </div>

        <!-- Add Card Button -->
        <button
          @click="addCard"
          class="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-400 hover:text-blue-500 transition-colors flex items-center justify-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
          </svg>
          Add Another Card
        </button>
      </div>

      <!-- Footer -->
      <div class="p-6 border-t border-gray-200 flex gap-3 justify-end bg-gray-50">
        <button
          @click="handleCancel"
          class="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          @click="handleSubmit"
          class="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors font-medium"
        >
          {{ isEditMode ? 'Update Flashcard Deck' : 'Insert Flashcard Deck' }}
        </button>
      </div>
    </ModalWrapper>
    
    <template v-else>
      <!-- When rendered inside modal.ts, we receive inModal=true and must render without outer container -->
      <div v-if="inModal" class="flex flex-col flex-1 min-h-0">
        <!-- Header -->
        <div class="p-6 border-b border-gray-200">
          <h3 class="text-2xl font-semibold text-slate-900 mb-4">
            {{ isEditMode ? 'Edit Flashcard Deck' : 'Create Flashcard Deck' }}
          </h3>
          
          <!-- Title Field -->
          <div class="mb-4">
            <label class="block mb-2 font-medium text-slate-700">
              Deck Title <span class="text-red-500">*</span>
            </label>
            <input
              v-model="deckTitle"
              type="text"
              placeholder="e.g., Spanish Vocabulary, Biology Chapter 5..."
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              ref="titleInput"
            />
          </div>

          <!-- Description Field -->
          <div>
            <label class="block mb-2 font-medium text-slate-700">
              Description (Optional)
            </label>
            <textarea
              v-model="deckDescription"
              rows="2"
              placeholder="What is this flashcard deck about?"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>
        </div>

        <!-- Cards Section (Scrollable) -->
        <div class="flex-1 overflow-y-auto p-6 space-y-6">
          <div
            v-for="(card, index) in cards"
            :key="card.id"
            class="border-2 border-gray-200 rounded-lg p-4 bg-gray-50"
          >
            <!-- Card Header -->
            <div class="flex items-center justify-between mb-4">
              <h4 class="text-lg font-semibold text-slate-800">Card {{ index + 1 }}</h4>
              <button
                v-if="cards.length > 1"
                @click="removeCard(index)"
                class="text-red-500 hover:text-red-700 transition-colors p-2 hover:bg-red-50 rounded"
                title="Delete card"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- Front Side -->
              <div class="space-y-3">
                <label class="block font-medium text-slate-700">Front</label>
                
                <!-- Front Image Upload -->
                <div class="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 transition-colors">
                  <div v-if="card.frontImage" class="relative">
                    <img :src="card.frontImage" alt="Front" class="max-h-32 mx-auto rounded" />
                    <button
                      @click="card.frontImage = ''"
                      class="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                      </svg>
                    </button>
                  </div>
                  <div v-else>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 mx-auto text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p class="text-sm text-gray-500 mb-2">Click to upload image</p>
                    <input
                      type="file"
                      accept="image/*"
                      @change="(e) => handleImageUpload(e, card, 'front')"
                      class="hidden"
                      :ref="`frontImage${index}`"
                    />
                    <button
                      @click="($refs as any)[`frontImage${index}`][0].click()"
                      class="text-blue-500 hover:text-blue-600 text-sm"
                    >
                      Choose file
                    </button>
                  </div>
                </div>

                <!-- Front Text -->
                <textarea
                  v-model="card.frontText"
                  rows="4"
                  placeholder="Front of card..."
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
                />
              </div>

              <!-- Back Side -->
              <div class="space-y-3">
                <label class="block font-medium text-slate-700">Back</label>
                
                <!-- Back Image Upload -->
                <div class="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 transition-colors">
                  <div v-if="card.backImage" class="relative">
                    <img :src="card.backImage" alt="Back" class="max-h-32 mx-auto rounded" />
                    <button
                      @click="card.backImage = ''"
                      class="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                      </svg>
                    </button>
                  </div>
                  <div v-else>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 mx-auto text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p class="text-sm text-gray-500 mb-2">Click to upload image</p>
                    <input
                      type="file"
                      accept="image/*"
                      @change="(e) => handleImageUpload(e, card, 'back')"
                      class="hidden"
                      :ref="`backImage${index}`"
                    />
                    <button
                      @click="($refs as any)[`backImage${index}`][0].click()"
                      class="text-blue-500 hover:text-blue-600 text-sm"
                    >
                      Choose file
                    </button>
                  </div>
                </div>

                <!-- Back Text -->
                <textarea
                  v-model="card.backText"
                  rows="4"
                  placeholder="Back of card..."
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
                />
              </div>
            </div>
          </div>

          <!-- Add Card Button -->
          <button
            @click="addCard"
            class="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-400 hover:text-blue-500 transition-colors flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
            </svg>
            Add Another Card
          </button>
        </div>

        <!-- Footer -->
        <div class="p-6 border-t border-gray-200 flex gap-3 justify-end bg-gray-50">
          <button
            @click="handleCancel"
            class="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            @click="handleSubmit"
            class="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors font-medium"
          >
            {{ isEditMode ? 'Update Flashcard Deck' : 'Insert Flashcard Deck' }}
          </button>
        </div>
      </div>
      
      <div v-else class="flex flex-col max-w-[1200px] mx-auto">
        <!-- Header -->
        <div class="p-6 border-b border-gray-200">
          <h3 class="text-2xl font-semibold text-slate-900 mb-4">
            {{ isEditMode ? 'Edit Flashcard Deck' : 'Create Flashcard Deck' }}
          </h3>
          
          <!-- Title Field -->
          <div class="mb-4">
            <label class="block mb-2 font-medium text-slate-700">
              Deck Title <span class="text-red-500">*</span>
            </label>
            <input
              v-model="deckTitle"
              type="text"
              placeholder="e.g., Spanish Vocabulary, Biology Chapter 5..."
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              ref="titleInput"
            />
          </div>
  
          <!-- Description Field -->
          <div>
            <label class="block mb-2 font-medium text-slate-700">
              Description (Optional)
            </label>
            <textarea
              v-model="deckDescription"
              rows="2"
              placeholder="What is this flashcard deck about?"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>
        </div>
  
        <!-- Cards Section (Scrollable) -->
        <div class="flex-1 overflow-y-auto p-6 space-y-6">
          <div
            v-for="(card, index) in cards"
            :key="card.id"
            class="border-2 border-gray-200 rounded-lg p-4 bg-gray-50"
          >
            <!-- Card Header -->
            <div class="flex items-center justify-between mb-4">
              <h4 class="text-lg font-semibold text-slate-800">Card {{ index + 1 }}</h4>
              <button
                v-if="cards.length > 1"
                @click="removeCard(index)"
                class="text-red-500 hover:text-red-700 transition-colors p-2 hover:bg-red-50 rounded"
                title="Delete card"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>
  
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- Front Side -->
              <div class="space-y-3">
                <label class="block font-medium text-slate-700">Front</label>
                
                <!-- Front Image Upload -->
                <div class="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 transition-colors">
                  <div v-if="card.frontImage" class="relative">
                    <img :src="card.frontImage" alt="Front" class="max-h-32 mx-auto rounded" />
                    <button
                      @click="card.frontImage = ''"
                      class="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                      </svg>
                    </button>
                  </div>
                  <div v-else>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 mx-auto text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p class="text-sm text-gray-500 mb-2">Click to upload image</p>
                    <input
                      type="file"
                      accept="image/*"
                      @change="(e) => handleImageUpload(e, card, 'front')"
                      class="hidden"
                      :ref="`frontImage${index}`"
                    />
                    <button
                      @click="($refs as any)[`frontImage${index}`][0].click()"
                      class="text-blue-500 hover:text-blue-600 text-sm"
                    >
                      Choose file
                    </button>
                  </div>
                </div>
  
                <!-- Front Text -->
                <textarea
                  v-model="card.frontText"
                  rows="4"
                  placeholder="Front of card..."
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
                />
              </div>
  
              <!-- Back Side -->
              <div class="space-y-3">
                <label class="block font-medium text-slate-700">Back</label>
                
                <!-- Back Image Upload -->
                <div class="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 transition-colors">
                  <div v-if="card.backImage" class="relative">
                    <img :src="card.backImage" alt="Back" class="max-h-32 mx-auto rounded" />
                    <button
                      @click="card.backImage = ''"
                      class="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                      </svg>
                    </button>
                  </div>
                  <div v-else>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 mx-auto text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p class="text-sm text-gray-500 mb-2">Click to upload image</p>
                    <input
                      type="file"
                      accept="image/*"
                      @change="(e) => handleImageUpload(e, card, 'back')"
                      class="hidden"
                      :ref="`backImage${index}`"
                    />
                    <button
                      @click="($refs as any)[`backImage${index}`][0].click()"
                      class="text-blue-500 hover:text-blue-600 text-sm"
                    >
                      Choose file
                    </button>
                  </div>
                </div>
  
                <!-- Back Text -->
                <textarea
                  v-model="card.backText"
                  rows="4"
                  placeholder="Back of card..."
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
                />
              </div>
            </div>
          </div>
  
          <!-- Add Card Button -->
          <button
            @click="addCard"
            class="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-400 hover:text-blue-500 transition-colors flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
            </svg>
            Add Another Card
          </button>
        </div>
  
        <!-- Footer -->
        <div class="p-6 border-t border-gray-200 flex gap-3 justify-end bg-gray-50">
          <button
            @click="handleCancel"
            class="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            @click="handleSubmit"
            class="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors font-medium"
          >
            {{ isEditMode ? 'Update Flashcard Deck' : 'Insert Flashcard Deck' }}
          </button>
      </div>
      </div>
    </template>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import ModalWrapper from '@/components/ModalWrapper.vue'
  
  interface FlashcardData {
    deckId?: string
    title: string
    description: string
    cards: Array<{
      id: string
      frontText: string
      frontImage: string
      backText: string
      backImage: string
    }>
  }
  
  interface CardData {
    id: string
    frontText: string
    frontImage: string
    backText: string
    backImage: string
  }
  
  const props = defineProps<{
    existingData?: FlashcardData
    uploadEndpoint: string
    wrapInModal?: boolean
    inModal?: boolean
  }>()

  
  const emit = defineEmits<{
    submit: [data: FlashcardData]
    cancel: []
  }>()
  
  const isEditMode = ref(!!props.existingData)
  const deckTitle = ref(props.existingData?.title || '')
  const deckDescription = ref(props.existingData?.description || '')
  const cards = ref<CardData[]>(
    props.existingData?.cards || [createEmptyCard()]
  )
  const titleInput = ref<HTMLInputElement | null>(null)
  
  
  function createEmptyCard(): CardData {
    return {
      id: `card-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      frontText: '',
      frontImage: '',
      backText: '',
      backImage: ''
    }
  }
  
  function addCard() {
    cards.value.push(createEmptyCard())
  }
  
  function removeCard(index: number) {
    if (cards.value.length > 1) {
      cards.value.splice(index, 1)
    }
  }
  
  async function handleImageUpload(event: Event, card: CardData, side: 'front' | 'back') {
    const input = event.target as HTMLInputElement
    const file = input.files?.[0]
    
    if (!file) return
  

    try {
      const formData = new FormData()
      formData.append('image', file)
      const response = await fetch(props.uploadEndpoint, {
        method: 'POST',
        body: formData
      })
      const data = await response.json()
      const imageUrl = data.link
  
      // Temporary: Create object URL for preview
      // const imageUrl = URL.createObjectURL(file)
      
      if (side === 'front') {
        card.frontImage = imageUrl
      } else {
        card.backImage = imageUrl
      }
    } catch (error) {
      console.error('Image upload failed:', error)
      alert('Failed to upload image')
    }
  }
  
  function handleSubmit() {
    if (!deckTitle.value.trim()) {
      alert('Please enter a deck title')
      return
    }
  
    // Check if at least one card has content
    const hasContent = cards.value.some(
      card => card.frontText.trim() || card.backText.trim() || card.frontImage || card.backImage
    )
  
    if (!hasContent) {
      alert('Please add content to at least one card')
      return
    }
  
    emit('submit', {
      deckId: props.existingData?.deckId || `deck-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      title: deckTitle.value,
      description: deckDescription.value,
      cards: cards.value
    })
  }
  
  function handleCancel() {
    emit('cancel')
  }
  
  onMounted(() => {
    titleInput.value?.focus()
  })
  </script>