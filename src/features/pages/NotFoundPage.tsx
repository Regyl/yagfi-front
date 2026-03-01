import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export function NotFoundPage() {
  const { t } = useTranslation();
  return (
    <div className="flex min-h-[80vh] items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-bold">
            {t("notFoundPage.title")}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-center">
          <p className="text-lg text-muted-foreground">
            {t("notFoundPage.description")}
          </p>

          <div className="rounded-lg overflow-hidden border">
            <img
              src="https://share.google/t3Gz3AEeuIqysYi9a"
              alt="Funny 404 meme"
              className="w-full max-h-[400px] object-contain"
            />
          </div>

          <p className="text-lg">{t("notFoundPage.description2")}</p>

          <div className="flex justify-center gap-4 pt-4">
            <Button asChild>
              <Link to="/">{t("notFoundPage.goHome")}</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/issues">{t("notFoundPage.browseIssues")}</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
