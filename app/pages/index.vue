<template>
  <div>
    <!-- <section class="flex align-middle my-4 gap-6 p-4s">
      <h1 class="text-3xl ml-36">My Document Editor</h1>

      <div class="actions ml-auto">
        <button
          class="btn btn-primary"
          @click="openPreviewModal"
          :disabled="!content.trim()"
        >
          Preview Document
        </button>
        <button class="btn btn-secondary ml-3" @click="saveDocument">
          Save Document
        </button>
      </div>
    </section> -->
    <ClientOnly>
      <template #default>
        <div class="docs-layout">
          <!-- <div class="header">
            <ul class="breadcrumbs">
              <li>Survey Course</li>
              <li>
                <span class="separator">❯</span>
                ELA
              </li>
              <li>
                <span class="separator">❯</span>
                Othello's Renaissance
              </li>
            </ul>

            <h1 class="step-name" style="margin: 0">
              Segment : Quotable Connections
            </h1>
          </div> -->

          <FroalaEditor
            v-model="content"
            :config="froalaConfig"
            editor-id="my-document-editor"
            storage-key="my-document-data"
            :auto-save="true"
          />
        </div>
      </template>

      <template #fallback>
        <div class="loading-placeholder">Loading editor...</div>
      </template>
    </ClientOnly>

    <!-- Preview Modal -->
    <PreviewModal
      :is-open="isPreviewModalOpen"
      :content="content"
      @close="closePreviewModal"
    />
  </div>
</template>

