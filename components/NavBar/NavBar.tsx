import Image from "next/image";

export default async function NavBar() {
  return (
    <div className="sticky top-0  bg-foreground w-full h-32">
      <div className="flex justify-center  items-center h-full max-w-8xl mx-auto px-4 ">
        <div className=" relative h-full py-4 ">
          <Image
            src={"/cropped-Logo-ISCIO-1 (1).png"}
            alt=""
            width={0}
            height={0}
            unoptimized
            className="h-full w-auto"
          />
        </div>
      </div>
    </div>
  );
}
