// Do not edit this file: autogenerated by graphql-code-generator
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'
import * as Types from '@reachdigital/magento-graphql'

export const AccountHeaderFragmentDoc: DocumentNode<AccountHeaderFragment, unknown> = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AccountHeader' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Customer' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'firstname' } },
          { kind: 'Field', name: { kind: 'Name', value: 'lastname' } },
        ],
      },
    },
  ],
}
export type AccountHeaderFragment = Pick<Types.Customer, 'firstname' | 'lastname'>
