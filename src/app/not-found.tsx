import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[80vh] flex-col items-center justify-center px-6 text-center">
      <p className="font-display text-[30vw] font-bold leading-none text-gradient md:text-[14rem]">404</p>
      <h1 className="mt-4 font-display text-3xl font-semibold">This page went out of calibration.</h1>
      <Link href="/" className="mt-8 rounded-full bg-teal px-7 py-3.5 font-medium text-ink">Back to home</Link>
    </section>
  );
}
