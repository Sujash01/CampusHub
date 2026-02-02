export default function CampusPulse({ items }) {
  return (
    <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6">
      <h2 className="text-xl font-bold text-green-400 mb-6">
        Campus Pulse
      </h2>

      <div className="space-y-4">
        {items.map((item, index) => (
          <PulseItem key={index} item={item} />
        ))}
      </div>
    </div>
  );
}

function PulseItem({ item }) {
  return (
    <div className="flex items-start gap-4 p-4 rounded-xl bg-black/40 hover:bg-black/60 transition">
      
      {/* Icon */}
      <div className="text-xl">
        {item.type === "announcement" && "📢"}
        {item.type === "event" && "🎉"}
        {item.type === "admin" && "🛠️"}
      </div>

      {/* Content */}
      <div className="flex-1">
        <p className="font-semibold text-white">
          {item.title}
        </p>
        <p className="text-sm text-gray-400">
          {item.description}
        </p>
      </div>

      {/* Time */}
      <div className="text-xs text-gray-500 whitespace-nowrap">
        {item.time}
      </div>
    </div>
  );
}
