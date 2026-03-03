import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ArrowRight,
  Bug,
  CheckCircle2,
  Filter,
  Github,
  Sparkles,
  Tag,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  CONTRIBUTING_URL,
  GITHUB_BACKEND_REPO_URL,
  GITHUB_FRONTEND_REPO_URL,
} from "@/shared/constants";
import { useTranslation } from "react-i18next";

const FEATURES_DATA = [
  { icon: Tag, key: "curatedLabels" },
  { icon: Filter, key: "smartFiltering" },
  { icon: Zap, key: "randomPicker" },
  { icon: Sparkles, key: "personalFeed" },
] as const;

const STEPS_DATA = [
  { key: "browseOrFilter" },
  { key: "pickAnIssue" },
  { key: "startContributing" },
] as const;

export function HomePage() {
  const location = useLocation();
  const { t } = useTranslation();
  const search = location.search || undefined;

  const ADVANTAGES_DATA =
    (t("whyYagfi.advantages", {
      returnObjects: true,
      defaultValue: [],
    }) as string[]) || [];

  return (
    <div className="flex flex-col">
      <section
        className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8"
        aria-labelledby="hero-heading"
      >
        <h1
          id="hero-heading"
          className="bg-gradient-to-r from-primary via-violet-600 to-primary bg-clip-text text-center text-3xl font-semibold tracking-tight text-transparent sm:text-4xl md:text-5xl"
        >
          {t("hero.title")}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg text-muted-foreground sm:text-xl">
          {t("hero.description")}
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button asChild size="lg" className="w-full sm:w-auto">
            <Link to={{ pathname: "/issues", search }}>
              {t("browseIssues")}
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="w-full sm:w-auto"
          >
            <Link to={{ pathname: "/feed", search }}>
              {t("personalizedFeed")}
            </Link>
          </Button>
        </div>
      </section>

      <section
        className="border-y border-border bg-muted/30 px-4 py-16 sm:px-6 lg:px-8"
        aria-labelledby="what-heading"
      >
        <div className="mx-auto max-w-3xl">
          <h2
            id="what-heading"
            className="text-2xl font-semibold tracking-tight sm:text-3xl"
          >
            {t("whatIs.title")}
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            <strong>{t("whatIs.description1")}</strong>{" "}
            {t("whatIs.description1_2")}—
            <strong>{t("whatIs.description1_3")}</strong>{" "}
            {t("whatIs.description1_4")}{" "}
            <strong>{t("whatIs.description1_5")}</strong>{" "}
            {t("whatIs.description1_6")}
          </p>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            {t("whatIs.description2")}
          </p>
        </div>
      </section>

      <section
        className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8"
        aria-labelledby="features-heading"
      >
        <h2
          id="features-heading"
          className="text-2xl font-semibold tracking-tight sm:text-3xl"
        >
          {t("features.title")}
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES_DATA.map(({ icon: Icon, key }) => (
            <Card
              key={key}
              className="border-border transition-colors duration-200 hover:border-primary/20"
            >
              <CardContent className="pt-6">
                <div
                  className="mb-4 flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary"
                  aria-hidden
                >
                  <Icon className="size-5" />
                </div>
                <h3 className="font-semibold">
                  {t(`features.items.${key}.title`)}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {t(`features.items.${key}.description`)}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section
        className="border-y border-border bg-muted/30 px-4 py-16 sm:px-6 lg:px-8"
        aria-labelledby="how-heading"
      >
        <div className="mx-auto max-w-3xl">
          <h2
            id="how-heading"
            className="text-2xl font-semibold tracking-tight sm:text-3xl"
          >
            {t("howItWorks.title")}
          </h2>
          <ol className="mt-10 space-y-8">
            {STEPS_DATA.map(({ key }) => (
              <li key={key} className="flex gap-4">
                <span
                  className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground"
                  aria-hidden
                >
                  {t(`howItWorks.steps.${key}.step`)}
                </span>
                <div>
                  <h3 className="font-semibold">
                    {t(`howItWorks.steps.${key}.title`)}
                  </h3>
                  <p className="mt-1 text-muted-foreground">
                    {t(`howItWorks.steps.${key}.description`)}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 lg:px-8"
        aria-labelledby="why-heading"
      >
        <h2
          id="why-heading"
          className="text-2xl font-semibold tracking-tight sm:text-3xl"
        >
          {t("whyYagfi.title")}
        </h2>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          {t("whyYagfi.description")}
        </p>
        <ul className="mt-8 space-y-4" role="list">
          {ADVANTAGES_DATA.map((item) => (
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

      <section
        className="border-y border-border bg-muted/30 px-4 py-16 sm:px-6 lg:px-8"
        aria-labelledby="cta-heading"
      >
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="cta-heading"
            className="text-2xl font-semibold tracking-tight sm:text-3xl"
          >
            {t("cta.title")}
          </h2>
          <p className="mt-4 text-muted-foreground">{t("cta.description")}</p>
          <Button asChild size="lg" className="mt-8">
            <Link to={{ pathname: "/issues", search }}>
              {t("cta.button")}
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </Button>
        </div>
      </section>

      <footer
        className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8"
        role="contentinfo"
      >
        <nav
          className="flex flex-wrap items-center justify-center gap-6"
          aria-label="Footer navigation"
        >
          <Link
            to={{ pathname: "/issues", search }}
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
          >
            <Bug className="size-4" aria-hidden />
            {t("footer.issues")}
          </Link>
          <Link
            to={{ pathname: "/feed", search }}
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
          >
            {t("footer.feed")}
          </Link>
          <a
            href={GITHUB_FRONTEND_REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
          >
            <Github className="size-4" aria-hidden />
            {t("footer.frontend")}
          </a>
          <a
            href={GITHUB_BACKEND_REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
          >
            <Github className="size-4" aria-hidden />
            {t("footer.backend")}
          </a>
          <a
            href={CONTRIBUTING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
          >
            {t("footer.suggestLabel")}
          </a>
        </nav>
        <p className="mt-8 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} YAGFI. {t("footer.copyright")}
        </p>
      </footer>
    </div>
  );
}
