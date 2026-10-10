"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FaBarsStaggered } from "react-icons/fa6";

interface Navprops {
  icon: string;
  id: string;
  nameBn: string;
  slug: string;
}

const Navbar = () => {
  const [bar, setBar] = useState(false);
  const [categories, setCategories] = useState<Navprops[]>([]);

  const pathname = usePathname();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(
          "https://api.abcz.workers.dev/api/bazardor/categories",
        );

        if (!res.ok) {
          throw new Error("Failed to fetch categories");
        }

        const data: Navprops[] = await res.json();
        setCategories(data);
      } catch (error) {
        console.error("Categories fetch error:", error);
      }
    };

    fetchCategories();
  }, []);

  const handlebar = () => {
    setBar((prev) => !prev);
  };

  const getLinkClass = (slug: string) => {
    const isActive = pathname === `/category/${slug}`;

    return `flex items-center gap-2 rounded-lg px-3 py-2 transition-colors duration-200 ${
      isActive
        ? "bg-green-500 text-white"
        : "text-gray-700 hover:bg-green-100 hover:text-green-700"
    }`;
  };

  return (
    <nav className="container mx-auto my-2 p-2">
      <button
        type="button"
        className="my-4 block rounded-lg p-2 hover:bg-green-100 md:hidden"
        onClick={handlebar}
        aria-label="Toggle navigation menu"
        aria-expanded={bar}
      >
        <FaBarsStaggered className="text-2xl" />
      </button>

      {bar && (
        <div className="flex flex-col gap-2 md:hidden">
          {categories.map((item) => (
            <Link
              href={`/category/${item.slug}`}
              key={item.id}
              onClick={() => setBar(false)}
              className={getLinkClass(item.slug)}
            >
              <span className="text-xl">{item.icon}</span>

              <span className="text-lg">{item.nameBn}</span>
            </Link>
          ))}
        </div>
      )}

      <div className="hidden flex-wrap items-center gap-3 md:flex">
        {categories.map((item) => (
          <Link
            href={`/category/${item.slug}`}
            key={item.id}
            className={getLinkClass(item.slug)}
          >
            <span className="text-xl">{item.icon}</span>

            <span className="text-lg">{item.nameBn}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
