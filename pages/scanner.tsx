import data from "../public/data.json";
import Head from "next/head";
import React from "react";
import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUserProfile } from "@/utils/UserFunctions";
import { useZxing } from "react-zxing";

const Scanner = ({
  user,
  isLoading,
}: {
  user: User | null;
  isLoading: boolean;
}) => {
  const router = useRouter();
  const [result, setResult] = useState("");

  const [loading, setLoading] = useState(true);

  const { ref } = useZxing({
    onResult(result) {
      setResult(result.getText());
    },
  });

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
        <title>Scanner</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-gradient-to-tl from-fuchsia-950 to-black pt-32">
        <div className="w-100 flex flex-col gap-4 items-center">
          <video ref={ref} />
          <p>
            <span>Last result:</span>
            <span className="text-white">{result}</span>
          </p>
        </div>
      </main>
    </>
  );
};

export default Scanner;
