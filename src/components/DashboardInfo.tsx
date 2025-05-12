const DashboardInfo = ({
  heading,
  data,
}: {
  heading: string;
  data: number;
}) => {
  return (
    <article className="min-w-84 lg:min-w-72 max-w-screen-sm h-36 lg:h-32 p-4 py-6 lg:p-6 lg:py-3 rounded-lg bg-dark-100 border border-dark-100 space-y-2 lg:space-y-1">
      <h3 className="text-base text-dark-300">{heading}</h3>

      <p className="text-4xl lg:text-5xl text-dark-300 font-semibold">
        {data}+
      </p>
    </article>
  );
};

export default DashboardInfo;
