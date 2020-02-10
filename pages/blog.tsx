import { GQLLocale } from '../generated/graphql'
import { GraphCmsPage, Link } from '../graphcms'

const Blog: React.FC<GraphCmsPage> = props => {
  const { page, childs } = props
  return (
    <>
      <h1>{page?.title}</h1>
      <div>
        {childs.map(child => (
          <div key={child!.url!}>
            <Link href={child!.url!} metaRobots={child!.metaRobots}>
              {child?.title}
            </Link>
          </div>
        ))}
      </div>
    </>
  )
}

export default Blog

// eslint-disable-next-line @typescript-eslint/camelcase
export const unstable_getStaticProps = async (): Promise<{ props: GraphCmsPage }> => {
  const { getProps } = await import('../graphcms/ssg')
  return getProps('/blog', GQLLocale.Nl)
}
