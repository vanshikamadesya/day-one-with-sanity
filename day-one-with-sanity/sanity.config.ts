import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'
import { structure } from './structure'
import { defaultDocumentNode } from './structure/defaultDocumentNode'
import { presentationTool } from 'sanity/presentation'
import { resolve } from '../day-one-with-sanity-nextjs/src/sanity/presentation/resolve'
export default defineConfig({
  name: 'default',
  title: 'Day One With Sanity',

  projectId: 'ecmjy20p',
  dataset: 'production',

  source: true,


  document: {
    newDocumentOptions: (prev) => prev.filter((item) => item.templateId !== "siteSettings"),
  },

  plugins: [structureTool({
    structure,
    defaultDocumentNode
  }),
  visionTool(),
  presentationTool({
    // resolve,
    previewUrl: {
      origin: 'http://localhost:3000',
      preview: '/events/[slug]',
      draftMode: {
        enable: '/api/draft-mode/enable',
        disable: '/api/diraft-mode/disable'
      }
    }
  })
  ],

  schema: {
    types: schemaTypes,
  },
})
