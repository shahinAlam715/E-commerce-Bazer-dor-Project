import Allproduct from "./component/Allproduct";
import Banner from "./component/Banner";
import Price_decrease from "./component/Price_decrease";
import Price_increase from "./component/Price_increase";

export default function Home() {
  return (
    <>
      <Banner />
      <Price_increase />
      <Price_decrease />
      <Allproduct />
    </>
  );
}
