import getAmenities from "@/actions/get-amenities";
import getProducts from "@/actions/get-products";
import getCategoriesByBillboard from "@/actions/get-categoriesByBillboard";
import getSizes from "@/actions/get-sizes";
import getBillboard from "@/actions/get-billboard";
import Billboard from "@/components/ui/billboard";
import Container from "@/components/ui/container";
import Filter from "./components/filter";
import NoResults from "@/components/ui/no-results";
import ProductCard from "@/components/ui/product-card";
import MobileFilters from "./components/mobile-filters";
import SearchModal from "@/components/modals/search-modal";

export const revalidate = 0;

interface BillboardPageProps {
  params: {
    billboardId: string;
  };
  searchParams: {
    categoryId: string;
    amenitiesId: string;
    sizeId: string;
  };
}

const BillboardPage: React.FC<BillboardPageProps> = async ({
  params,
  searchParams,
}) => {
  const products = await getProducts({
    billboardId: params.billboardId,
    categoryId: searchParams.categoryId,
    amenitiesId: searchParams.amenitiesId,
    sizeId: searchParams.sizeId,
  });

  const sizes = await getSizes();
  const amenities = await getAmenities();
  const categories = await getCategoriesByBillboard(params.billboardId);
  const billboard = await getBillboard(params.billboardId);

  return (
    <div className="bg-white">
      <Container>
        <Billboard data={billboard} />
        <div className="px-4 sm:px-6 lg:px-8 pb-24 pt-10">
          <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
            {/*Mobile Filters */}
            <MobileFilters
              sizes={sizes}
              amenities={amenities}
              categories={categories}
            />
            <div className="hidden lg:block">
              <Filter valueKey="categoryId" name="Thể Loại" data={categories} />
              <Filter valueKey="sizeId" name="Kích Thước" data={sizes} />
              <Filter
                valueKey="amenitiesId"
                name="Tiện Nghi"
                data={amenities}
              />
              <SearchModal billboardId={params.billboardId} />
            </div>
            <div className="mt-6 lg:col-span-4 lg:mt-0">
              {products.length === 0 && <NoResults />}
              <div className="grid gird-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {products.map((item) => (
                  <ProductCard key={item.id} data={item} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default BillboardPage;
