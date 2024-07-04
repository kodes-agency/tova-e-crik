import { GlobalConfig } from 'payload'
import {
  HTMLConverterFeature,
  HeadingFeature,
  lexicalEditor,
  lexicalHTML,
} from '@payloadcms/richtext-lexical'

export const TermsConditionsPage: GlobalConfig = {
  slug: 'terms-conditions-page',
  label: 'Terms & Conditions Page',
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          name: 'content',
          label: 'Content',
          fields: [
            {
              type: 'text',
              name: 'title',
              label: 'Title',
              required: true,
            },
            {
              type: 'richText',
              name: 'content',
              label: 'Content',
              required: true,
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
            lexicalHTML('content', { name: 'content_html' }),
          ],
        },
        {
          name: 'seo', 
          label: 'SEO',
          fields: [
            {
              type: 'text',
              label: 'Meta Title',
              name: 'metaTitle',
              required: true,
              maxLength: 80,
              admin: {
                description: 'Max 80 characters',
              },
            },
            {
              type: 'textarea',
              label: 'Meta Description',
              name: 'metaDescription',
              required: true,
              maxLength: 180,
              admin: {
                description: 'Max 180 characters',
              },
            },
          ],
        },
      ],
    },
  ],
}
