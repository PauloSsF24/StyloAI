interface Look {
  id: string;
  imageUrl: string;
}

interface Props {
  looks: Look[];
}

export default function LookCarousel({ looks }: Props) {
  return (
    <div className="flex gap-8 overflow-x-auto px-6">
      {looks.map((look) => (
        <div
          key={look.id}
          className="min-w-[250px] h-[320px] bg-white rounded-2xl shadow-lg"
        >
          <img
            src={look.imageUrl}
            alt=""
            className="w-full h-full object-cover rounded-2xl"
          />
        </div>
      ))}
    </div>
  );
}