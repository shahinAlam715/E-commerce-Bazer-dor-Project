"use client";
import Link from "next/link";
import { FaArrowLeft, FaHouse } from "react-icons/fa6";

const NotFound = () => {
  return (
    <main className="flex min-h-[80vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl text-center">
        <h1 className="text-8xl font-extrabold tracking-tight text-green-500 sm:text-9xl">
          404
        </h1>

        <h2 className="mt-4 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
          Page Not Found!
        </h2>

        <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-gray-600 sm:text-base">
          Sorry, the page you are looking for does not exist or may have been
          moved. Please check the URL or return to the homepage.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-green-500 px-6 py-3 font-semibold text-white transition hover:bg-green-600 sm:w-auto"
          >
            <FaHouse />
            Back to Home
          </Link>

          <button
            type="button"
            onClick={() => window.history.back()}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-100 sm:w-auto"
          >
            <FaArrowLeft />
            Go Back
          </button>
        </div>

        <p className="mt-10 text-sm text-gray-400">
          Error Code: 404 | Page Not Found
        </p>
      </div>
    </main>
  );
};

export default NotFound;
