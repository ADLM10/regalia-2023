import { supabase } from "@/utils/supabaseClient";
import Head from "next/head";

import data from "../public/data.json";

export default function Events({ events }: { events: any }): JSX.Element {
  return (
    <>
      <Head>
        <title>{"Events " + data["title"]}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <span>Events</span>
        <div>
          {events?.map((event: any) => (
            <div key={`event_${event.index}`}>
              <span>{event.name}</span>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps() {
  let { data } = await supabase.from("events").select("*");

  return {
    props: {
      events: data,
    },
  };
}
