
import { createCategoryPage } from "@/app/action";
import CreationBottomBar from "@/app/components/CreationBottomBar";
import SelectedCategory from "@/app/components/SelectedCategory";
import React from "react";

const page = ({ params }) => {
  return (
    <>
      <div className="px-5 lg:px-0 lg:w-[70%] mx-auto">
        <h2 className="text-xl lg:text-3xl font-semibold tracking-tight transition-colors">
          Which of these best describe your Home?
        </h2>

        <form action={createCategoryPage}>
          <input type="hidden" name="homeId" value={params.id} />
          <SelectedCategory />
          <CreationBottomBar />
        </form>
      </div>
    </>
  );
};

export default page;
