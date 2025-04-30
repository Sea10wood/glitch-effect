import Link from 'next/link';
import PageTransition from '../components/PageTransition';

export default function SecondPage() {
  return (
    <PageTransition>
      <div className="h-screen w-full bg-sky-300 flex items-center justify-center text-4xl">
        <Link href="/">Back to First Page</Link>
      </div>
    </PageTransition>
  );
}