<script setup>
import PrevIcon from "@/assets/icons/chevron-right.svg?component";
const content = ref(`<h1><span style="font-size: 36px;">Understanding Photosynthesis: The Foundation of Life</span></h1>

<h2><span style="font-size: 24px;">Introduction to Photosynthesis</span></h2>

<p><span style="color: rgb(0, 0, 0); font-size: 16px;">Photosynthesis is one of the most important biological processes on our planet. It&#39;s how plants, algae, and some bacteria convert light energy into chemical energy stored in glucose. Without photosynthesis, life as we know it wouldn&#39;t exist.</span>
	<br>
</p>

<blockquote>
	<div class="callout">

		<p><strong><span style="color: rgb(85, 57, 130); font-size: 18px;">Key Concept:</span></strong><span style="color: rgb(85, 57, 130); font-size: 18px;"> Photosynthesis is the process by which green plants use sunlight to synthesize nutrients from carbon dioxide and water. It generates oxygen as a byproduct.</span></p><span style="color: rgb(85, 57, 130);">
</span></div><span style="color: rgb(85, 57, 130);">
</span></blockquote><span style="color: rgb(85, 57, 130);">

</span>

<p>
	<br>
</p>

<h2><span style="font-size: 24px;">The Chemical Equation</span></h2>

<p><span style="color: rgb(0, 0, 0); font-size: 16px;">The overall process of photosynthesis can be represented by this chemical equation</span>
	<br>
</p>

<p>
	<math xmlns="http://www.w3.org/1998/Math/MathML">
		<mstyle mathsize="26px">
			<mn>6</mn>
			<msub>
				<mi>CO</mi>
				<mn>2</mn>
			</msub>
			<mo>+</mo>
			<mn>6</mn>
			<msub>
				<mi>H</mi>
				<mn>2</mn>
			</msub>
			<mi>O</mi>
			<mo>+</mo>
			<mtext>light energy</mtext>
			<mo>&#8594;</mo>
			<msub>
				<mi>C</mi>
				<mn>6</mn>
			</msub>
			<msub>
				<mi>H</mi>
				<mn>12</mn>
			</msub>
			<msub>
				<mi>O</mi>
				<mn>6</mn>
			</msub>
			<mo>+</mo>
			<mn>6</mn>
			<msub>
				<mi>O</mi>
				<mn>2</mn>
			</msub>
		</mstyle>
	</math>
</p>
<div class="equation-block"><span style="color: rgb(0, 0, 0); font-size: 16px;">This equation shows that six molecules of carbon dioxide and six molecules of water, in the presence of light energy, produce one molecule of glucose and six molecules of oxygen.</span></div>

<h3><span style="font-size: 18px;">Breaking Down the Components</span></h3>

<table style="width: 52%; height: 100px; margin: auto calc(28%) auto auto; border-width: 1px; border-style: solid;">
	<tbody>
		<tr>
			<td style="width: 33.3333%; text-align: center; background-color: rgb(209, 213, 216);"><strong>Component</strong></td>
			<td style="width: 24.5504%; text-align: center; background-color: rgb(209, 213, 216);"><strong>Chemical Formula</strong></td>
			<td style="width: 42.0168%; text-align: center; background-color: rgb(209, 213, 216);"><strong>Role in Photosynthesis</strong></td>
		</tr>
		<tr>
			<td style="width: 33.3333%; text-align: center;">Carbon Dioxide</td>
			<td style="width: 24.5504%;">
				<math xmlns="http://www.w3.org/1998/Math/MathML" class="wrs_chemistry">
					<msub>
						<mi>CO</mi>
						<mn>2</mn>
					</msub>
				</math>
			</td>
			<td style="width: 42.0168%; text-align: center;">Raw material absorbed through roots</td>
		</tr>
		<tr>
			<td style="width: 33.3333%; text-align: center;">Water</td>
			<td style="width: 24.5504%;">
				<math xmlns="http://www.w3.org/1998/Math/MathML" class="wrs_chemistry">
					<msub>
						<mi mathvariant="normal">H</mi>
						<mn>2</mn>
					</msub>
					<mi mathvariant="normal">O</mi>
				</math>
			</td>
			<td style="width: 42.0168%; text-align: center;">Raw material absorbed through roots</td>
		</tr>
		<tr>
			<td style="width: 33.3333%; text-align: center;">Glucose</td>
			<td style="width: 24.5504%;">
				<math xmlns="http://www.w3.org/1998/Math/MathML" class="wrs_chemistry">
					<msub>
						<mi mathvariant="normal">C</mi>
						<mn>6</mn>
					</msub>
					<msub>
						<mi mathvariant="normal">H</mi>
						<mn>12</mn>
					</msub>
					<msub>
						<mi mathvariant="normal">O</mi>
						<mn>6</mn>
					</msub>
				</math>
			</td>
			<td style="width: 42.0168%; text-align: center;">Energy-rich product used by plant</td>
		</tr>
		<tr>
			<td style="width: 33.3333%; text-align: center;">Oxygen</td>
			<td style="width: 24.5504%;">
				<math xmlns="http://www.w3.org/1998/Math/MathML" class="wrs_chemistry">
					<msub>
						<mi mathvariant="normal">O</mi>
						<mn>2</mn>
					</msub>
				</math>
			</td>
			<td style="width: 42.0168%; text-align: center;">Byproduct released into atmosphere
				<br>
			</td>
		</tr>
	</tbody>
</table>

<p>
	<br>
</p>

<h2><span style="font-size: 24px;">How Photosynthesis Works: The Video Explanation</span></h2>

<p><span style="font-size: 16px; color: rgb(0, 0, 0);">Watch this detailed explanation of the photosynthesis process</span>:</p>

<p><span contenteditable="false" draggable="true" class="fr-video fr-deletable fr-draggable" style="display: block; clear: both; text-align: center;"><iframe width="640" height="360" src="https://www.youtube.com/embed/uixA8ZXx0KU?&wmode=opaque&rel=0" frameborder="0" allowfullscreen="" class="fr-draggable"><span class="fr-mk" style="display: none;">&nbsp;</span><span class="fr-mk" style="display: none;">&nbsp;</span><span class="fr-mk" style="display: none;">&nbsp;</span><span class="fr-mk" style="display: none;"> </span><span class="fr-mk" style="display: none;"> </span><span class="fr-mk" style="display: none;"> </span><span class="fr-mk" style="display: none;"> </span><span class="fr-mk" style="display: none;"> </span><span class="fr-mk" style="display: none;"> </span><span class="fr-mk" style="display: none;"> </span><span class="fr-mk" style="display: none;"> </span><span class="fr-mk" style="display: none;"> </span><span class="fr-mk" style="display: none;"> </span><span class="fr-mk" style="display: none;"> </span><span class="fr-mk" style="display: none;"> </span><span class="fr-mk" style="display: none;"> </span><span class="fr-mk" style="display: none;"> </span></iframe>
	</span></p>

<p>
	<br>
</p>

<h2><span style="font-size: 24px;">The Role of Light in Photosynthesis</span></h2>

<p><span style="color: rgb(0, 0, 0); font-size: 16px;">Light is the driving force behind photosynthesis. Different wavelengths of light affect the rate of photosynthesis differently. Chlorophyll primarily absorbs red and blue light, while reflecting green light (which is why plants appear green to us).</span></p>

<p>
	<br>
</p>
<figure class="image-with-caption">
	<figcaption>
		<span class="fr-img-caption" style="width: 553px; display: block; vertical-align: top; margin: 5px auto; text-align: center;"><span class="fr-img-wrap"><img src="https://reader2-content-dev.comprodls.com/uploads/1767696179682_image123.jfif" style="width: 553px; display: block; vertical-align: top; margin: 5px auto; text-align: center;"><span class="fr-inner">Sunlight provides the energy that drives the photosynthetic process</span></span></span>
	</figcaption>
</figure>

<h3><span style="font-size: 18px;">Factors Affecting Photosynthetic Rate</span></h3>

<p><span style="color: rgb(0, 0, 0); font-size: 16px;">Several environmental factors influence how quickly photosynthesis occurs:</span></p>

<ol>
	<li style="color: rgb(0, 0, 0); font-size: 16px;"><strong>Light Intensity:</strong> Higher light intensity generally increases the rate of photosynthesis, up to a saturation point</li><span style="color: rgb(0, 0, 0); font-size: 16px;">
</span>
	<li style="color: rgb(0, 0, 0); font-size: 16px;"><strong>Carbon Dioxide Concentration:</strong> More (CO_2) typically means faster photosynthesis</li><span style="color: rgb(0, 0, 0); font-size: 16px;">
</span>
	<li style="color: rgb(0, 0, 0); font-size: 16px;"><strong>Temperature:</strong> Enzymes work best at optimal temperatures (usually 25-35&deg;C for most plants)</li><span style="color: rgb(0, 0, 0); font-size: 16px;">
</span>
	<li style="color: rgb(0, 0, 0); font-size: 16px;"><strong>Water Availability:</strong> Adequate water is essential for the light-dependent reactions</li>
</ol>
<div class="callout callout-warning">

	<p>
		<br>
	</p>
</div>

<h2><span style="font-size: 24px;">Advanced Topic: The Calvin Cycle</span></h2>

<p><span style="color: rgb(0, 0, 0); font-size: 16px;">The Calvin cycle, also known as the light-independent reactions or dark reactions, is where carbon dioxide is actually converted into glucose. This cycle occurs in the stroma of the chloroplast and consists of three main phases:</span></p>

<blockquote><span style="font-size: 18px; color: rgb(85, 57, 130);">&quot;The Calvin cycle is nature&#39;s way of building sugar molecules, one carbon atom at a time, using the energy captured from sunlight during the light-dependent reactions.&quot;</span></blockquote><span style="color: rgb(85, 57, 130);">

</span>

<p>
	<br>
</p>

<h2><span style="font-size: 24px;">Additional Resources</span></h2>

<p><span style="font-size: 16px; color: rgb(0, 0, 0);">Explore these curated resources to deepen your understanding:</span></p>

<p>
	<a href="https://www.khanacademy.org/science/biology" class="embedded-link" target="_blank" rel="noopener noreferrer">Khan Academy: Biology</a>
	<a href="https://www.nature.com/subjects/photosynthesis" class="embedded-link" target="_blank" rel="noopener noreferrer">Nature: Photosynthesis Research</a>
	<a href="https://www.nasa.gov/audience/forstudents/photosynthesis" class="embedded-link" target="_blank" rel="noopener noreferrer">NASA: Photosynthesis Overview</a>
</p>
`)
const isPreviewModalOpen = ref(false);

