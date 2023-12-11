import { RichText } from '@graphcommerce/graphcms-ui'
import { ColumnOne } from '@graphcommerce/next-ui'
import { RowColumnOneProps } from '../type'

export function Default(props: RowColumnOneProps) {
  const { colOne } = props

  return (
    <ColumnOne>
      <RichText {...colOne} />
    </ColumnOne>
  )
}