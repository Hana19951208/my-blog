'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import TextareaAutosize from 'react-textarea-autosize'
import { ArrowLeft, Send, Save, Eye, Edit3, Loader2 } from 'lucide-react'
import Link from 'next/link'

export default function EditorPage() {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [slug, setSlug] = useState('')
    const [summary, setSummary] = useState('')
    const [tags, setTags] = useState('')
    const [loading, setLoading] = useState(false)
    const [preview, setPreview] = useState(false)
    const [user, setUser] = useState<any>(null)
    const supabase = createClient()
    const router = useRouter()

    useEffect(() => {
        const checkUser = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) {
                router.push('/login')
            } else {
                setUser(user)
            }
        }
        checkUser()
    }, [supabase, router])

    // Simple slugify function
    const slugify = (text: string) => {
        return text
            .toString()
            .toLowerCase()
            .trim()
            .replace(/\s+/g, '-')
            .replace(/[^\w-]+/g, '')
            .replace(/--+/g, '-')
    }

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value
        setTitle(val)
        if (!slug || slug === slugify(title)) {
            setSlug(slugify(val))
        }
    }

    const handlePublish = async (isPublished: boolean = true) => {
        if (!title || !content || !slug) {
            return alert('Title, Content, and Slug are required!')
        }

        setLoading(true)
        try {
            const { error } = await supabase.from('posts').insert({
                title,
                content,
                slug,
                summary,
                tags: tags.split(',').map(t => t.trim()).filter(t => t !== ''),
                published: isPublished,
                author_id: user.id
            })

            if (error) throw error
            alert(isPublished ? 'Post published successfully!' : 'Draft saved!')
            router.push('/blog')
        } catch (err: any) {
            alert('Error: ' + err.message)
        } finally {
            setLoading(false)
        }
    }

    if (!user) return null

    return (
        <div className="min-h-screen bg-[#F5F5F7] dark:bg-black pb-20">
            {/* Top Bar */}
            <header className="sticky top-0 z-10 border-b border-gray-200 bg-white/80 backdrop-blur-md dark:border-zinc-800 dark:bg-black/80">
                <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
                    <div className="flex items-center gap-4">
                        <Link
                            href="/"
                            className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800"
                        >
                            <ArrowLeft className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                        </Link>
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            New Article
                        </span>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setPreview(!preview)}
                            className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-gray-300 dark:hover:bg-zinc-800"
                        >
                            {preview ? <Edit3 className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            {preview ? 'Edit' : 'Preview'}
                        </button>
                        <button
                            onClick={() => handlePublish(false)}
                            className="hidden items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100 sm:flex dark:text-gray-400 dark:hover:bg-zinc-800"
                        >
                            <Save className="h-4 w-4" />
                            Save Draft
                        </button>
                        <button
                            onClick={() => handlePublish(true)}
                            disabled={loading}
                            className="flex items-center gap-2 rounded-full bg-[#0071e3] px-5 py-1.5 text-sm font-semibold text-white transition-all hover:bg-[#0077ED] active:scale-95 disabled:opacity-70"
                        >
                            {loading ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                <Send className="h-4 w-4" />
                            )}
                            Publish
                        </button>
                    </div>
                </div>
            </header>

            <main className="mx-auto max-w-4xl px-4 pt-10">
                {!preview ? (
                    <div className="space-y-6">
                        {/* Title field */}
                        <input
                            type="text"
                            placeholder="Title"
                            value={title}
                            onChange={handleTitleChange}
                            className="w-full bg-transparent border-none text-5xl font-extrabold tracking-tight text-gray-900 placeholder-gray-200 outline-none focus:ring-0 dark:text-white dark:placeholder-zinc-800"
                        />

                        {/* Config Panel (Slug, Tags, Summary) */}
                        <div className="rounded-2xl border border-gray-100 bg-white/50 p-6 dark:border-zinc-900 dark:bg-zinc-900/30">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Slug</label>
                                    <input
                                        value={slug}
                                        onChange={e => setSlug(e.target.value)}
                                        className="w-full border-none bg-transparent p-0 text-sm font-mono text-gray-600 outline-none focus:ring-0 dark:text-gray-400"
                                        placeholder="post-slug"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Tags (comma separated)</label>
                                    <input
                                        value={tags}
                                        onChange={e => setTags(e.target.value)}
                                        className="w-full border-none bg-transparent p-0 text-sm text-gray-600 outline-none focus:ring-0 dark:text-gray-400"
                                        placeholder="NextJS, Supabase, Tailwind"
                                    />
                                </div>
                            </div>
                            <div className="mt-4 space-y-1">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Summary</label>
                                <textarea
                                    rows={2}
                                    value={summary}
                                    onChange={e => setSummary(e.target.value)}
                                    className="w-full resize-none border-none bg-transparent p-0 text-sm text-gray-600 outline-none focus:ring-0 dark:text-gray-400"
                                    placeholder="A brief overview of the post..."
                                />
                            </div>
                        </div>

                        {/* Writer Area */}
                        <div className="min-h-[60vh] rounded-3xl bg-white p-8 shadow-sm dark:bg-zinc-950">
                            <TextareaAutosize
                                minRows={20}
                                placeholder="Start writing..."
                                value={content}
                                onChange={e => setContent(e.target.value)}
                                className="w-full resize-none border-none bg-transparent font-serif text-lg leading-relaxed text-gray-800 outline-none focus:ring-0 dark:text-zinc-200"
                            />
                        </div>
                    </div>
                ) : (
                    /* Simple Preview Mode */
                    <div className="prose prose-lg dark:prose-invert mx-auto py-10">
                        <h1 className="text-5xl font-extrabold">{title || 'Untile Post'}</h1>
                        <div className="text-gray-400 mb-10">Preview Mode</div>
                        <div className="whitespace-pre-wrap">{content || 'No content yet...'}</div>
                    </div>
                )}
            </main>
        </div>
    )
}
