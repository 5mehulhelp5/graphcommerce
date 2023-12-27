import type { MethodPlugin } from '@graphcommerce/next-config'
import { RowColumnThreeProps, RowColumnTwoProps } from '@graphcommerce/next-ui'
import { parseHygraphContentItem } from '../lib'
import { RowColumnTwoFragment } from '../components/RowColumnTwo/RowColumnTwo.gql'
import { RowColumnThreeFragment } from '../components/RowColumnThree/RowColumnThree.gql'

export const func = 'parseHygraphContentItem'
export const exported = '@graphcommerce/graphcms-ui/lib/parser'

type ExtendedInput =
  | (RowColumnTwoFragment & {
      __typename: 'RowColumnTwo'
    })
  | (RowColumnThreeFragment & { __typename: 'RowColumnThree' })
type ExtendedOutput = RowColumnTwoProps | RowColumnThreeProps

type ExtendedParserMapType = {
  [K in ExtendedInput['__typename']]: (
    input: Extract<ExtendedInput, { __typename: K }>,
  ) => Extract<ExtendedOutput, { __typename: K }>
}

const extendedParserMap: ExtendedParserMapType = {
  RowColumnTwo: (input) => {
    const { colOne: copy, colTwo: copyTwo } = input

    const output = {
      ...input,
      copy,
      copyTwo,
    }

    return output
  },
  RowColumnThree: (input) => {
    const { colOne: copy, colTwo: copyTwo, colThree: copyThree } = input

    const output = {
      ...input,
      copy,
      copyTwo,
      copyThree,
    }

    return output
  },
}

const extendParser: MethodPlugin<typeof parseHygraphContentItem> = <
  K extends ExtendedInput['__typename'],
>(
  prev,
  input,
) => {
  console.log('extendHygraphParser', input)
  if (!input) return null

  if (extendedParserMap[input.__typename as K]) {
    console.log('extendedParserMap', extendedParserMap, input.__typename)
    return extendedParserMap[input.__typename as K](input)
  }

  /**
   * We overwrite the result of prev(input) with input otherwise the parser
   * runs again and causes undefined object keys for the base parser.
   */
  return { ...prev(input), ...input }
}

export const plugin = extendParser
