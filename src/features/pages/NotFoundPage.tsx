import {Button} from '@/components/ui/button';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Link} from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-bold">404 - Page Not Found!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-center">
          <p className="text-lg text-muted-foreground">
            Oops! The page you're looking for went on vacation and didn't leave a forwarding address.
          </p>
          
          <div className="rounded-lg overflow-hidden border">
            <img 
              src="https://share.google/t3Gz3AEeuIqysYi9a" 
              alt="Funny 404 meme" 
              className="w-full max-h-[400px] object-contain"
            />
          </div>
          
          <p className="text-lg">
            Meanwhile, here's a confused cat wondering what you were looking for 🐱
          </p>
          
          <div className="flex justify-center gap-4 pt-4">
            <Button asChild>
              <Link to="/">Go Home</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/issues">Browse Issues</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
