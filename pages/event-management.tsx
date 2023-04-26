import Head from "next/head";
import React from "react";
import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUserProfile } from "@/utils/UserFunctions";
import _, { update } from "lodash";
import { toast, ToastContainer } from "react-toastify";
import { newEntrySwc } from "@/utils/newEntrySwc";
import { validatePhoneNumber } from "@/utils/validatePhoneNumber";
import { validateEmail } from "@/utils/validateEmail";
import { updateRole } from "@/utils/updateRole";

const Swc = ({
  user,
  isLoading,
}: {
  user: User | null;
  isLoading: boolean;
}) => {
  const router = useRouter();

  const [role, setRole] = useState("participant");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [roleEmail, setRoleEmail] = useState("");

  const roles = [
    "participant",
    "event_manager",
    "superadmin",
    "convenor",
    "coordinator",
    "finance_manager",
    "gate_security",
  ];

  const handleNewSwcEntry = async () => {
    if (
      !validateEmail(email) ||
      !validatePhoneNumber(phone) ||
      name.length < 5
    ) {
      toast.error("Error! Check the details again");
      return;
    }
    await newEntrySwc({
      name: name,
      email: email,
      phone: phone,
    })
      .then(() => {
        toast.success("Added successfully");
        setName("");
        setPhone("");
        setEmail("");
      })
      .catch(() => {
        toast.error("Some error happened. Try Again!");
      });
  };

  const handleRoleUpdate = async (role: string) => {
    if (!validateEmail(roleEmail)) {
      toast.error("Error! Check the email again");
      return;
    }
    try {
      await updateRole({
        email: roleEmail,
        role: role,
      });
      toast.success("Success");
    } catch (e) {
      toast.error("Error! The email might not exist in the database");
    }
  };

  useEffect(() => {
    if (!isLoading) {
      if (user) {
        getUserProfile(user.id, "role,id,coordinating_event_id").then(
          (profile) => {
            if (
              profile[0].role !== "event_manager" &&
              profile[0].role !== "superadmin"
            )
              router.replace("/");
            else setRole(profile[0].role);
          }
        );
      } else {
        router.replace("/");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  return (
    <>
      <Head>
        <title>Event Management</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="pt-32 font-sans">
        <div className="flex flex-col gap-4 items-center px-4">
          {(role === "event_manager" || role === "superadmin") && (
            <>
              <label className="font-sans">Enter new entry in SWC Table</label>
              <form className="flex flex-col items-center w-full">
                <input
                  type="text"
                  className="bg-white p-2 rounded-2xl w-full"
                  placeholder="Enter Name"
                  required={true}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  type="email"
                  className="bg-white p-2 rounded-2xl my-2 w-full"
                  placeholder="Enter Email"
                  required={true}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="tel"
                  className="bg-white p-2 rounded-2xl w-full"
                  placeholder="Enter Phone"
                  required={true}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <button
                  className="bg-green-700 text-white p-2 rounded-2xl w-64 my-2 transition duration-300 ease-in-out"
                  onClick={async (e) => {
                    e.preventDefault();
                    await handleNewSwcEntry();
                  }}
                >
                  Submit
                </button>
              </form>
            </>
          )}
          {role === "superadmin" && (
            <>
              <label className="mt-5">Enter Email to update role</label>
              <input
                type="email"
                className="bg-white p-2 rounded-2xl w-full my-2"
                placeholder="Enter Email"
                value={roleEmail}
                onChange={(e) => setRoleEmail(e.target.value)}
              />
              <select
                className="bg-white p-2 rounded-2xl w-full"
                onChange={(e) => handleRoleUpdate(e.target.value)}
              >
                {roles.map((role, index) => {
                  return (
                    <option key={`${role}__${index}`} value={role}>
                      {role}
                    </option>
                  );
                })}
              </select>
            </>
          )}
        </div>
        <ToastContainer />
      </main>
    </>
  );
};

export default Swc;
