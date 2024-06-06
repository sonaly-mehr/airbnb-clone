import Image from "next/image";
import MapFilterItems from "./components/MapFilterItems";
import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NoItems } from "./components/NoItems";
import { Suspense } from "react";
import { SkeltonCard } from "./components/SkeletonCard";
import { ListingCard } from "./components/ListingCard";
import { unstable_noStore } from "next/cache";

async function getData({ searchParams, userId }) {
  unstable_noStore();
  const data = await prisma.home.findMany({
    where: {
      addedCategory: true,
      addedLoaction: true,
      addedDescription: true,
      categoryName: searchParams?.filter ?? undefined,
      country: searchParams?.country ?? undefined,
      guests: searchParams?.guest ?? undefined,
      bedrooms: searchParams?.room ?? undefined,
      bathrooms: searchParams?.bathroom ?? undefined,
    },
    select: {
      photo: true,
      id: true,
      price: true,
      description: true,
      country: true,
      Favorite: {
        where: {
          userId: userId ?? undefined
        }
      }
    },
  });
  return data;
}
export default function Home({searchParams}) {
  return (
    <div className="container mx-auto px-5 lg:px-10">
      <MapFilterItems />

      <Suspense key={searchParams?.filter} fallback={<SkeletonLoading />}>
        <ShowItems searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

async function ShowItems({ searchParams }) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const data = await getData({ searchParams, userId: user?.id });
  return (
    <>
      {data.length === 0 ? (
        <NoItems
          description="Please check a other category or create your own listing!"
          title="Sorry no listings found for this category..."
        />
      ) : (
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
        {data.map((item) => (
          <ListingCard
            key={item.id}
            description={item.description}
            imagePath={item.photo }
            location={item.country}
            price={item.price }
            userId={user?.id}
            favoriteId={item.Favorite[0]?.id}
            isInFavoriteList={item.Favorite.length > 0 ? true : false}
            homeId={item.id}
            pathName="/"
          />
        ))}
      </div>
      )}
    </>
  );
}

function SkeletonLoading() {
  return (
    <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
      <SkeltonCard />
      <SkeltonCard />
      <SkeltonCard />
      <SkeltonCard />
      <SkeltonCard />
      <SkeltonCard />
      <SkeltonCard />
      <SkeltonCard />
      <SkeltonCard />
    </div>
  );
}
