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
            <li> Survey Course </li>
              <li>
                <span class="separator">❯</span>
              ELA</li>
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
const content = ref(`
<p><strong><span style="font-size: 24px;">Quotable Connections</span></strong></p>

<blockquote>

	<p><span style="font-size: 20px; color: rgb(0, 0, 0);"><em>&nbsp;&quot;I sit with Shakespeare and he winces not.&quot; &mdash;W.E.B. DuBois</em></span></p>
</blockquote>
<hr>

<p><strong><span style="font-size: 18px;">&nbsp; &nbsp;Part A</span></strong><span style="font-size: 16px;"> : Read each quote carefully. State the main idea of each one in your own words using the response area provided.</span></p>

<p>

	<br>
</p>

<table style="width: 99%; height: 100px; margin: auto; border-width: 0px; border-style: solid;">
	<tbody>
		<tr>
			<td style="width: 6.2549%; vertical-align: top; text-align: justify;">&nbsp; 1.
			</td>
			<td style="width: 47.115%; vertical-align: top; text-align: left; padding: 4px;" data-cell-padding="4px">

				...the Negro is a sort of seventh son, born with a veil, and gifted with second-sight in this American world,&mdash;a world which yields him no true self-consciousness, but only lets him see himself through the revelation of the other world. It is a peculiar sensation, this double-consciousness, this sense of always <strong>looking at one&#39;s self through the eyes of others, of measuring one&#39;s soul by the tape of a world that looks on in amused contempt and pity</strong>.

				<p style="text-align: left; line-height: 1;"><span style="line-height: 1;"><img src="https://reader2-content-dev.comprodls.com/uploads/1763377070650_image1.png" style="width: 60px; display: inline-block; vertical-align: bottom; margin: 5px 0px; text-align: left; max-width: calc(100% - 5px); float: left;" class="circle">&nbsp; </span></p>

				<p style="text-align: left; line-height: 1;"><span style="line-height: 1;"><strong><span style="font-size: 16px;">&nbsp; &nbsp; W.E.B Dubois</span></strong></span></p>

				<p style="text-align: left; line-height: 1;"><span style="line-height: 1;">&nbsp; &nbsp; <em>The Souls Of Black Folk</em></span>
					<br>
				</p>
			</td>
			<td style="width: 46.5472%;"></td>
		</tr>
		<tr>
			<td style="width: 6.2549%; vertical-align: top;">&nbsp; 2.</td>
			<td style="width: 47.115%; text-align: right; padding: 4px;" data-cell-padding="4px">

				<p id="isPasted" style="text-align: left;">I am an invisible man. . .<strong> I am invisible</strong>, understand, simply because people refuse to see me. Like the bodiless heads you see sometimes in circus sideshows, it is as though I have been surrounded by mirrors of hard, distorting glass. When they approach me <strong>they see only my surroundings, themselves or figments of their imagination, indeed, everything and anything except me.</strong></p>

				<p style="text-align: left; line-height: 1;"><span style="line-height: 1;"><img src="https://reader2-content-dev.comprodls.com/uploads/1763376364127_image2.png" style="width: 60px; display: inline-block; vertical-align: bottom; margin: 5px 0px; text-align: left; max-width: calc(100% - 5px); float: left;" class="circle"></span></p>

				<p style="text-align: left; line-height: 1;">
					<br>
				</p>

				<p style="text-align: left; line-height: 1;"><strong>&nbsp; &nbsp;&nbsp;</strong><strong><span style="line-height: 1; font-size: 16px;">Ralph Ellison</span></strong></p>

				<p style="text-align: left; line-height: 1;"><span style="line-height: 1;"><em>&nbsp; &nbsp; <span style="font-size: 14px;">Invisible Man</span></em></span></p>
			</td>
			<td style="width: 46.5472%;"></td>
		</tr>
		<tr>
			<td style="width: 6.2549%; vertical-align: top; text-align: left;">&nbsp;3.</td>
			<td style="width: 47.115%; padding: 4px;" data-cell-padding="4px">. . .I pray you, in your letters, / When you shall these unlucky deeds relate, / <strong>Speak of me as I am. Nothing extenuate, / Nor set down aught in malice</strong>. Then must you speak / Of one that loved not wisely, but too well. / Of one not easily jealous, but being wrought, / Perplexed in the extreme. Of one whose hand, / Like the base Indian, threw a pearl away / Richer than all his tribe. Of one whose subdued eyes, / Albeit unused to the melting mood, / Drop tears as fast as the Arabian trees / Their medicinal gum. . . &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;

				<p id="isPasted" style="line-height: 1;"><span style="line-height: 1;"><img src="https://reader2-content-dev.comprodls.com/uploads/1763376718173_image3.png" style="width: 60px; display: inline-block; vertical-align: bottom; margin: 5px 0px; text-align: left; max-width: calc(100% - 5px); float: left;" class="circle"></span></p>

				<p style="line-height: 1;">
					<br>
				</p>

				<p style="line-height: 1;"><strong>&nbsp;<span style="font-size: 16px;"> &nbsp;&nbsp;</span><span style="line-height: 1; font-size: 16px;">William Shakespeare</span></strong></p>

				<p style="line-height: 1;"><span style="line-height: 1;"><em>&nbsp; &nbsp; Othello</em></span></p>
			</td>
			<td style="width: 46.5472%;"></td>
		</tr>
	</tbody>
</table>

<p>
	<br>
</p>
<hr>

<p>
	<span style="font-size: 16px;"><strong>&nbsp; &nbsp;</strong></span></p>

<p><span style="font-size: 16px;"><strong>&nbsp; &nbsp;</strong></span><span style="font-size: 18px;"><strong>Part B</strong></span><span style="font-size: 16px;"><strong> : </strong>Connect the main ideas stated by the authors above. How do their ideas compliment each other? Explain..

</span></p>

<p><span style="font-size: 16px;">


<br>
</span></p>

<p style="text-align: center; font-size: 14px; margin-top: 30px; opacity: 0.65; font-family: sans-serif;">Powered by <a href="https://www.froala.com/wysiwyg-editor?pb=1">Froala Editor</a></p>

<p style="text-align: center; font-size: 14px; margin-top: 30px; opacity: 0.65; font-family: sans-serif;">Powered by <a href="https://www.froala.com/wysiwyg-editor?pb=1">Froala Editor</a></p>

<p data-f-id="pbf" style="text-align: center; font-size: 14px; margin-top: 30px; opacity: 0.65; font-family: sans-serif;">Powered by <a href="https://www.froala.com/wysiwyg-editor?pb=1" title="Froala Editor">Froala Editor</a></p>


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
  padding:32px;
 
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
