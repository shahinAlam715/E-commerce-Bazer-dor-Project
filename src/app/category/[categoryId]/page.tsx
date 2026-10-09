import Selectdata from "@/app/component/Selectdata";

const CategoryPage = async ({
  params,
}: {
  params: Promise<{ categoryId: string }>;
}) => {
  const { categoryId } = await params;

  const res = await fetch(
    `https://api.api-store.workers.dev/api/bazardor/products?category=${categoryId}`,
  );

  const data = await res.json();

  const category = data[0];

  return (
    <div className="container mx-auto my-10 p-2">
      <div className="flex items-center gap-4 bg-white p-2 rounded-2xl">
        <div className="rounded-xl p-2">
          <h2 className="text-[30px]">{category?.categoryIcon ?? "🛒"}</h2>
        </div>

        <div>
          <h2 className="text-2xl">{category?.categoryNameBn ?? categoryId}</h2>

          <p className="text-xl">{data.length}টি পণ্যের আজকের দাম ও পরিবর্তন</p>
        </div>
      </div>

      <Selectdata item={data} />
    </div>
  );
};

export default CategoryPage;