const froalaConfig = {
  documentReady: true,
  height: 500,
  placeholderText: "Start writing your document...",
};

const openPreviewModal = () => {
  if (content.value && content.value.trim()) {
    isPreviewModalOpen.value = true;
  }
};

const closePreviewModal = () => {
  isPreviewModalOpen.value = false;
};

const saveDocument = () => {
  // Implement your save logic here
  console.log("Saving document:", content.value);
  // You could save to localStorage, send to API, etc.
  localStorage.setItem("froala-document", content.value);
  alert("Document saved!");
};

// Load saved content on mount
onMounted(() => {
  if (typeof window !== "undefined") {
    const url = new URL(window.location.href);
    if (url.searchParams.has("reset")) {
      localStorage.removeItem("my-document-data");
      url.searchParams.delete("reset");
      window.history.replaceState({}, "", url);
    }
  }

  const saved = localStorage.getItem("froala-document");
  if (saved) {
    content.value = saved;
  }
});
</script>

<style scoped>
.docs-layout {
  height: 100vh;
  overflow-y: auto;
  padding: 0;
  margin: 0;
}

.fr-box,
.fr-wrapper,
.fr-element {
  width: 100% !important;
  max-width: 100% !important;
  margin: 0 auto !important;
  padding: auto 0;
  margin-top: 50px !important;
}
.fr-toolbar {
  position: sticky !important;
  top: 70px !important; /* equal to header height */
  z-index: 999 !important;
  background: white !important;
  border-bottom: 1px solid #ddd;
}

