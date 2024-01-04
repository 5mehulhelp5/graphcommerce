import { RichText, ColumnTwo } from '@graphcommerce/next-ui'
import { RowColumnTwoProps } from './type'

export function RowColumnTwo(props: RowColumnTwoProps) {
  const { copy, copyTwo } = props

  return (
    <ColumnTwo colOneContent={<RichText {...copy} />} colTwoContent={<RichText {...copyTwo} />} />
  )
}
