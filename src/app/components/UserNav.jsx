import React from "react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import UserMenu from "./UserMenu";

const UserNav = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  return (
    <div>
        <UserMenu user={user}/>
    </div>
  );
};

export default UserNav;
