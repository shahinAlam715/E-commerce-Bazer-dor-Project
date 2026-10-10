import Link from "next/link";
import { notFound } from "next/navigation";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";
import { FaPercent } from "react-icons/fa6";

interface Marqeeprops {
  id: number;
  categoryIcon: string;
  today: number;
  unit: string;
  nameBn: string;
  image: string;
  change: {
    dir: string;
    pct: number;
  };
}
const SobponnoPage = async () => {
  const res = await fetch("https://api.abcz.workers.dev/api/bazardor/products");
  const data: Marqeeprops[] = await res.json();

  if (!data) {
    notFound();
  }

  return (
    <div className="container mx-auto p-2 my-5">
      <h2 className="text-2xl font-bold mt-5">সব পণ্য</h2>
      <p className="text-xl font-medium my-5">
        মোট {data.length.toLocaleString("bn-BD")}টি পণ্য দেখানো হচ্ছে
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {data.map((up) => (
          <Link href={`/details/${up.id}`} key={up.id}>
            <div className="bg-white p-4 rounded-xl">
              <div className="flex gap-4 items-center">
                <div className="bg-gray-100 p-2 rounded-xl">
                  <h2 className="text-[30px]">{up.image}</h2>
                </div>
                <div className="">
                  <h2 className="text-2xl">{up.nameBn}</h2>
                  <p className="text-xl">প্রতি কেজি</p>
                </div>
              </div>
              <div className="mt-5 flex justify-between">
                <div className="">
                  <h2>আজকের দাম</h2>
                  <h2 className="">
                    {up.today.toLocaleString("bn-BD")}
                    <span className="mx-2">টাকা</span>
                  </h2>
                </div>

                {up.change.dir === "up" ? (
                  <div className="flex items-center text-red-500">
                    <span className="text-[15px] mx-2">
                      <BiSolidUpArrow />
                    </span>
                    <h3 className="flex items-center">
                      {up.change.pct.toLocaleString("bn-BD")}
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
                      {up.change.pct.toLocaleString("bn-BD")}
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
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SobponnoPage;
