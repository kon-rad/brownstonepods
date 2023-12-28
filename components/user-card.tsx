import { IoStar } from "react-icons/io5";

const UserCard = (props: any) => {
  return (
    <div
      key={`user_${props.key}`}
      className="m-2 flex w-full flex-row rounded-2xl border-white bg-surface-mixed-200 p-2"
    >
      <div className="p-2">
        <img src={props?.image} className="h-[20px] w-[20px] rounded-full" />
      </div>
      <div className="flex flex-row items-center justify-center px-2">
        <h3 className="mb-1 mr-4 text-xl text-white">{props?.name}</h3>
        <p className="text-md mr-1 text-white">{props?.total_stars}</p>
        <IoStar className="text-white" />
      </div>
    </div>
  );
};

export default UserCard;
