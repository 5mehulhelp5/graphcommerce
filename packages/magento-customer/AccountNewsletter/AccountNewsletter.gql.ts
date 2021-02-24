// Do not edit this file: autogenerated by graphql-code-generator
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'
import * as Types from '@reachdigital/magento-graphql'

export const AccountNewsletterFragmentDoc: DocumentNode<AccountNewsletterFragment, unknown> = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AccountNewsletter' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Customer' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'is_subscribed' } },
          { kind: 'Field', name: { kind: 'Name', value: 'email' } },
        ],
      },
    },
  ],
}
export type AccountNewsletterFragment = Pick<Types.Customer, 'is_subscribed' | 'email'>
