import getProduct from "@/actions/get-product";
import getProducts from "@/actions/get-products";
import Gallery from "@/components/gallery";
import Info from "@/components/info";
import Description from "@/components/description";
import ContainerIndividual from "@/components/ui/container-individual";
import SuggestProductList from "@/components/suggest-product-list";

export const revalidate = 0;

interface ProductPageProps {
  params: {
    productId: string;
  };
}

const ProductPage: React.FC<ProductPageProps> = async ({ params }) => {
  const product = await getProduct(params.productId);

  const suggestedProducts = await getProducts({
    categoryId: product?.category?.id,
  });
  return (
    <div className="bg-white">
      <ContainerIndividual>
        <div className="px-4 py-10 sm:px-6 lg:px-8 pt-20">
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
            {/* Gallery */}
            <Gallery images={product.images} videos={product.videos} />
            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
              {/* Info */}
              <Info data={product} />
            </div>
          </div>
          <hr className="my-10" />
          <Description data={product} />
          <hr className="my-10" />
          <SuggestProductList
            title="Sản phẩm liên quan"
            items={suggestedProducts}
          />
        </div>
      </ContainerIndividual>
    </div>
  );
};

export default ProductPage;
