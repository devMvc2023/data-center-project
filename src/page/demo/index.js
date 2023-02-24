import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { useCookies } from "react-cookie";

export default function Demo() {
  const [cookies, setCookie] = useCookies();

  const cok = async () => {
    const cookies = new Cookies();

    var inFifteenMinutes = new Date(new Date().getTime() + 1 * 60 * 1000);

    cookies.set("myCat", "Pacma2222222222222222222sn", {
      path: "/",
      expires: inFifteenMinutes,
    });
    console.log(cookies.get("myCat")); // Pacman

    // const cookies = new Cookies();
    // cookies.set(
    //   "cookieName",
    //   { key: 2222222222222 },
    //   { path: "/", expires: new Date(Date.now() + 20000) }
    // );
    // console.log(cookies.get("cookieName"));
  };

  return <button onClick={cok}>aaa</button>;
}
