import React from 'react';
import { unstable_noStore } from "next/cache";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { ListingCard } from '../components/ListingCard';
import { NoItems } from '../components/NoItems';
import { redirect } from 'next/navigation';

async function getData(userId) {
    unstable_noStore();
    const data = await prisma.favorite.findMany({
      where: {
        userId: userId,
      },
      select: {
        Home: {
          select: {
            photo: true,
            id: true,
            Favorite: true,
            price: true,
            country: true,
            description: true,
          },
        },
      },
    });
  
    return data;
  }

export default async function FavoriteRoute() {
    const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) return redirect("/");
  const data = await getData(user.id);
    return (
        <section className="container mx-atuo px-5 lg:px-10 mt-10">
        <h2 className="text-3xl font-semibold tracking-tight">Your Favorites</h2>
  
        {data.length === 0 ? (
          <NoItems
            title="Hey you dont have any favorites"
            description="Please add favorites to see them right here..."
          />
        ) : (
          <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1 gap-8 mt-8">
            {data.map((item) => (
              <ListingCard
                key={item.Home?.id}
                description={item.Home?.description }
                location={item.Home?.country}
                pathName="/favorites"
                homeId={item.Home?.id }
                imagePath={item.Home?.photo}
                price={item.Home?.price}
                userId={user.id}
                favoriteId={item.Home?.Favorite[0].id}
                isInFavoriteList={
                  (item.Home?.Favorite.length) > 0 ? true : false
                }
              />
            ))}
          </div>
        )}
      </section>
    );
};
