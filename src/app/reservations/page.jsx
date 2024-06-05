import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { ListingCard } from "../components/ListingCard";
import { NoItems } from "../components/NoItems";
import { unstable_noStore } from "next/cache";

async function getData(userId) {
    unstable_noStore();
  const data = await prisma.reservation.findMany({
    where: {
      userId: userId,
    },
    select: {
      Home: {
        select: {
          id: true,
          country: true,
          photo: true,
          description: true,
          price: true,
          Favorite: {
            where: {
              userId: userId,
            },
          },
        },
      },
    },
  });

  return data;
}

export default async function ReservationsRoute() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user?.id) return redirect("/");
  const data = await getData(user.id);
  return (
    <section className="container mx-atuo px-5 lg:px-10 mt-10">
      <h2 className="text-3xl font-semibold tracking-tight">
        Your Reservations
      </h2>

      {data.length === 0 ? (
        <NoItems
          title="Hey you dont have any Reservations"
          description="Please add a reservation to see it right here..."
        />
      ) : (
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1 gap-8 mt-8">
          {data.map((item) => (
            <ListingCard
              key={item.Home?.id}
              description={item.Home?.description }
              location={item.Home?.country}
              pathName="/favorites"
              homeId={item.Home?.id}
              imagePath={item.Home?.photo}
              price={item.Home?.price}
              userId={user.id}
              favoriteId={item.Home?.Favorite[0]?.id}
              isInFavoriteList={
                (item.Home?.Favorite.length) > 0 ? true : false
              }
            />
          ))}
        </div>
      )}
    </section>
  );
}