<template>
  <div class="design-blocks-selector">
    <div class="modal-header">
      <h2>Select a Design Block</h2>
      <button @click="handleCancel" class="close-btn" aria-label="Close">
        ×
      </button>
    </div>

    <div class="modal-body">
      <div v-if="loading" class="loading-state">
        <p>Loading design blocks...</p>
      </div>

      <div v-else ref="designBlocksContainer" class="blocks-container"></div>
    </div>

    <div class="modal-footer">
      <button @click="handleCancel" class="btn btn-secondary">Cancel</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from "vue";

const emit = defineEmits(["submit", "cancel"]);

const designBlocksContainer = ref(null);
const loading = ref(true);

const handleCancel = () => {
  emit("cancel");
};

const handleBlockSelect = (html) => {
  emit("submit", html);
};

onMounted(async () => {
  if (process.client) {
    loading.value = false;
    await nextTick();

    try {
      // Import Froala Design Blocks CSS
      // Import Froala Design Blocks CSS
      const froalaBlocksCSS = document.createElement("link");
      froalaBlocksCSS.rel = "stylesheet";
      froalaBlocksCSS.href =
        "https://cdn.jsdelivr.net/gh/froala/design-blocks@master/dist/css/froala_blocks.min.css";
      document.head.appendChild(froalaBlocksCSS);

      // Import Bootstrap CSS (required dependency)
      const bootstrapCSS = document.createElement("link");
      bootstrapCSS.rel = "stylesheet";
      bootstrapCSS.href =
        "https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css";
      document.head.appendChild(bootstrapCSS);

      // Import Font Awesome (required dependency)
      const fontAwesomeCSS = document.createElement("link");
      fontAwesomeCSS.rel = "stylesheet";
      fontAwesomeCSS.href =
        "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css";
      document.head.appendChild(fontAwesomeCSS);

      // Load design blocks HTML
      const response = await fetch(
        "https://raw.githubusercontent.com/froala/design-blocks/master/dist/froala_blocks.html"
      );
      const blocksHTML = await response.text();

      // Parse and display blocks
      const parser = new DOMParser();
      const doc = parser.parseFromString(blocksHTML, "text/html");
      const blocks = doc.querySelectorAll(".fdb-block");

      if (blocks.length > 0) {
        // Create a grid of block previews
        const grid = document.createElement("div");
        grid.className = "blocks-grid";

        blocks.forEach((block, index) => {
          const card = document.createElement("div");
          card.className = "block-card";

          const preview = document.createElement("div");
          preview.className = "block-preview";
          preview.innerHTML = block.outerHTML;

          const name = document.createElement("div");
          name.className = "block-name";
          name.textContent = `Block ${index + 1}`;

          card.appendChild(name);
          card.appendChild(preview);

          card.addEventListener("click", () => {
            handleBlockSelect(block.outerHTML);
          });

          grid.appendChild(card);
        });

        designBlocksContainer.value.appendChild(grid);
      } else {
        // Fallback to custom blocks if fetch fails
        createFallbackBlocks();
      }
    } catch (error) {
      console.error("Error loading Froala Design Blocks:", error);
      createFallbackBlocks();
    }
  }
});

