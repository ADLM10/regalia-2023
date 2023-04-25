import data from "../public/data.json";
import Head from "next/head";
import React from "react";
import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUserProfile } from "@/utils/UserFunctions";

const Scanner = ({
  user,
  isLoading,
}: {
  user: User | null;
  isLoading: boolean;
}) => {
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      if (user) {
        getUserProfile(user.id, "role,id,coordinating_event_id").then(
          (profile) => {
            if (profile[0].role === "participant") router.replace("/");
          }
        );
      } else {
        router.replace("/");
      }
    }
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  return (
    <>
      <Head>
        <title>{data["title"]}</title>
        <meta name="description" content="Cultural Fest of RCCIIT, Kolkata" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-gradient-to-tl from-fuchsia-950 to-black pt-32"></main>
    </>
  );
};

export default Scanner;
