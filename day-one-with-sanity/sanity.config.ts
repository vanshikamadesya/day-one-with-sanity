import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'
import { structure } from './structure'
import { defaultDocumentNode } from './structure/defaultDocumentNode'
// import { visualEditing } from '@sanity/visual-editing'

export default defineConfig({
  name: 'default',
  title: 'Day One With Sanity',

  projectId: 'ecmjy20p',
  dataset: 'production',

  source: true,

  plugins: [structureTool({
    structure,
    defaultDocumentNode
  }),
  visionTool(),
  // visualEditing(),
  ],

  schema: {
    types: schemaTypes,
  },
})
