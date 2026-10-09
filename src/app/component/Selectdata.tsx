"use client";

import Link from "next/link";
import { useState } from "react";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";
import { FaPercent } from "react-icons/fa6";

interface Product {
  id: number;
  nameBn: string;
  image?: string;
  categoryIcon: string;
  today: number;
  unit: string;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
}

interface SelectdataProps {
  item: Product[];
}

const Selectdata = ({ item }: SelectdataProps) => {
  const [selectData, setSelectData] = useState("ডিফল্ট");

  const sortedData = [...item].sort((a, b) => {
    if (selectData === "দাম: কম থেকে বেশি") {
      return a.today - b.today;
    }

    if (selectData === "দাম: বেশি থেকে কম") {
      return b.today - a.today;
    }

    return 0;
  });

  return (
    <div>
      <div className="my-5 flex items-center justify-end">
        <h2 className="mx-2 text-xl">সাজান:</h2>

        <select
          value={selectData}
          className="select select-accent"
          onChange={(e) => setSelectData(e.target.value)}
        >
          <option value="ডিফল্ট">ডিফল্ট</option>
          <option value="দাম: কম থেকে বেশি">দাম: কম থেকে বেশি</option>
          <option value="দাম: বেশি থেকে কম">দাম: বেশি থেকে কম</option>
        </select>
      </div>

      <p className="my-5 text-xl font-medium">
        মোট {sortedData.length.toLocaleString("bn-BD")}টি পণ্য দেখানো হচ্ছে
      </p>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {sortedData.map((up) => (
          <Link href={`/details/${up.id}`} key={up.id}>
            <div className="rounded-xl bg-white p-4">
              <div className="flex items-center gap-4">
                <div className="rounded-xl bg-gray-100 p-2">
                  <h2 className="text-[30px]">{up.image ?? up.categoryIcon}</h2>
                </div>

                <div>
                  <h2 className="text-2xl">{up.nameBn}</h2>
                  <p className="text-xl">
                    প্রতি{" "}
                    {up.unit === "kg"
                      ? "কেজি"
                      : up.unit === "litre"
                        ? "লিটার"
                        : up.unit === "piece"
                          ? "পিস"
                          : up.unit === "dozen"
                            ? "ডজন"
                            : up.unit}
                  </p>
                </div>
              </div>

              <div className="mt-5 flex justify-between">
                <div>
                  <h2>আজকের দাম</h2>
                  <h2>
                    {up.today.toLocaleString("bn-BD")}
                    <span className="mx-2">টাকা</span>
                  </h2>
                </div>

                {up.change.dir === "up" ? (
                  <div className="flex items-center text-red-500">
                    <BiSolidUpArrow className="mx-2" />
                    <span>{up.change.pct.toLocaleString("bn-BD")}</span>
                    <FaPercent className="mx-2" />
                  </div>
                ) : (
                  <div className="flex items-center text-green-500">
                    <BiSolidDownArrow className="mx-2" />
                    <span>{up.change.pct.toLocaleString("bn-BD")}</span>
                    <FaPercent className="mx-2" />
                  </div>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Selectdata;
