import { slugField } from '@/components/payload/Slug'
import { CollectionConfig, FieldHook } from 'payload'
import {
  HTMLConverterFeature,
  HeadingFeature,
  lexicalEditor,
  lexicalHTML,
} from '@payloadcms/richtext-lexical'

export const Trunk: CollectionConfig = {
  slug: 'trunk',
  labels: {
    singular: 'Trunk',
    plural: 'Trunk',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title'],
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'title',
          label: 'Title',
          type: 'text',
          required: true,
        },
        {
          name: 'slug',
          label: 'Slug',
          type: 'text',
          index: true,
          hooks: {
            beforeValidate: [
              ({ data, value, operation }): FieldHook => {
                if (!data || data.title === undefined) return value

                if (operation === 'create') {
                  return (value = data.title
                    .replace('-', ' ')
                    .replace(' - ', ' ')
                    .replace(/ /g, '-')
                    .replace(/[^\w-]+/g, '')
                    .toLowerCase())
                }

                return value
              },
            ],
          },
        },
      ],
    },
    {
      type: 'tabs',
      tabs: [
        {
          name: 'content',
          label: 'Content',
          fields: [
            {
              name: 'text',
              label: 'Content',
              type: 'richText',
              editor: lexicalEditor({
                features: ({ defaultFeatures }) => [
                  ...defaultFeatures,
                  HeadingFeature({
                    enabledHeadingSizes: ['h2', 'h3', 'h4'],
                  }),
                  HTMLConverterFeature(),
                ],
              }),
            },
            lexicalHTML('text', { name: 'text_html' }),
          ],
        },
        {
          name: 'images',
          label: 'Images',
          fields: [
            {
              type: 'array',
              name: 'images',
              label: 'Images',
              required: true,
              minRows: 1,
              index: false,
              fields: [
                {
                  type: 'upload',
                  name: 'image',
                  label: 'Image',
                  required: true,
                  relationTo: 'media',
                },
              ],
            },
          ],
        },
        {
          name: 'seo',
          label: 'SEO',
          fields: [
            {
              name: 'metaTitle',
              label: 'Meta Title',
              type: 'text',
              required: true,
              maxLength: 80,
              admin: {
                description:
                  'The title of the page, displayed in search engines and browsers. Max 80 characters.',
              },
            },
            {
              name: 'metaDescription',
              label: 'Meta Description',
              required: true,
              type: 'textarea',
              maxLength: 180,
              admin: {
                description:
                  'The description of the page, displayed in search engines and browsers. Max 180 characters.',
              },
            },
          ],
        },
      ],
    },
  ],
}
