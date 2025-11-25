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
          <div class="header">
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
          </div>

          <FroalaEditor
            v-model="content"
            :config="froalaConfig"
            editor-id="my-document-editor"
            storage-key="my-document-1"
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
const content =
  ref(`<p><strong><span style="font-size: 24px;">Quotable Connections</span></strong></p>

<blockquote>

	<p><span style="font-size: 20px; color: rgb(0, 0, 0);"><em>&nbsp;&quot;I sit with Shakespeare and he winces not.&quot; &mdash;W.E.B. DuBois</em></span></p>
</blockquote>
<hr>

<p><strong><span style="font-size: 18px;">&nbsp; &nbsp;Part A</span></strong><span style="font-size: 16px;"> : Read each quote carefully. State the main idea of each one in your own words using the response area provided.</span></p>

<p>&nbsp; &nbsp; &nbsp;&nbsp;</p>

<p id="isPasted" style="margin-left: 20px; line-height: 1;"><img src="https://reader2-content-dev.comprodls.com/uploads/1763377070650_image1.png" style="width: 70px; display: inline-block; vertical-align: bottom; margin: 5px 0px; text-align: left; max-width: calc(100% - 5px); float: left;" class="circle">&nbsp; </p>

<p style="margin-left: 20px; line-height: 1;">&nbsp; &nbsp; <strong><span style="font-size: 18px;">W.E.B Dubois</span></strong></p>

<p style="margin-left: 20px; line-height: 1;">&nbsp; &nbsp; <span style="font-size: 14px;"><em>The Souls Of Black Folk</em></span></p>

<p>

	<br>
</p>

<p><span style="font-size: 16px;">&nbsp; &nbsp; ...the Negro is a sort of seventh son, born with a veil, and gifted with second-sight in this American world,&mdash;a world which yields him no true self-consciousness, but only lets him &nbsp; &nbsp; &nbsp; &nbsp; see himself through the revelation of the other world. It is a peculiar sensation, this <strong>double-consciousness</strong>, this sense of always <strong>looking at one&#39;s self through the eyes of&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; others</strong>&hellip;</span></p>

<p>&nbsp; &nbsp; &nbsp;&nbsp;</p>

<table style="width: 93%; height: 100px; margin: auto auto auto calc(2%); border-width: 1px; border-style: solid;">
	<tbody>
		<tr>
			<td style="width: 1200px; text-align: left; padding: 16px; vertical-align: top; height: 106px;">Please add your response here.</td>
		</tr>
	</tbody>
</table>

<p><span style="font-size: 16px;">&nbsp; &nbsp;&nbsp;</span></p>

<p id="isPasted" style="margin-left: 20px; line-height: 1;"><img src="https://reader2-content-dev.comprodls.com/uploads/1764046601559_image2.png" style="width: 70px; display: inline-block; vertical-align: bottom; margin: 5px 15px 5px 0px; text-align: left; max-width: calc(100% - 5px); float: left;" class="circle">&nbsp; </p>

<p style="line-height: 1; margin-left: 20px;"><span style="font-size: 18px;"><strong>Ralph Ellison</strong></span></p>

<p style="line-height: 1; margin-left: 20px;"><em>Invisible Man</em></p>

<p style="line-height: 1; margin-left: 20px;">
	<br>
</p>

<p style="line-height: 1; margin-left: 20px;">&nbsp;&nbsp;</p>

<p style="line-height: 1; margin-left: 20px;"><span style="font-size: 16px;">I am an invisible man&hellip;<strong> I am invisible</strong>, understand, simply because people refuse to see me&hellip; they see only my surroundings, themselves or figments of their imagination, anything except me.</span></p>

<p style="line-height: 1; margin-left: 20px;">
	<br>
</p>

<table style="width: 95%; height: 100px; margin: auto auto auto calc(1%); border-width: 1px; border-style: solid;">
	<tbody>
		<tr>
			<td style="width: 1146px; height: 106px; padding: 16px; vertical-align: top;">Please add your response here.</td>
		</tr>
	</tbody>
</table>

<p>&nbsp; &nbsp; &nbsp;</p>

<p id="isPasted" style="margin-left: 20px; line-height: 1;"><img src="https://reader2-content-dev.comprodls.com/uploads/1764047689070_image3.png" style="width: 70px; display: inline-block; vertical-align: bottom; margin: 5px 15px 5px 0px; text-align: left; max-width: calc(100% - 5px); float: left;" class="circle"></p>

<p style="margin-left: 100px; line-height: 1;">
	<br>
</p>



<p id="isPasted" style="margin-left: 100px; line-height: 1;"><span style="font-size: 18px;"><strong>William Shakespeare</strong></span></p>

<p style="margin-left: 100px; line-height: 1;"><em>Othello</em></p>

<p style="line-height: 1; margin-left: 100px;">
	<br>
</p>



<p>&nbsp; &nbsp;</p>

<p>&nbsp; <span style="font-size: 16px;">&nbsp; &nbsp; &hellip;<strong>Speak of me as I am. Nothing extenuate, nor set down aught in malice</strong>. Then must you speak of one that loved not wisely but too well&hellip; Of one whose hand threw a pearl&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;away &nbsp;richer than all his tribe&hellip;</span></p>

<p>
	<br>
</p>

<table style="width: 90%; height: 100px; margin: auto auto auto calc(2%); border-width: 1px; border-style: solid;">
	<tbody>
		<tr>
			<td style="width: 1200px; text-align: left; padding: 16px; vertical-align: top; height: 106px;">Please add your response here.</td>
		</tr>
	</tbody>
</table>

<p style="margin-left: 20px;">
	<br>
</p>

<p style="margin-left: 20px;">
	<br>
</p>
<hr>

<p>
	<br>
</p>

<p>
	<br>
</p>

<p><span style="font-size: 16px;"><strong>&nbsp; &nbsp;</strong></span><span style="font-size: 18px;"><strong>Part B</strong></span><span style="font-size: 16px;"><strong> : </strong>Connect the main ideas stated by the authors above. How do their ideas compliment each other? Explain..</span></p>

<p>&nbsp; &nbsp;</p>

<table style="width: 95%; height: 100px; margin: auto auto auto calc(1%); border-width: 1px; border-style: solid;">
	<tbody>
		<tr>
			<td style="width: 1200px; text-align: left; padding: 16px; vertical-align: top; height: 106px;">Please add your response here.</td>
		</tr>
	</tbody>
</table>

<p><span style="font-size: 16px;">


<br>
</span></p>


`);
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
      localStorage.removeItem("my-document-1");
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
