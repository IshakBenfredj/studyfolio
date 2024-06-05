// eslint-disable-next-line react/prop-types
export default function Title({ text }) {
  return (
    <div className="text-center uppercase mb-10">
      <h1 className="relative font-semibold text-5xl text-primary mb-2">
        {text}
      </h1>
      <span
        className="block h-[3px] w-7/12 mx-auto bg-primary relative before:w-1/12 before:h-2
       before:bg-primary before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2
        before:-translate-y-1/2"
      ></span>
    </div>
  );
}
