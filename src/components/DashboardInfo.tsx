const DashboardInfo = ({
  heading,
  data,
  background,
}: {
  heading: string;
  data: number;
  background?: string;
}) => {
  return (
    <article
      style={{ backgroundColor: background }}
      className="w-2xs lg:w-1/3 shrink-0 h-36 lg:h-32 p-4 py-6 lg:p-6 lg:py-3 rounded-lg shadow-md space-y-2 lg:space-y-1"
    >
      <h3 className="text-lg font-semibold">{heading}</h3>

      <p className="text-4xl lg:text-5xl font-bold">{data}+</p>
    </article>
  );
};

export default DashboardInfo;
