import Link from "next/link";
import { notFound } from "next/navigation";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";
import { FaPercent } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";

export interface Market {
  market: string;
  division: string;
  min: number;
  max: number;
}

export interface Product {
  id: number;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;

  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };

  markets: Market[];
}

const DetailsPage = async ({ params }: { params: { detailsId: string } }) => {
  const { detailsId } = await params;

  const res = await fetch(
    `https://api.api-store.workers.dev/api/bazardor/products/${detailsId}`,
  );
  const data: Product = await res.json();

  if (!data) {
    notFound();
  }

  const unitBn: Record<string, string> = {
    kg: "কেজি",
    gram: "গ্রাম",
    litre: "লিটার",
    dozen: "ডজন",
    piece: "পিস",
  };

  const minPrice = Math.min(...data.markets.map((market) => market.min));

  const maxPrice = Math.max(...data.markets.map((market) => market.max));

  return (
    <div className="container mx-auto p-2">
      <div className="flex items-center mx-2 my-4">
        <Link href={"/"}>
          <h2 className="text-xl mx-1">হোম</h2>
        </Link>
        <span>
          <IoIosArrowForward />
        </span>
        <h2 className="text-xl mx-1">{data.categoryNameBn}</h2>
        <span>
          <IoIosArrowForward />
        </span>
        <h2 className="text-xl mx-1">{data.nameBn}</h2>
      </div>

      <div className="bg-white p-4 block md:flex justify-between items-center rounded-xl">
        <div className="flex gap-4 items-center">
          <div className="bg-gray-100 h-15 w-15 rounded-xl">
            <h2 className="text-2xl text-center leading-15">{data.image}</h2>
          </div>
          <div className="">
            <h2 className="text-2xl">{data.nameBn}</h2>
            <h3>প্রতি কেজি · {data.categoryNameBn}</h3>
            <p>
              গতকালের তুলনায় আজ দাম বেড়েছে · {data.yesterday - data.today}{" "}
              টাকা
            </p>
          </div>
        </div>

        <div className="bg-gray-100 p-4 rounded-xl">
          <div className="">
            <h2>আজকের দাম</h2>
            <h2 className="text-2xl md:text-center">
              {data.today.toLocaleString("bn-BD")}
            </h2>
            <span className="mx-2">টাকা</span>
            <span> {unitBn[data.unit] ?? data.unit}</span>
          </div>

          {data.change.dir === "up" ? (
            <div className="flex items-center text-red-500">
              <span className="text-[15px] mx-2">
                <BiSolidUpArrow />
              </span>
              <h3 className="flex items-center">
                {data.change.pct.toLocaleString("bn-BD")}
                <span className="mx-2">
                  <i>
                    <FaPercent />
                  </i>
                </span>
              </h3>
            </div>
          ) : (
            <div className="flex items-center text-green-500">
              <span className="text-[15px] mx-2">
                <BiSolidDownArrow />
              </span>
              <h3 className="flex items-center">
                {data.change.pct.toLocaleString("bn-BD")}
                <span className="mx-2">
                  <i>
                    <FaPercent />
                  </i>
                </span>
              </h3>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white my-10 p-5 rounded-xl">
        <h2 className="text-3xl font-bold">দামের সারসংক্ষেপ</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-10">
          <div className="card card-border bg-base-200">
            <div className="card-body">
              <h2 className="card-title">সর্বনিম্ন দাম</h2>
              <p className="text-green-500 text-3xl font-bold">
                {minPrice.toLocaleString("bn-BD")}
                <span>টাকা</span>
              </p>
              <p>সবচেয়ে কম দামের বাজার</p>
            </div>
          </div>

          <div className="card card-border bg-base-200 ">
            <div className="card-body">
              <h2 className="card-title">সর্বাধিক দাম</h2>
              <p className="text-red-500 text-3xl font-bold">
                {maxPrice.toLocaleString("bn-BD")}
                <span>টাকা</span>
              </p>
              <p>সবচেয়ে বেশি দামের বাজার</p>
            </div>
          </div>

          <div className="card card-border bg-base-200">
            <div className="card-body">
              <h2 className="card-title">গড় দাম</h2>
              <p className="text-green-500 text-3xl font-bold">
                {((minPrice + maxPrice) / 2).toLocaleString("bn-BD")}
                <span>টাকা</span>
              </p>
              <p>প্রতি কেজি-এর হিসাবে</p>
            </div>
          </div>
        </div>

        <div className="">
          <h2 className="text-3xl font-bold">বাজারভিত্তিক আজকের দাম</h2>
          <div className="w-full overflow-x-auto rounded-xl">
            <table className="table w-full min-w-162.5">
              <thead>
                <tr className="bg-base-200">
                  <th className="text-sm sm:text-base">বাজার</th>
                  <th className="text-sm sm:text-base">বিভাগ</th>
                  <th className="text-sm sm:text-base">সর্বনিম্ন</th>
                  <th className="text-sm sm:text-base">সর্বাধিক</th>
                  <th className="text-sm sm:text-base">গড়</th>
                </tr>
              </thead>

              <tbody>
                {data.markets.map((mar, i) => (
                  <tr
                    key={mar.market}
                    className={i % 2 === 0 ? "bg-base-200" : "bg-base-300"}
                  >
                    <td className="whitespace-nowrap text-sm sm:text-base">
                      {mar.market}
                    </td>

                    <td className="whitespace-nowrap text-sm sm:text-base">
                      {mar.division}
                    </td>

                    <td className="whitespace-nowrap text-sm sm:text-base">
                      {mar.min.toLocaleString("bn-BD")} টাকা
                    </td>

                    <td className="whitespace-nowrap text-sm sm:text-base">
                      {mar.max.toLocaleString("bn-BD")} টাকা
                    </td>

                    <td className="whitespace-nowrap text-sm sm:text-base">
                      {((mar.min + mar.max) / 2).toLocaleString("bn-BD", {
                        maximumFractionDigits: 2,
                      })}
                      টাকা
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
