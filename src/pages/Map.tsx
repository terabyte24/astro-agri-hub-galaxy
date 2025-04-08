
import PageWrapper from "@/components/layout/page-wrapper";
import Navbar from "@/components/layout/navbar";
import StoreLocationMap from "@/components/store-map/store-location-map";
import { useLanguage } from "@/lib/language-context";

const Map = () => {
  const { t } = useLanguage();

  return (
    <>
      <Navbar />
      <PageWrapper>
        <div className="container mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold mb-4">{t("findStores")}</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Locate nearby agricultural stores for seeds, pesticides, equipment and more
            </p>
          </div>
          
          <StoreLocationMap />
        </div>
      </PageWrapper>
    </>
  );
};

export default Map;
