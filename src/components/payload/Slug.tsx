import type { Field, FieldHook } from 'payload'

export const slugField: Field = {
  name: 'slug',
  label: 'Slug',
  type: 'text',
  index: true,
  admin: {
    readOnly: true,
  },
  hooks: {
    beforeValidate: [
      ({ data, value, operation }): FieldHook => {
        if (!data || data.title === undefined) return value

        if (operation === 'create' || operation === 'update') {
          return (value = data.title
            .replace(/ /g, '-')
            .replace(/[^\w-]+/g, '')
            .toLowerCase())
        } 

        return value
      },
    ]
  }
}
