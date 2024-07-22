import { FieldValues, phonePattern } from '@graphcommerce/react-hook-form'
import { Trans, t } from '@lingui/macro'
import { TextFieldElement, TextFieldElementProps } from './TextFieldElement'

export type TelephoneElementProps<T extends FieldValues> = TextFieldElementProps<T>

export function TelephoneElement<TFieldValues extends FieldValues>(
  props: TelephoneElementProps<TFieldValues>,
): JSX.Element {
  const { rules, ...rest } = props
  return (
    <TextFieldElement
      type='text'
      label={<Trans>Telephone</Trans>}
      autoComplete='tel'
      rules={{
        pattern: { value: phonePattern, message: t`Invalid phone number` },
        ...rules,
      }}
      {...rest}
    />
  )
}
