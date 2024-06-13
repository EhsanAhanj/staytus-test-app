import Link from 'next/link';

export default function Index() {
  return (
    <div className="flex gap-4 h-screen flex-col w-screen items-center justify-center overflow-hidden bg-blue-100">
      <h1 className="text-6xl ">Home Page</h1>

      <Link
        className="h-10 px-24 rounded-sm  flex items-center justify-center shadow bg-blue-500 text-white"
        href={'/list'}
      >
        List{' '}
      </Link>
    </div>
  );
}
