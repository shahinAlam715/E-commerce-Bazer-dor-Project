import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";
import { FaPercent } from "react-icons/fa6";
import MarqueeText from "react-marquee-text";

interface Marqeeprops {
  id: number;
  categoryIcon: string;
  today: number;
  unit: string;
  nameBn: string;
  change: {
    dir: string;
    pct: number;
  };
}

const Marqee = async () => {
  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/products",
  );
  const data: Marqeeprops[] = await res.json();

  return (
    <>
      <MarqueeText direction="right" duration={10}>
        <div className="flex gap-5 items-center py-4 px-5 bg-white">
          {data.map((item) => (
            <div className="flex gap-2 items-center" key={item.id}>
              <i>{item.categoryIcon}</i>
              <h2 className="fle">{item.nameBn}</h2>
              <h3>{item.today}</h3>
              <h3>{item.unit}</h3>
              <div className="">
                {item.change.dir === "up" ? (
                  <div className="flex gap-2 items-center">
                    <h2 className="flex gap-1 text-green-500 items-center">
                      <span className="text-[15px]">
                        <BiSolidUpArrow />
                      </span>
                    </h2>
                    <h2 className="flex gap-1 text-green-500 items-center">
                      {item.change.pct}
                      <span>
                        <i>
                          <FaPercent />
                        </i>
                      </span>
                    </h2>
                  </div>
                ) : (
                  <div className="flex gap-2 items-center">
                    <h2 className="flex gap-1 text-red-500 items-center">
                      <span className="text-[15px]">
                        <BiSolidDownArrow />
                      </span>
                    </h2>
                    <h2 className="flex gap-1 text-red-500 items-center">
                      {item.change.pct}
                      <span>
                        <i>
                          <FaPercent />
                        </i>
                      </span>
                    </h2>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </MarqueeText>
    </>
  );
};

export default Marqee;
