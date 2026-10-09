"use client";

import Link from "next/link";
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

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(
          "https://api.api-store.workers.dev/api/bazardor/categories",
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

  return (
  
    <div className="container mx-auto my-2 p-2">
      <button
        type="button"
        className="my-4 block md:hidden"
        onClick={handlebar}
        aria-label="Toggle navigation menu"
        aria-expanded={bar}
      >
        <FaBarsStaggered className="text-[24px]" />
      </button>

      {bar && (
        <div className="flex flex-col gap-4 md:hidden">
          {categories.map((item) => (
            <Link
              href={item.slug}
              key={item.id}
              onClick={() => setBar(false)}
              className="flex items-center gap-2"
            >
              <i className="text-[20px]">{item.icon}</i>
              <h2 className="text-[24px]">{item.nameBn}</h2>
            </Link>
          ))}
        </div>
      )}

      <div className="hidden items-center gap-4 md:flex">
        {categories.map((item) => (
          <Link
            href={item.slug}
            key={item.id}
            className="flex items-center gap-2"
          >
            <i className="text-[20px]">{item.icon}</i>
            <h2 className="text-[24px]">{item.nameBn}</h2>
          </Link>
        ))}
      </div>
    </div>
   
  );
};

export default Navbar;
