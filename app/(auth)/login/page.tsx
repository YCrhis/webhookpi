"use client";

import { GetCall } from "@/helpers/GetCall";
import { onChangeHandler } from "@/helpers/handlers";
import { PostCall } from "@/helpers/PostCall";
import { LoginI } from "@/types/Auth";
import { FormEvent, useState } from "react";

const defaultForm: LoginI = {
  password: "",
  email: "",
};

export default function LoginPage() {
  const [loginForm, setLoginForm] = useState<LoginI>(defaultForm);

  const handleSend = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = await PostCall({url: "/auth/login", data: loginForm});
    console.log(data)
  };

  return (
    <div>
      <form onSubmit={handleSend} className="flex flex-col gap-3">
        <input
          type="email"
          onChange={(e) =>
            onChangeHandler({ e: e, setState: setLoginForm, state: loginForm })
          }
          name="email"
          className="bg-white"
        />
        <input
          type="text"
          onChange={(e) =>
            onChangeHandler({ e: e, setState: setLoginForm, state: loginForm })
          }
          className="bg-white"
          name="password"
        />
        <button>Login</button>
      </form>
    </div>
  );
}
