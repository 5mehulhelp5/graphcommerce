import { makeStyles, Theme } from '@material-ui/core'
import { UseStyles } from '@reachdigital/next-ui/Styles'
import responsiveVal from '@reachdigital/next-ui/Styles/responsiveVal'

const useRichTextStyles = makeStyles(
  ({ spacings, typography, breakpoints }: Theme) => ({
    root: { '&:empty': { display: 'none' }, '&:last-child': { marginBottom: 0 } },
    paragraph: { marginBottom: '1em', wordBreak: 'break-word' },
    h1: { marginTop: responsiveVal(9, 0), marginBottom: responsiveVal(21, 50) },
    h2: {
      marginTop: responsiveVal(22, 40),
      marginBottom: responsiveVal(20, 40),
      '&:first-child': { marginTop: 0 },
    },
    h3: {
      marginTop: responsiveVal(22, 30),
      marginBottom: responsiveVal(22, 30),
      '&:first-child': { marginTop: 0 },
    },
    h4: {
      marginTop: responsiveVal(11, 30),
      marginBottom: responsiveVal(11, 30),
      '&:first-child': { marginTop: 0 },
    },
    h5: {
      marginTop: responsiveVal(7, 20),
      marginBottom: responsiveVal(7, 20),
      '&:first-child': { marginTop: 0 },
    },
    h6: { '&:first-of-type': { marginTop: 0 } },
    asset: { width: '100%', height: 'auto' },
    blockQuote: {
      color: '#777',
      borderLeft: '4px solid #999',
      paddingLeft: spacings.sm,
      margin: `${spacings.md} 0`,
    },
    ol: { marginBottom: '1em' },
    ul: { marginBottom: '1em' },
    strong: {},
    italic: {},
    underlined: {},
    code: {
      width: 'fit-content',
      maxWidth: '100%',
      background: '#d8d8d8',
      padding: 5,
      fontSize: 17,
      overflow: 'scroll',
    },
    aspectContainer: {
      position: 'relative',
      paddingTop: 'calc(100% / 16 * 9)',
      marginBottom: spacings.md,
      '& > *': {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
      },
    },
    iframe: {},
    table: {
      display: 'table',
      width: '100%',
      borderSpacing: '2px',
      borderCollapse: 'collapse',
      border: '2px solid #ddd',
      marginTop: spacings.md,
      marginBottom: spacings.sm,

      '& thead': {
        background: '#f5f5f5',
      },

      '& tbody, thead': {
        display: 'table-row-group',
        verticalAlign: 'center',
        borderColor: 'inherit',

        '& tr': {
          borderBottom: '1px solid #ececec',

          '&:nth-child(even)': {
            background: '#f5f5f5',
          },
        },

        '& td': {
          [breakpoints.up('sm')]: {
            minWidth: '150px',
          },

          padding: '5px 6px',
          minWidth: '100px',

          '& p': { fontSize: 17 },
        },
      },
    },
    link: { wordBreak: 'break-word' },
  }),
  { name: 'RichText' },
)
export type UseRichTextStyles = UseStyles<typeof useRichTextStyles>

export default useRichTextStyles
