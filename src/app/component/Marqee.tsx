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
    dir: "up" | "down" | "flat";
    pct: number;
  };
}

const unitBn: Record<string, string> = {
  kg: "কেজি",
  gram: "গ্রাম",
  litre: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
};

const Marqee = async () => {
  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/products"
  );


  const data: Marqeeprops[] = await res.json();

  return (
    <MarqueeText direction="right" duration={10}>
      <div className="flex items-center gap-5 bg-white px-5 py-4">
        {data.map((item) => (
          <div
            className="flex shrink-0 items-center gap-2"
            key={item.id}
          >
            <span>{item.categoryIcon}</span>

            <h2 className="whitespace-nowrap">
              {item.nameBn}
            </h2>

            <h3 className="whitespace-nowrap font-semibold">
              {item.today.toLocaleString("bn-BD")}
            </h3>

            <h3 className="whitespace-nowrap">
              {unitBn[item.unit] ?? item.unit}
            </h3>

            {item.change.dir === "up" ? (
              <div className="flex items-center gap-1 text-green-500">
                <BiSolidUpArrow />
                <span>
                  {item.change.pct.toLocaleString("bn-BD")}
                </span>
                <FaPercent />
              </div>
            ) : item.change.dir === "down" ? (
              <div className="flex items-center gap-1 text-red-500">
                <BiSolidDownArrow />
                <span>
                  {item.change.pct.toLocaleString("bn-BD")}
                </span>
                <FaPercent />
              </div>
            ) : (
              <div className="flex items-center gap-1 text-gray-500">
                <span>—</span>
                <span>
                  {item.change.pct.toLocaleString("bn-BD")}
                </span>
                <FaPercent />
              </div>
            )}
          </div>
        ))}
      </div>
    </MarqueeText>
  );
};

export default Marqee;