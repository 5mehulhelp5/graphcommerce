import { VisibilityTypes } from '@hygraph/management-sdk'
import { migrationAction, client } from '../migrationAction'
import { Schema } from '../types'

export const graphcommerce7to7_1 = async (schema: Schema) => {
  if (!client) {
    return 0
  }

  const hasRow = schema.models
    .find((m) => m.apiId === 'DynamicRow')
    ?.fields.some((f) => f.apiId === 'row')

  if (hasRow) {
    migrationAction(schema, 'unionField', 'update', {
      apiId: 'row',
      displayName: 'Row Deprecated',
      parentApiId: 'DynamicRow',
      description: 'This field is deprecated. Use Rows instead.',
    })
  }

  migrationAction(
    schema,
    'unionField',
    'create',
    {
      displayName: 'Rows',
      apiId: 'rows',
      isList: true,
      reverseField: {
        modelApiIds: ['RowQuote', 'RowLinks', 'RowColumnOne'],
        apiId: 'dynamicRows',
        displayName: 'Dynamic Rows',
        visibility: VisibilityTypes.Hidden,
        isList: true,
      },
      parentApiId: 'DynamicRow',
    },
    'DynamicRow',
    'model',
  )

  return client.run(true)
}
