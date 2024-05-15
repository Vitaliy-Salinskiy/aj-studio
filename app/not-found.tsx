import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <section className="bg-white dark:bg-gray-900 ">
      <div className="container min-h-screen px-6 py-12 mx-auto lg:flex lg:items-center lg:gap-12">
        <div className="wf-ull lg:w-1/2">
          <p className="text-sm font-medium text-own-red">404 error</p>
          <h1 className="mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">
            Page not found
          </h1>
          <p className="mt-4 text-gray-500 dark:text-gray-400">
            Sorry, the page you are looking for doesn&apos;t exist. Here are
            some helpful links:
          </p>

          <div className="flex items-center mt-6 gap-x-3">
            <Link
              href="/"
              className="w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-own-red rounded-lg shrink-0 sm:w-auto hover:bg-own-light-red"
            >
              Take me home
            </Link>
          </div>
        </div>

        <div className="relative max-w-full w-full h-36 md:h-40 mt-8 lg:w-1/2 lg:mt-0">
          <Image
            className="absolute"
            layout="fill"
            objectFit="contain"
            src="/not-found.svg"
            alt="not found 404"
          />
        </div>
      </div>
    </section>
  );
}
