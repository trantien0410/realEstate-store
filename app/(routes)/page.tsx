import getFirstBillboard from "@/actions/get-firstBillboard";
import getProducts, { Query } from "@/actions/get-products";
import DynamicProductList from "@/components/dynamic-product-list";
import ScrollUp from "@/components/scroll-up";
import Billboard from "@/components/ui/billboard";
import Container from "@/components/ui/container";

export const revalidate = 0;

interface HomePageProps {
  searchParams: Query;
}

const HomePage = async ({ searchParams }: HomePageProps) => {
  const initialProducts = await getProducts({
    ...searchParams,
    limit: 10,
    offset: 0,
  });
  const billboard = await getFirstBillboard();
  return (
    <>
      <ScrollUp />
      <Container>
        <div className="space-y-10 pb-10">
          <Billboard data={billboard} />
          <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
            <DynamicProductList
              initialProducts={initialProducts}
              searchParams={searchParams}
            />
          </div>
        </div>
      </Container>
    </>
  );
};

export default HomePage;
