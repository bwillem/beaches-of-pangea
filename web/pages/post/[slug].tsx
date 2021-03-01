import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import client from '../../client'

function Post() {
  const router = useRouter()

  return (
    <article>
      <h1>
        {router.query.slug}
      </h1>
    </article>
  )
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const slug = ctx.params.slug || ''
  const post = await client.fetch(`*[slug.current == $slug][0]`, { slug })

  if (!post) return {
    notFound: true,
  }

  return {
    props: {
      post,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  return {
    paths: [
      {
        params: {
          slug:
            'somatic-quality-of-media',
        }
      }
    ],
    fallback: false,
  }
}

export default Post
