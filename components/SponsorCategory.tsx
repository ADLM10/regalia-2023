import { Database } from '@/types/supabase';
import React from 'react'
import { SponsorItem } from "@/types/Sponsor_item";
import Image from 'next/image';

const SponsorCategory = (
    {
        item,
        index,
        sponsorArr
    } :
    {
        item: Database["public"]["Tables"]["sponsors"]["Row"],
        index: number
        sponsorArr: any
    }
) => {
  return (
    <div key={`${item.category}_${index}`} className="my-5">
        <div className="w-3/4 mx-auto flex flex-row gap-5 justify-center items-center">
           <div
            className="mx-2 bg-violet-600"
            style={{ width: "inherit", height: "2px" }}
          ></div>
          <h1 className="text-white text-center text-4xl">
            {item.category}
          </h1>
          <div
            className="mx-2 bg-violet-600"
            style={{ width: "inherit", height: "2px" }}
          ></div>
        </div>
        <div className="flex flex-wrap justify-center ">
          {sponsorArr.map((sponsor: SponsorItem, index: number) => {
            return (
              <div
                key={`sponsor_${index}`}
                className="my-3 flex  flex-col items-center justify-between rounded-xl  gap-5"
                style={{
                  boxShadow: "1px 2px 9px rgb(0,0,0,0.9)",
                  padding: "20px",
                }}
              >
                <Image
                  src={sponsor.sponsor_logo_url}
                  alt={sponsor.sponsor_name}
                  width={400}
                  height={"400"}
                  className="block"
                />
                <h1 className="text-white text-center">
                  {sponsor.sponsor_name}
                </h1>
              </div>
            );
          })}
        </div>
      </div>
  )
}

export default SponsorCategory