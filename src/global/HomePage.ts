import { GlobalConfig } from 'payload'

export const HomePage: GlobalConfig = {
  slug: 'home-page',
  label: 'Home Page',
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          name: 'content',
          label: 'Content',
          fields: [
            {
              type: 'array',
              name: 'menu',
              label: 'Menu',
              minRows: 1,
              required: true,
              fields: [
                {
                    type: 'checkbox',
                    name: 'isExternalLink',
                    label: 'External Link',
                },
                {
                  type: 'row',
                  fields: [
                    {
                      type: 'text',
                      name: 'buttonText',
                      label: 'Button Text',
                      required: true,
                    },

                    {
                      type: 'text',
                      name: 'buttonLink',
                      label: 'Button Link',
                      required: true,
                    },
                  ],
                },
                {
                  type: 'upload',
                  relationTo: 'media',
                  name: 'thumbnail',
                  label: 'Thumbnail',
                  required: true,
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
