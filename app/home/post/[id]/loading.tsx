// a bunch of loading divs

export default function Loading() {
  return (
    <>
      <div className="bg-surface-mixed-200 h-10 w-48 animate-pulse rounded-md dark:bg-stone-800" />
      <div className="bg-surface-mixed-200 h-96 w-full max-w-screen-md animate-pulse rounded-md dark:bg-stone-800" />
    </>
  );
}
