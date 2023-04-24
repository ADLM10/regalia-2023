import { SponsorItem } from "@/types/Sponsor_item";
import { Database } from "@/types/supabase";
import { getSponsorData } from "@/utils/getSponsorData";
import { categoryOrder } from "@/utils/sortSponsorsOrder";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import SponsorCategory from "./SponsorCategory";



const Sponsors = () => {
  const [sponsorData, setSponsorData] = useState<
    Database["public"]["Tables"]["sponsors"]["Row"][]
  >([]);

  const  compareSponsors = (a: Database["public"]["Tables"]["sponsors"]["Row"], b :Database["public"]["Tables"]["sponsors"]["Row"]) => {
    const categoryA = categoryOrder.indexOf(a.category!);
    const categoryB = categoryOrder.indexOf(b.category!);
    if (categoryA < categoryB) {
      return -1;
    }
    if (categoryA > categoryB) {
      return 1;
    }
    return 0;
  }
  

  useEffect(() => {
    getSponsorData("category, sponsor_arr")
      .then((data) => {
        const sponsorDataArr =
          data as Database["public"]["Tables"]["sponsors"]["Row"][];
        setSponsorData(sponsorDataArr.sort(compareSponsors));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="my-10" id="sponsors">
      {sponsorData &&
        sponsorData.map(
          (item: Database["public"]["Tables"]["sponsors"]["Row"], index) => {
            const sponsorArr = item.sponsor_arr as any;
            return (
              <SponsorCategory
                key={`${item.category}_${index}`}
                item={item}
                index={index}
                sponsorArr={sponsorArr}
              />
            );
          }
        )}
    </div>
  );
};

export default Sponsors;
