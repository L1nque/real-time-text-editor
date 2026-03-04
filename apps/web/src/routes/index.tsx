import { Button } from '@/components/ui/button'
import { createFileRoute } from '@tanstack/react-router'
import { Github, Zap, Users, Code, ExternalLink, Rocket, Info, PlusIcon, FileIcon } from 'lucide-react'

export const Route = createFileRoute('/')({
  component: HomeComponent,
})

function HomeComponent() {
  return (
    <div className="max-w-4xl mx-auto p-8 md:p-16 lg:p-24 flex flex-col gap-16">
      {/* Header section */}
      <section className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <span className="text-2xl">👋</span>
          <h1 className="text-2xl font-extrabold tracking-tight lg:text-2xl">
            Welcome
          </h1>
        </div>
        <p className="text-muted-foreground leading-relaxed">
          This is a demonstration of a <strong>real-time collaborative notion-like text editor</strong>.
          In theory, by utilizing durable objects to host a room per document, this should be able to handle massive scale.
          However, since I'm using my personal api keys, please go easy on the usage.
        </p>
      </section>

      {/* Tech Stack section */}
      <section className="flex flex-col gap-8">
        <div className="flex items-center gap-3">
          <Zap className="size-5 text-yellow-500" />
          <h2 className="text-xl font-semibold tracking-tight">Built With</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2 p-4 rounded-xl border bg-card text-card-foreground shadow-sm border-red-400">
            <div className="flex items-center gap-2 font-medium">
              <Code className="size-4" />
              PartyKit
            </div>
            <p className="text-sm text-muted-foreground">
              Handles real-time synchronization and websocket coordination effortlessly.
            </p>
          </div>
          <div className="flex flex-col gap-2 p-4 rounded-xl border bg-card text-card-foreground shadow-sm border-purple-400">
            <div className="flex items-center gap-2 font-medium">
              <Users className="size-4" />
              BlockNote
            </div>
            <p className="text-sm text-muted-foreground">
              Provides the rich, block-based editing experience for structured content.
            </p>
          </div>
          <div className="flex flex-col gap-2 p-4 rounded-xl border bg-card text-card-foreground shadow-sm border-orange-400">
            <div className="flex items-center gap-2 font-medium">
              <Rocket className="size-4" />
              Cloudflare Workers
            </div>
            <p className="text-sm text-muted-foreground">
              Serverless deployment on the edge for global low-latency performance.
            </p>
          </div>
          <div className="flex flex-col gap-2 p-4 rounded-xl border bg-card text-card-foreground shadow-sm border-blue-400">
            <div className="flex items-center gap-2 font-medium">
              <Info className="size-4" />
              Vite & Tailwind
            </div>
            <p className="text-sm text-muted-foreground">
              Modern frontend tooling for a fast, responsive, and beautiful developer experience.
            </p>
          </div>
        </div>
      </section>

      {/* How to try section */}
      <section className="flex flex-col gap-8">
        <div className="flex items-center gap-3">
          <Rocket className="size-5 text-blue-500" />
          <h2 className="text-xl font-semibold tracking-tight">Get Started</h2>
        </div>
        <div className="flex flex-col gap-4 text-muted-foreground">
          <p>Ready to try it out? You can start collaborating immediately:</p>
          <ul className="list-decimal list-inside space-y-2 ml-4">
            <li>Click the "Create" button below to start a new document</li>
            <li>Share the URL with a friend or open it in another tab</li>
            <li>Watch the real-time cursor synchronization in action!</li>
          </ul>
        </div>
        <div className="flex flex-wrap gap-4 mt-2">
          <Button size="lg" className="gap-2">
            <PlusIcon className="size-4" />
            Create Document
          </Button>
          <Button variant="secondary" size="lg" className="gap-2">
            <FileIcon className="size-4" />
            Open Random
          </Button>
        </div>
      </section>

      {/* Links section */}
      <section className="pt-8 border-t">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-col gap-1">
            <h3 className="font-medium">Interested in the code?</h3>
            <p className="text-sm text-muted-foreground">Check out the repository on GitHub to see how it works.</p>
          </div>
          <Button variant="outline" className="gap-2" asChild>
            <a href="https://github.com/l1nque/real-time-text-editor" target="_blank" rel="noopener noreferrer">
              <Github className="size-4" />
              View on GitHub
              <ExternalLink className="size-3 opacity-50" />
            </a>
          </Button>
        </div>
      </section>
    </div>
  )
}
