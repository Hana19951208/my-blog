import 'css/prism.css'
import 'katex/dist/katex.css'

import PageTitle from '@/components/PageTitle'
import { components } from '@/components/MDXComponents'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import { sortPosts, coreContent, allCoreContent } from 'pliny/utils/contentlayer'
import { allBlogs, allAuthors } from 'contentlayer/generated'
import type { Authors, Blog } from 'contentlayer/generated'
import PostSimple from '@/layouts/PostSimple'
import PostLayout from '@/layouts/PostLayout'
import PostBanner from '@/layouts/PostBanner'
import { Metadata } from 'next'
import siteMetadata from '@/data/siteMetadata'
import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import MarkdownIt from 'markdown-it'

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
})

const defaultLayout = 'PostLayout'
const layouts = {
  PostSimple,
  PostLayout,
  PostBanner,
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string[] }>
}): Promise<Metadata | undefined> {
  const params = await props.params
  const slug = decodeURI(params.slug.join('/'))

  // 1. Try local
  let post: any = allBlogs.find((p) => p.slug === slug)

  // 2. Try Supabase
  if (!post) {
    const supabase = await createClient()
    const { data } = await supabase.from('posts').select('*').eq('slug', slug).single()
    if (data) {
      post = {
        title: data.title,
        summary: data.summary,
        date: data.created_at,
        images: [],
        authors: ['default'],
      }
    }
  }

  if (!post) return

  const publishedAt = new Date(post.date).toISOString()
  const authors = [siteMetadata.author]
  let imageList = [siteMetadata.socialBanner]
  if (post.images) {
    imageList = typeof post.images === 'string' ? [post.images] : post.images
  }
  const ogImages = imageList.map((img) => {
    return {
      url: img && img.includes('http') ? img : siteMetadata.siteUrl + img,
    }
  })

  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      siteName: siteMetadata.title,
      locale: 'en_US',
      type: 'article',
      publishedTime: publishedAt,
      url: './',
      images: ogImages,
      authors: authors,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.summary,
      images: imageList,
    },
  }
}

export default async function Page(props: { params: Promise<{ slug: string[] }> }) {
  const params = await props.params
  const slug = decodeURI(params.slug.join('/'))

  // 1. Check local first
  const localPost = allBlogs.find((p) => p.slug === slug)
  if (localPost) {
    const sortedCoreContents = allCoreContent(sortPosts(allBlogs))
    const postIndex = sortedCoreContents.findIndex((p) => p.slug === slug)
    const prev = sortedCoreContents[postIndex + 1]
    const next = sortedCoreContents[postIndex - 1]
    const authorList = localPost?.authors || ['default']
    const authorDetails = authorList.map((author) => {
      const authorResults = allAuthors.find((p) => p.slug === author)
      return coreContent(authorResults as Authors)
    })
    const mainContent = coreContent(localPost)
    const Layout = layouts[localPost.layout || defaultLayout]

    return (
      <Layout content={mainContent} authorDetails={authorDetails} next={next} prev={prev}>
        <MDXLayoutRenderer code={localPost.body.code} components={components} toc={localPost.toc} />
      </Layout>
    )
  }

  // 2. Check Supabase
  const supabase = await createClient()
  const { data: dbPost } = await supabase
    .from('posts')
    .select('*, profiles(username, avatar_url, email)')
    .eq('slug', slug)
    .single()

  if (!dbPost) {
    return notFound()
  }

  // Map to Layout structure
  const mainContent = {
    title: dbPost.title,
    date: dbPost.created_at,
    summary: dbPost.summary,
    tags: dbPost.tags || [],
    slug: dbPost.slug,
    path: `blog/${dbPost.slug}`,
    filePath: `supabase/${dbPost.slug}`,
  }

  const authorDetails = [
    {
      name: dbPost.profiles?.username || dbPost.profiles?.email || 'Author',
      avatar: dbPost.profiles?.avatar_url || '/static/images/avatar.png',
      occupation: 'Writer',
    } as any,
  ]

  const renderedContent = md.render(dbPost.content || '')
  const Layout = layouts[defaultLayout]

  return (
    <Layout content={mainContent as any} authorDetails={authorDetails}>
      <div
        className="prose max-w-none pb-8 dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: renderedContent }}
      />
    </Layout>
  )
}







