"use client";

import { onChangeHandler } from "@/helpers/handlers";
import { PostCall } from "@/helpers/PostCall";
import { UserRegisterI } from "@/types/Auth";
import { FormEvent, useState } from "react";

const defaultForm: UserRegisterI = {
  email: "",
  name: "",
  password: "",
};
export default function RegisterPage() {
  const [userForm, setUserForm] = useState<UserRegisterI>(defaultForm);

  const handleCreateUser = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await PostCall({url: '/auth/register', data: userForm});
    console.log(response)
    console.log("passamos");
  };

  return (
    <section>
      <form onSubmit={handleCreateUser} className="flex flex-col gap-3">
        <input
          type="text"
          onChange={(e) =>
            onChangeHandler({ e: e, setState: setUserForm, state: userForm })
          }
          className="bg-white"
          name="name"
        />

        <input
          type="email"
          onChange={(e) =>
            onChangeHandler({ e: e, setState: setUserForm, state: userForm })
          }
          name="email"
          className="bg-white"
        />

        <input
          type="text"
          onChange={(e) =>
            onChangeHandler({ e: e, setState: setUserForm, state: userForm })
          }
          name="password"
          className="bg-white"
        />
        <button type="submit">Create User</button>
      </form>
    </section>
  );
}
