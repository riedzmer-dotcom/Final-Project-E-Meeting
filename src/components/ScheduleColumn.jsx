export default function ScheduleColumn({ title }) {
  return (
    <div
      className="w-[400px] h-full border border-gray-300 
                 flex flex-col items-center justify-center"
    >
      <h2 className="text-gray-600 font-normal text-sm leading-[20px] 
      tracking-normal text-right font-sans">
        {title}
      </h2>
    </div>
  );
}
