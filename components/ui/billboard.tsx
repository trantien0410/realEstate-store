import { Billboard as BillboardType } from "@/types";

interface BillboardProps {
  data: BillboardType;
}

const Billboard: React.FC<BillboardProps> = ({ data }) => {
  return (
    <div className="pt-10 rounded-xl overflow-hidden">
      {data.imageUrl ? (
        <div
          style={{ backgroundImage: `url(${data.imageUrl})` }}
          className="rounded-xl relative aspect-square md:aspect-[2.4/1] overflow-hidden bg-cover"
        >
          <div className="h-full w-full flex flex-col justify-center items-center text-center gap-y-8">
            <div className="font-bold text-3xl sm:text-5xl lg:text-6xl sm:max-w-xl max-w-xs">
              {data.label}
            </div>
          </div>
        </div>
      ) : data.videoUrl ? (
        <video
          src={data.videoUrl}
          className="rounded-xl relative aspect-square md:aspect-[2.4/1] overflow-hidden w-full h-full"
          autoPlay
          loop
          muted
          style={{ objectFit: "cover" }}
        ></video>
      ) : null}
    </div>
  );
};

export default Billboard;
