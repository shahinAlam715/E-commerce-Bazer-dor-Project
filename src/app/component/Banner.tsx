import Image from "next/image";
import Link from "next/link";

const Banner = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <div className="px-2">
      <div className="container mx-auto bg-white px-4 py-4 my-4 rounded-xl">
        <div className="grid grid-cols-1  md:grid-cols-2 gap-4 items-center">
          <div className="">
            <h5 className="bg-green-200 text-green-500 text-[14px] h-7 w-43.5 rounded-3xl text-center leading-7">
              {date}
            </h5>
            <h2 className="text-4xl font-bold text-black mt-10">
              আজকের বাজারের দাম এক নজরে
            </h2>
            <p className="text-xl font-medium text-black mt-10">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
              বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
            </p>
            <Link href={"/sobponno"}>
              <button className="bg-[#1A9951] px-4 py-2 text-white rounded-xl mt-10">
                সব পণ্য দেখুন
              </button>
            </Link>
          </div>
          <div className=" flex justify-center">
            <Image
              src={"/bazar-hero.png"}
              alt="hero"
              height={500}
              width={500}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
