import { ReactNode } from "react";
import Form from "@/components/form";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { editUser } from "@/lib/actions";
import { getUser } from "@/lib/database/user";

export default async function SettingsPage() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }
  const userData = await getUser(session.user.id);
  if (!userData) {
    redirect("/login");
  }
  console.log("userData: ", userData);

  return (
    <div className="flex max-w-screen-xl flex-col space-y-12 p-8">
      <div className="flex flex-col space-y-6">
        <h1 className="font-cal text-3xl font-bold dark:text-white">
          Settings
        </h1>
        <Form
          title="Name"
          description="Your name on this app."
          helpText="Please use 32 characters maximum."
          inputAttrs={{
            name: "name",
            type: "text",
            defaultValue: userData.name!,
            placeholder: "Your name",
            maxLength: 32,
          }}
          handleSubmit={editUser}
        />
        <Form
          title="Email"
          description="Your email on this app."
          helpText="Please enter a valid email."
          inputAttrs={{
            name: "email",
            type: "email",
            defaultValue: session.user.email!,
            placeholder: "your email",
          }}
          handleSubmit={editUser}
        />
        <Form
          title="bio"
          description="Tell us something about yourself, who are you?"
          helpText="Please enter a short bio on yourself"
          inputAttrs={{
            name: "bio",
            type: "text",
            defaultValue: userData.bio || "",
            placeholder: "your bio",
          }}
          handleSubmit={editUser}
        />
        <div className="m-4 flex"></div>
      </div>
    </div>
  );
}
