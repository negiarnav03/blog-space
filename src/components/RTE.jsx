import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";
import conf from "../conf/conf.js";

export default function RTE({ name, control, label, defaultValue = "" }) {
  return (
    <div className="w-full">
      {label && <label className="inline-block mb-1 pl-1 text-[var(--text)] font-medium text-sm">{label}</label>}

      <Controller
        name={name || "content"}
        control={control}
        render={({ field: { onChange } }) => (
          <Editor
            apiKey={conf.tinymceApiKey}
            initialValue={defaultValue}
            init={{
              initialValue: defaultValue,
              height: 500,
              menubar: true,
              resize: true,
              plugins: [
                // Free plugins baseline (excluding 'image' and 'editimage' to prevent conflicts with uploadcare)
                'accordion', 'advlist', 'anchor', 'autolink', 'autosave',
                'charmap', 'code', 'codesample', 'directionality', 'emoticons', 'fullscreen',
                'help', 'importcss', 'insertdatetime', 'link', 'lists', 'media',
                'nonbreaking', 'pagebreak', 'preview', 'quickbars', 'save', 'searchreplace',
                'table', 'visualblocks', 'visualchars', 'wordcount',

                // Premium plugins — selected and commented for the blog/CMS use case
                'checklist',           // Checklists for blog post draft preparation and editing
                'mediaembed',          // Interactive media embeds for blog post videos and frames
                'casechange',          // Fast heading case updates for articles
                'formatpainter',       // Copy formatting styles across blog post sections
                'pageembed',           // Embed external resources and pages into blog posts
                'a11ychecker',         // Audit blog post accessibility for search engines
                'tinymcespellchecker', // Prevent spelling and grammar errors in articles
                'permanentpen',        // Editorial markup styling for proofreaders
                'powerpaste',          // Clean paste from Google Docs and MS Word
                'advtable',            // Advanced table formatting and data sorting
                'advcode',             // Code formatting with auto-complete for bloggers
                'advtemplate',         // Save reusable layouts and headers for posts
                'tinymceai',           // Generate and refine blog text with AI assistance
                'uploadcare',          // Secure, optimized cloud upload for blog images
                'tinycomments',        // Collaborative review comments for editorial teams
                'tableofcontents',     // Automated navigation table for long-form posts
                'footnotes',           // Reference lists and citations at the bottom
                'mergetags',           // Dynamic subscriber details and fields in content
                'markdown',            // Write using standard markdown tags natively
                'importword',          // Directly import Microsoft Word manuscripts
                'exportword',          // Export post drafts to Word document files
                'exportpdf',           // Generate formatted PDF documents from articles
                'mentions',            // Mention co-authors and editors in comments
                'autocorrect',         // Real-time automatic typo correction for speed
                'typography',          // Professional typesetting and symbol spacing features
                'inlinecss',           // Inline CSS injection for newsletter-friendly posts
              ],
              toolbar:
                "undo redo | tinymceai-chat tinymceai-quickactions tinymceai-review | blocks fontfamily fontsize | bold italic underline strikethrough | link media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography uploadcare | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              
              // Required callback configuration for premium plugins
              tinycomments_mode: 'embedded',
              tinycomments_author: 'Author name',

              mergetags_list: [
                { title: 'Author', menu: [
                  { value: 'Author.FirstName', title: 'First Name' },
                  { value: 'Author.LastName', title: 'Last Name' },
                  { value: 'Author.Email', title: 'Email' }
                ]},
                { title: 'Post', menu: [
                  { value: 'Post.Title', title: 'Post Title' },
                  { value: 'Post.PublishDate', title: 'Publish Date' }
                ]}
              ],

              advtemplate_list: () => Promise.resolve([
                {
                  title: 'Blog Layouts',
                  items: [
                    { title: 'Article Header', content: '<h1>Blog Post Title</h1><p>Written by Author on Date</p>' },
                    { title: 'Standard Callout', content: '<div style="border: 1px solid #ccc; padding: 10px; background-color: #f9f9f9;">Important Note</div>' }
                  ]
                }
              ]),

              tinymceai_allow_model_selection: true,

              tinymceai_token_provider: async () => {
                // Trial token provider
                // For production, replace this entire block with your own JWT endpoint.
                // See: https://www.tiny.cloud/docs/tinymce/latest/tinymceai-jwt-authentication-intro/
                await fetch(`https://demo.api.tiny.cloud/1/wue449sixcedm6mqo9cxi5y9grq07wc5d8soziuhkm1zamec/auth/random`, { method: "POST", credentials: "include" });
                return { token: await fetch(`https://demo.api.tiny.cloud/1/wue449sixcedm6mqo9cxi5y9grq07wc5d8soziuhkm1zamec/jwt/tinymceai`, { credentials: "include" }).then(r => r.text()) };
              },

              uploadcare_public_key: 'f54933a0c9b62f95a6ab',
            }}
            onEditorChange={onChange}
          />
        )}
      />
    </div>
  );
}
