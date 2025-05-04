'use client'

import Link from 'next/link'

const blogPosts = [
  {
    slug: 'introducing-codekrew',
    title: 'Introducing CodeKrew: Build Smarter with AI',
    excerpt: 'Discover how CodeKrew helps developers ship faster with our AI-driven productivity tools.',
  },
  {
    slug: 'why-we-built-writerbot',
    title: 'Why We Built WriterBot',
    excerpt: 'Learn why content generation is core to our dev workflow and how WriterBot saves hours of effort.',
  },
  {
    slug: 'behind-the-scenes-of-scout',
    title: 'Behind the Scenes of Scout',
    excerpt: 'A look at how Scout helps onboard users, suggest tools, and guide builders in real time.',
  }
]

export default function BlogIndexPage() {
  return (
    <section className="py-20 px-4 max-w-5xl mx-auto text-white">
      <h1 className="text-4xl font-bold text-center mb-12">Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {blogPosts.map((post) => (
          <div key={post.slug} className="bg-slate-800 p-6 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
            <p className="text-slate-400 text-sm mb-4">{post.excerpt}</p>
            <Link
              href={`/blog/${post.slug}`}
              className="text-orange-500 hover:underline text-sm font-medium"
            >
              Read More →
            </Link>
          </div>
        ))}
      </div>
    </section>
  )
}
