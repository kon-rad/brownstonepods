'use client';

import { approveApplication } from '@/lib/database/applications';

const ApplicationItem = ({ name, email, id, userId, user, siteId }: any) => {
  const handleApprove = async (id: string) => {
    console.log('approve app with id: ', id);
    const res = await approveApplication(id, siteId, userId)
    console.log('res: ', res);
  }

  return (
    <div
      key={`user_${id}`}
      className="flex w-full flex-row rounded-2xl bg-surface-mixed-200 p-2"
    >
      <div className="p-2">
        <img
          src={user.image}
          className="h-[20px] w-[20px] rounded-full"
        />
      </div>
      <div className="px-2">
        <h3 className="mb-1 text-xl  text-white">{name}</h3>
        {/* <p className="text-xl  text-whitemb-4">{createdAt}</p> */}
        <p className="text-md mb-1 text-white">{email}</p>
        <button className="rounded-lg border border-black bg-surface-mixed-300 px-4 py-1.5 text-sm font-medium text-white transition-all hover:bg-white hover:text-black active:bg-surface-mixed-200 dark:border-stone-700 dark:hover:border-stone-200 dark:hover:bg-black dark:hover:text-white dark:active:bg-stone-800" onClick={() => handleApprove(id)}>Approve Application</button>
      </div>
    </div>
  );
}

export default ApplicationItem;