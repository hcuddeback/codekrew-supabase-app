import { notFound } from 'next/navigation'

const blogPosts: Record<string, { title: string; content: string }> = {
  'introducing-codekrew': {
    title: 'Introducing CodeKrew: Build Smarter with AI',
    content:
      'Welcome to CodeKrew! In this post, we’ll explore how our platform helps developers build faster, smarter, and with less burnout using a lineup of AI tools built directly into your dev workflow.'
  },
  'why-we-built-writerbot': {
    title: 'Why We Built WriterBot',
    content:
      'Documentation, user stories, dev notes — it’s all important, but often painful. WriterBot exists to handle the writing lift so devs can focus on building. Here’s how we got there.'
  },
  'behind-the-scenes-of-scout': {
    title: 'Behind the Scenes of Scout',
    content:
      'Scout is your onboarding buddy and setup wizard. In this post, we look at how Scout makes the platform easier to use — from deployment to task management.'
  }
}

export async function generateStaticParams() {
  return Object.keys(blogPosts).map((slug) => ({ slug }))
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts[params.slug]
  if (!post) return notFound()

  return (
    <article className="py-20 px-4 max-w-3xl mx-auto text-white">
      <h1 className="text-4xl font-bold mb-6">{post.title}</h1>
      <p className="text-zinc-300 text-lg leading-relaxed">{post.content}</p>
    </article>
  )
}
