"use server";

import prisma from "@/lib/db";
import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createAirbnbHome({ userId }) {
  const data = await prisma.home.findFirst({
    where: {
      userId: userId,
    },
    orderBy: {
      createdAT: "desc",
    },
  });

  if (data === null) {
    const data = await prisma.home.create({
      data: {
        userId: userId,
      },
    });

    return redirect(`/create/${data.id}/structure`);
  } else if (
    !data.addedCategory &&
    !data.addedDescription &&
    !data.addedLoaction
  ) {
    return redirect(`/create/${data.id}/structure`);
  } else if (data.addedCategory && !data.addedDescription) {
    return redirect(`/create/${data.id}/description`);
  } else if (
    data.addedCategory &&
    data.addedDescription &&
    !data.addedLoaction
  ) {
    return redirect(`/create/${data.id}/address`);
  } else if (
    data.addedCategory &&
    data.addedDescription &&
    data.addedLoaction
  ) {
    const data = await prisma.home.create({
      data: {
        userId: userId,
      },
    });

    return redirect(`/create/${data.id}/structure`);
  }
}

export async function createCategoryPage(formData) {
  const categoryName = formData.get("categoryName");
  const homeId = formData.get("homeId");
  const data = await prisma.home.update({
    where: {
      id: homeId,
    },
    data: {
      categoryName: categoryName,
      addedCategory: true,
    },
  });

  return redirect(`/create/${homeId}/description`);
}

export async function createDescription(formData) {
  const title = formData.get("title");
  const description = formData.get("description");
  const price = formData.get("price");
  const imageFile = formData.get("image");
  const homeId = formData.get("homeId");
  const guestNumber = formData.get("guest");
  const roomNumber = formData.get("room");
  const bathroomsNumber = formData.get("bathroom");

  const { data: imageData } = await supabase.storage
    .from("Assets")
    .upload(`${imageFile.name}-${new Date()}`, imageFile, {
      cacheControl: "2592000",
      contentType: "image/png",
    });

  const data = await prisma.home.update({
    where: {
      id: homeId,
    },
    data: {
      title: title,
      description: description,
      price: Number(price),
      bedrooms: roomNumber,
      bathrooms: bathroomsNumber,
      guests: guestNumber,
      photo: imageData?.path,
      addedDescription: true,
    },
  });
  return redirect(`/create/${homeId}/address`);
}

export async function createLocation(formData) {
  const homeId = formData.get("homeId");
  const countryValue = formData.get("countryValue");
  const data = await prisma.home.update({
    where: {
      id: homeId,
    },
    data: {
      addedLoaction: true,
      country: countryValue,
    },
  });

  return redirect("/");
}

export async function addToFavorite(formData) {
  const homeId = formData.get("homeId");
  const userId = formData.get("userId");
  const pathName = formData.get("pathName");

  const data = await prisma.favorite.create({
    data: {
      homeId: homeId,
      userId: userId,
    },
  });
  revalidatePath(pathName);
}

export async function DeleteFromFavorite(formData) {
  const favoriteId = formData.get("favoriteId");
  const pathName = formData.get("pathName");
  const userId = formData.get("userId");

  const data = await prisma.favorite.delete({
    where: {
      id: favoriteId,
      userId: userId,
    },
  });

  revalidatePath(pathName);
}

export async function createReservation(formData) {
  const userId = formData.get("userId");
  const homeId = formData.get("homeId");
  const startDate = formData.get("startDate");
  const endDate = formData.get("endDate");

  const data = await prisma.reservation.create({
    data: {
      userId: userId,
      endDate: endDate,
      startDate: startDate,
      homeId: homeId,
    },
  });
  return redirect("/reservations");
}