const createFallbackBlocks = () => {
  if (!designBlocksContainer.value) return;

  const blocks = [
    {
      name: "Hero Section",
      html: `<section class="fdb-block">
  <div class="container">
    <div class="row text-center align-items-center">
      <div class="col-8 col-md-4">
        <img alt="image" class="img-fluid" src="https://cdn.jsdelivr.net/gh/froala/design-blocks@master/dist/imgs/photos/map-1.jpg">
      </div>

      <div class="col-4 col-md-2">
        <div class="row">
          <div class="col-12">
            <img alt="image" class="img-fluid" src="https://cdn.jsdelivr.net/gh/froala/design-blocks@master/dist/imgs/photos/map-2.jpg">
          </div>
        </div>

        <div class="row mt-4">
          <div class="col-12">
            <img alt="image" class="img-fluid" src="https://cdn.jsdelivr.net/gh/froala/design-blocks@master/dist/imgs/photos/map-3.jpg">
          </div>
        </div>
      </div>

      <div class="col-12 col-md-6 col-lg-5 ml-auto pt-5 pt-md-0">
        <img alt="image" class="fdb-icon" src="https://cdn.jsdelivr.net/gh/froala/design-blocks@master/dist/imgs/icons/github.svg">
        <h1>Design Blocks</h1>
        <p class="lead">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia.</p>
      </div>
    </div>
  </div>
</section>`,
    },
    {
      name: "Feature Cards",
      html: `<section class="fdb-block">
  <div class="col-fill-left" style="background-image: url(https://cdn.jsdelivr.net/gh/froala/design-blocks@master/dist/imgs/people/5.jpg);">
  </div>

  <div class="container">
    <div class="row justify-content-end">
      <div class="col-12 col-md-5 text-center">
        <h1>Froala Blocks</h1>
        <p class="lead">When she reached the first hills of the Italic Mountains, she had a last view back on the skyline of her hometown Bookmarksgrove</p>
      </div>
    </div>
  </div>
</section>`,
    },
    {
      name: "Feature Cards",
      html: `<section class="fdb-block">
  <div class="container">
    <div class="row align-items-center">
      <div class="col-12 col-md-6 mb-4 mb-md-0">
        <img alt="image" class="img-fluid" src="https://cdn.jsdelivr.net/gh/froala/design-blocks@master/dist/imgs/draws/smile.svg">
      </div>
      <div class="col-12 col-md-6 col-lg-5 ml-md-auto text-left">
        <h1>Froala Blocks</h1>
        <p class="lead">A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.</p>
      </div>
    </div>
  </div>
</section>`,
    },
  ];

  const grid = document.createElement("div");
  grid.className = "blocks-grid";

  blocks.forEach((block) => {
    const card = document.createElement("div");
    card.className = "block-card";

    const preview = document.createElement("div");
    preview.className = "block-preview";
    preview.innerHTML = block.html;

    const name = document.createElement("div");
    name.className = "block-name";
    name.textContent = block.name;

    card.appendChild(name);
    card.appendChild(preview);

    card.addEventListener("click", () => {
      handleBlockSelect(block.html);
    });

    grid.appendChild(card);
  });

  designBlocksContainer.value.appendChild(grid);
};

onBeforeUnmount(() => {
  // Cleanup
});
</script>

<style scoped>
.design-blocks-selector {
  display: flex;
  flex-direction: column;
  height: 80vh;
  max-height: 800px;
  background: white;
  border-radius: 8px;
  overflow: hidden;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid #e5e7eb;
  background: white;
}

.modal-header h2 {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: #1f2937;
}

.close-btn {
  background: none;
  border: none;
  font-size: 32px;
  color: #6b7280;
  cursor: pointer;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  transition: color 0.2s;
}

.close-btn:hover {
  color: #1f2937;
}

.modal-body {
  flex: 1;
  overflow-y: auto;
  padding: 24px;
  background: #f9fafb;
}

.loading-state {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  color: #6b7280;
}

.blocks-container {
  width: 100%;
}

.blocks-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
}

.block-card {
  background: white;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.2s;
}

.block-card:hover {
  border-color: #667eea;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.15);
  transform: translateY(-2px);
}

.block-preview {
  height: 200px;
  overflow: hidden;
  background: white;
  position: relative;
}

.block-preview :deep(*) {
  transform: scale(0.3);
  transform-origin: top left;
  width: 333.33%;
  pointer-events: none;
}

.block-name {
  padding: 16px;
  font-weight: 600;
  font-size: 16px;
  color: #111827;
  border-bottom: 1px solid #e5e7eb;
  background: #fff;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 16px 24px;
  border-top: 1px solid #e5e7eb;
  background: white;
}

.btn {
  padding: 10px 20px;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid;
  font-size: 14px;
}

.btn-secondary {
  background: white;
  color: #374151;
  border-color: #d1d5db;
}

.btn-secondary:hover {
  background: #f9fafb;
  border-color: #9ca3af;
}
</style>
