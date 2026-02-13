import React from 'react';
import {Link} from 'react-router-dom';
import {ArrowRight, Bug, CheckCircle2, Filter, Github, Sparkles, Tag, Zap,} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {Card, CardContent} from '@/components/ui/card';
import {CONTRIBUTING_URL, GITHUB_BACKEND_REPO_URL, GITHUB_FRONTEND_REPO_URL,} from '@/shared/constants';

const FEATURES = [
  {
    icon: Tag,
    title: 'Curated Labels',
    description:
      'Only issues labeled help wanted and good first issue from popular repositories.',
  },
  {
    icon: Filter,
    title: 'Smart Filtering',
    description:
      'Filter by programming language, repository stars, and sort by relevance.',
  },
  {
    icon: Zap,
    title: 'Random Picker',
    description:
      'Feeling lucky? Get a random issue that matches your preferences.',
  },
  {
    icon: Sparkles,
    title: 'Personal Feed',
    description:
      'Subscribe to a personalized feed of issues tailored to your interests.',
  },
] as const;

const STEPS = [
  {
    step: 1,
    title: 'Browse or filter',
    description: 'Find issues by language, stars, or use the random picker.',
  },
  {
    step: 2,
    title: 'Pick an issue',
    description: 'Choose something that matches your skills and interests.',
  },
  {
    step: 3,
    title: 'Start contributing',
    description: 'Open the issue on GitHub and make your first contribution.',
  },
] as const;

const ADVANTAGES = [
  'No signup required to browse',
  'Focused on beginner-friendly contributions',
  'Free and open source',
  'Simple, distraction-free interface',
] as const;

export function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section
        className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8"
        aria-labelledby="hero-heading"
      >
        <h1
          id="hero-heading"
          className="bg-gradient-to-r from-primary via-violet-600 to-primary bg-clip-text text-center text-3xl font-semibold tracking-tight text-transparent sm:text-4xl md:text-5xl"
        >
          Find Your First Open Source Contribution
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg text-muted-foreground sm:text-xl">
          YAGFI aggregates beginner-friendly issues from popular GitHub
          repositories. No endless searching — just browse, filter, and
          contribute.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button asChild size="lg" className="w-full sm:w-auto">
            <Link to="/issues">
              Browse Issues
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
            <Link to="/feed">Personalized Feed</Link>
          </Button>
        </div>
      </section>

      {/* What is YAGFI */}
      <section
        className="border-y border-border bg-muted/30 px-4 py-16 sm:px-6 lg:px-8"
        aria-labelledby="what-heading"
      >
        <div className="mx-auto max-w-3xl">
          <h2 id="what-heading" className="text-2xl font-semibold tracking-tight sm:text-3xl">
            What is YAGFI
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            <strong>Yet Another Good First Issue</strong> — a free tool that
            helps developers find their first open source contribution. Instead
            of manually searching GitHub, YAGFI curates issues labeled{' '}
            <strong>help wanted</strong> and <strong>good first issue</strong>{' '}
            from repositories with significant community traction.
          </p>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Built for students, career switchers, and anyone who wants to start
            contributing to open source without the overwhelm.
          </p>
        </div>
      </section>

      {/* Key Features */}
      <section
        className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8"
        aria-labelledby="features-heading"
      >
        <h2 id="features-heading" className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Key Features
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map(({icon: Icon, title, description}) => (
            <Card
              key={title}
              className="border-border transition-colors duration-200 hover:border-primary/20"
            >
              <CardContent className="pt-6">
                <div
                  className="mb-4 flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary"
                  aria-hidden
                >
                  <Icon className="size-5" />
                </div>
                <h3 className="font-semibold">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section
        className="border-y border-border bg-muted/30 px-4 py-16 sm:px-6 lg:px-8"
        aria-labelledby="how-heading"
      >
        <div className="mx-auto max-w-3xl">
          <h2 id="how-heading" className="text-2xl font-semibold tracking-tight sm:text-3xl">
            How It Works
          </h2>
          <ol className="mt-10 space-y-8">
            {STEPS.map(({step, title, description}) => (
              <li key={step} className="flex gap-4">
                <span
                  className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground"
                  aria-hidden
                >
                  {step}
                </span>
                <div>
                  <h3 className="font-semibold">{title}</h3>
                  <p className="mt-1 text-muted-foreground">{description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Why YAGFI */}
      <section
        className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 lg:px-8"
        aria-labelledby="why-heading"
      >
        <h2 id="why-heading" className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Why YAGFI
        </h2>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          Unlike generic issue trackers, YAGFI focuses on simplicity and
          effectiveness. One purpose: help you find your first contribution
          quickly.
        </p>
        <ul className="mt-8 space-y-4" role="list">
          {ADVANTAGES.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <CheckCircle2
                className="mt-0.5 size-5 shrink-0 text-primary"
                aria-hidden
              />
              <span className="text-muted-foreground">{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* CTA Section */}
      <section
        className="border-y border-border bg-muted/30 px-4 py-16 sm:px-6 lg:px-8"
        aria-labelledby="cta-heading"
      >
        <div className="mx-auto max-w-2xl text-center">
          <h2 id="cta-heading" className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Ready to contribute?
          </h2>
          <p className="mt-4 text-muted-foreground">
            Start browsing issues in seconds. No account required.
          </p>
          <Button asChild size="lg" className="mt-8">
            <Link to="/issues">
              Get Started
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer - minimal for landing, main Footer is in App */}
      <footer
        className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8"
        role="contentinfo"
      >
        <nav
          className="flex flex-wrap items-center justify-center gap-6"
          aria-label="Footer navigation"
        >
          <Link
            to="/issues"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
          >
            <Bug className="size-4" aria-hidden />
            Issues
          </Link>
          <Link
            to="/feed"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
          >
            Feed
          </Link>
          <a
            href={GITHUB_FRONTEND_REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
          >
            <Github className="size-4" aria-hidden />
            Frontend
          </a>
          <a
            href={GITHUB_BACKEND_REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
          >
            <Github className="size-4" aria-hidden />
            Backend
          </a>
          <a
            href={CONTRIBUTING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
          >
            Suggest a Label
          </a>
        </nav>
        <p className="mt-8 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} YAGFI. Open source contributions welcome.
        </p>
      </footer>
    </div>
  );
}
