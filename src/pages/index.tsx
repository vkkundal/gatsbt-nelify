import * as React from "react"
import {Link, graphql,PageProps} from 'gatsby'
import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"

type BlogProps = {
  site: {
    siteMetadata: {
      title:string
    }
  }
  allMarkdownRemark:{
    nodes: {
      excerpt:string;
      fields: {
        slug:string
      }
      frontmatter: {
        date:string;
        title:string;
        description:string;
      }
    }
  }
}
const BlogIndex:React.FC<PageProps<BlogProps>> = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts:any = data.allMarkdownRemark.nodes
// console.log(posts)
  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <Seo title="All posts" description={""} lang={""} meta={""} />
        <Bio />
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="All posts" description={""} lang={""} meta={""} />
      <Bio />
      <ol style={{ listStyle: `none` }}>
        {posts.map((post: { frontmatter: { title: any; date: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; description: any }; fields: { slug: React.Key | null | undefined }; excerpt: any }) => {
          const title = post.frontmatter.title || post.fields.slug
// console.log(post)
          return (
            <li key={post.fields.slug}>
              <article
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article"
              >
                <header>
                  <h2>
                    <Link to={`${post.fields.slug}`} itemProp ="url">
                      <span itemProp="headline">{title}</span>
                    </Link>
                  </h2>
                  <small>{post.frontmatter.date}</small>
                </header>
                <section>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: post.frontmatter.description || post.excerpt,
                    }}
                    itemProp="description"
                  />
                </section>
              </article>
            </li>
          )
        })}
      </ol>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
        }
      }
    }
  }
`