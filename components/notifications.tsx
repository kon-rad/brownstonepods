"use client";

export default function Notifications() {
  const unread = [
    {
      text: "Welcome to Brownstone pods. Here is all your onboarding info.",
    },
    {
      text: "Your application has been received. You will hear back from us within a week.",
    },
  ];

  const read = [
    {
      text: "You have created your account. Next step is creating your user profile.",
    },
    {
      text: "Welcome to the Brownstone Pods platform. Excited to see you here!",
    },
  ];
  return (
    <div className="flex w-full">
      <div className="dark:!bg-light-brown w-full rounded-xl p-8">
        <div className="text-dark-text text-2xl">Unread</div>
        <div className="p4 flex flex-col">
          {unread.map((item: any, i: number) => {
            return (
              <div
                key={`unread_item_${i}`}
                className="text-md flex w-full pb-4"
              >
                {item.text}
              </div>
            );
          })}
        </div>
        <div className="text-brand-dark-text text-2xl">Read</div>

        <div className="p4 flex flex-col">
          {unread.map((item: any, i: number) => {
            return (
              <div key={`read_item_${i}`} className="text-md flex w-full pb-4">
                {item.text}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
