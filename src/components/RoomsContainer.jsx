import RoomCard from "./RoomCard";

export default function RoomsContainer({ rooms = [], onDelete, onEdit }) {
  return (
    <section
      className="w-full bg-white px-[20px] py-[20px] mt-0 flex flex-col"
      style={{
        boxShadow: "0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      }}
    >

      {/* ======================================================
          SCROLLABLE LIST WRAPPER
          Keeps layout stable while allowing long lists
        ====================================================== */}
      <div className="flex-1 overflow-y-auto pr-[10px]">


        {/* ======================================================
            EMPTY STATE
            Render fallback when no rooms are available
        ====================================================== */}
        {rooms.length === 0 ? (
          <p className="text-gray-400 text-center py-10">
            Tidak ada data ruangan.
          </p>
        ) : (
          
          
          /* ======================================================
             ROOMS GRID
             Responsive layout: 1 / 2 / 4 columns
             Ensures spacing consistency across cards
          ====================================================== */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-[20px] gap-y-[20px] pb-[20px]">
            {rooms.map((room) => (
              <RoomCard
                key={room.id}
                id={room.id}
                name={room.name}
                capacity={room.capacity}
                pricePerHour={room.pricePerHour}
                type={room.type}
                image={room.image}
                onDelete={onDelete}
                onEdit={() => onEdit(room)}  
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
