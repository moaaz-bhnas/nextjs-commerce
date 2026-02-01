import Grid from "components/grid";
import ProductGridItems from "components/layout/product-grid-items";
import Link from "next/link";
import type { HomePageCollection } from "lib/shopify";

export function HomeCollections({
  collections,
}: {
  collections: HomePageCollection[];
}) {
  if (!collections.length) return null;

  return (
    <section className="mx-auto max-w-(--breakpoint-2xl) space-y-10 px-4 pb-8 pt-8">
      {collections.map(({ collection, products }) => (
        <div key={collection.handle}>
          <h2 className="mb-4 text-xl font-semibold">
            <Link
              href={`/search/${collection.handle}`}
              className="hover:underline"
              prefetch={true}
            >
              {collection.title}
            </Link>
          </h2>
          {products.length === 0 ? (
            <p className="text-neutral-500">No products in this collection.</p>
          ) : (
            <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              <ProductGridItems products={products} />
            </Grid>
          )}
        </div>
      ))}
    </section>
  );
}
