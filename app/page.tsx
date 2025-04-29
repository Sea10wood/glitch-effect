import Link from 'next/link';
import PageTransition from './components/PageTransition';

export default function Home() {
  return (
    <PageTransition>
      <div className="h-screen w-full bg-green-300 flex items-center justify-center text-4xl">
        <Link href="/second">Scroll to Next Page</Link>
      </div>
    </PageTransition>
  );
}
