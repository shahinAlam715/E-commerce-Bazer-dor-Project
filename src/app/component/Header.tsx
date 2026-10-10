import Image from "next/image";
import Link from "next/link";
import Sesstion from "./Sesstion";

const Header = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <div className="container mx-auto flex justify-between py-4 px-2 items-center">
      <Link href={"/"}>
        <div className="flex gap-2 items-center">
          <div className="">
            <Image src={"/logo.png"} alt="logo" height={50} width={50} />
          </div>
          <div className="hidden sm:block">
            <h2 className="font-bold text-[24px] text-black">বাজার দর</h2>
            <p className="font-medium text-xl text-black text-[16px]">{date}</p>
          </div>
        </div>
      </Link>

      <Sesstion/>

    </div>
  );
};

export default Header;