.fr-wrapper {
  margin-top: 50px; /* equal to toolbar height */
}

.fr-toolbar {
  background-color: white;
  border-bottom: 1px solid #ddd;
}

.loading-placeholder {
  height: 500px;
  border: 1px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f9f9f9;
  color: #666;
  border-radius: 4px;
}

.actions {
  display: flex;
  align-items: center;
}

.btn {
  padding: 10px 20px;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid;
  font-size: 14px;
  text-decoration: none;
  display: inline-block;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-primary {
  background-color: #3b82f6;
  color: white;
  border-color: #3b82f6;
}

.btn-primary:hover:not(:disabled) {
  background-color: #2563eb;
  border-color: #2563eb;
}

.btn-secondary {
  background-color: white;
  color: #374151;
  border-color: #d1d5db;
}

.btn-secondary:hover {
  background-color: #f9fafb;
  border-color: #9ca3af;
}

.mb-6 {
  margin-bottom: 1.5rem;
}

.ml-3 {
  margin-left: 0.75rem;
}

.unit-name {
  display: flex;
  align-items: center; /* Aligns items vertically center */
  gap: 10px; /* Space between icon and text */
  font-size: 20px;
  color: #757575;
  font-family: "Inter", sans-serif;
  margin: 0;
  margin-bottom: 8px !important;
}

/* Ensure the SVG icon has a proper size */
.unit-name svg {
  width: 20px;
  height: 20px;
  flex-shrink: 0; /* Prevents the icon from shrinking */
}
.step-name {
  font-size: 32px;
  font-family: "Inter", sans-serif;
  margin: 0;
  margin-bottom: 0px !important;
}
.lesson-name {
  font-size: 24px;
  font-family: "Inter", sans-serif;
  margin: 0;
  margin-bottom: 8px !important;
}
.header {
  position: sticky !important;
  top: 0 !important;
  z-index: 100 !important;
  padding: 32px;

  padding-left: 24px !important;
  padding-bottom: 16px !important;
  background-color: white;
}
.unit-name svg {
  fill: #757575; /* Same as your text color */
}
.unit-name-text {
  padding-left: 4px !important;
}
.breadcrumbs {
  display: flex;
  align-items: center;
  padding: 0;
  margin: 0;
  list-style: none;
  font-family: Arial, sans-serif;
}

.breadcrumbs li {
  display: flex;
  align-items: center;
  font-size: 18px;
  color: #757575;
}

.breadcrumbs .separator {
  margin: 0 8px;
  color: #757575;
  font-size: 14px;
}
</style>
