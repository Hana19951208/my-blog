import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import Main from './Main'
import { createClient } from '@/lib/supabase/server'

export default async function Page() {
  const supabase = await createClient()
  const { data: dbPosts } = await supabase
    .from('posts')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false })

  const mappedDbPosts = (dbPosts || []).map((post) => ({
    title: post.title,
    date: post.created_at,
    tags: post.tags || [],
    summary: post.summary || '',
    path: `blog/${post.slug}`,
    slug: post.slug,
  }))

  const localPosts = allCoreContent(sortPosts(allBlogs))

  const allMergedPosts: any = [...mappedDbPosts, ...localPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  return <Main posts={allMergedPosts} />
}
