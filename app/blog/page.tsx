import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import { genPageMetadata } from 'app/seo'
import ListLayout from '@/layouts/ListLayoutWithTags'
import { createClient } from '@/lib/supabase/server'

const POSTS_PER_PAGE = 5

export const metadata = genPageMetadata({ title: 'Blog' })

export default async function BlogPage(props: { searchParams: Promise<{ page: string }> }) {
  const supabase = await createClient()

  // 1. Fetch from Supabase
  const { data: dbPosts } = await supabase
    .from('posts')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false })

  // 2. Map Supabase posts to the interface expected by ListLayout
  const mappedDbPosts = (dbPosts || []).map(post => ({
    title: post.title,
    date: post.created_at,
    tags: post.tags || [],
    summary: post.summary || '',
    path: `blog/${post.slug}`, // Important: prefixed with blog/
    slug: post.slug,
  }))

  // 3. Local posts
  const localPosts = allCoreContent(sortPosts(allBlogs))

  // 4. Merge and sort
  const allMergedPosts: any[] = [...mappedDbPosts, ...localPosts].sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  const pageNumber = 1
  const totalPages = Math.ceil(allMergedPosts.length / POSTS_PER_PAGE)
  const initialDisplayPosts = allMergedPosts.slice(0, POSTS_PER_PAGE * pageNumber)
  const pagination = {
    currentPage: pageNumber,
    totalPages: totalPages,
  }

  return (
    <ListLayout
      posts={allMergedPosts}
      initialDisplayPosts={initialDisplayPosts}
      pagination={pagination}
      title="All Posts"
    />
  )
}

