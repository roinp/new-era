import { Suspense } from "react";
import { ProductBrowser } from "@/components/ProductBrowser";
import { PageHeader } from "@/components/PageHeader";

export const metadata = {
  title: "ყველა პროდუქტი",
  description:
    "დაათვალიერე ათასობით სამშენებლო მასალა, ხელსაწყო და აღჭურვილობა კატეგორიის, ბრენდის, ფასისა და რეიტინგის მიხედვით ფილტრაციით.",
};

export default function ProductsPage() {
  return (
    <div>
      <PageHeader titleKey="products.title" subtitleKey="products.subtitle" />
      <Suspense fallback={<div className="p-12 text-center text-muted" />}>
        <ProductBrowser />
      </Suspense>
    </div>
  );
}
