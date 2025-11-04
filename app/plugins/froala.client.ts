import 'froala-editor/css/froala_editor.pkgd.min.css'
import 'froala-editor/css/froala_style.min.css'
// You might need to import additional plugins
import 'froala-editor/js/plugins/align.min.js'
import 'froala-editor/js/plugins/char_counter.min.js'
import 'froala-editor/js/plugins/code_beautifier.min.js'
import 'froala-editor/js/plugins/code_view.min.js'
import 'froala-editor/js/plugins/colors.min.js'
import 'froala-editor/js/plugins/emoticons.min.js'
import 'froala-editor/js/plugins/entities.min.js'
import 'froala-editor/js/plugins/file.min.js'
import 'froala-editor/js/plugins/font_family.min.js'
import 'froala-editor/js/plugins/font_size.min.js'
import 'froala-editor/js/plugins/forms.min.js'
import 'froala-editor/js/plugins/fullscreen.min.js'
import 'froala-editor/js/plugins/image.min.js'
import 'froala-editor/js/plugins/image_manager.min.js'
import 'froala-editor/js/plugins/inline_style.min.js'
import 'froala-editor/js/plugins/line_breaker.min.js'
import 'froala-editor/js/plugins/link.min.js'
import 'froala-editor/js/plugins/lists.min.js'
import 'froala-editor/js/plugins/paragraph_format.min.js'
import 'froala-editor/js/plugins/paragraph_style.min.js'
import 'froala-editor/js/plugins/quick_insert.min.js'
import 'froala-editor/js/plugins/quote.min.js'
import 'froala-editor/js/plugins/table.min.js'
import 'froala-editor/js/plugins/save.min.js'
import 'froala-editor/js/plugins/url.min.js'
import 'froala-editor/js/plugins/video.min.js'
import 'froala-editor/js/plugins/print.min.js'
import 'froala-editor/js/plugins/save.min.js'
import 'froala-editor/js/plugins/word_paste.min.js'
import 'froala-editor/js/plugins/line_height.min.js'
// Other Froala plugin imports…


// ✅ Add print plugin
import "froala-editor/js/plugins/print.min.js";
import "froala-editor/js/third_party/spell_checker.min.js";
import "froala-editor/css/third_party/spell_checker.min.css"



export default defineNuxtPlugin(() => {
  // Plugin is automatically client-side only due to .client.js suffix
})