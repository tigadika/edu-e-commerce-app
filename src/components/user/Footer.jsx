export default function Footer() {
  return (
    <>
      <div className="relative">
        <img
          src="/footer-banner.jpeg"
          alt=""
          className="h-[300px] object-cover w-full"
        />
        <div className="absolute top-0 bottom-0 right-0 left-0 flex justify-center items-center">
          <button className="bg-black text-white uppercase px-6 py-4 rounded-md text-xl">
            Browse all
          </button>
        </div>
      </div>
      <div className="py-10 bg-black grid grid-cols-3 px-40 text-white">
        <div className="flex flex-col items-start gap-2">
          <img src="/boxboxlogo.png" alt="" className="w-[200px] h-[200px]" />
          <p className="tracking-tight font-semibold">BoxBox Store</p>
          <p className="text-sm">Jl. Jalan di jalan no 1</p>
          <p className="text-sm">Jakarta 14420</p>
          <p className="text-sm">(021) 123456</p>
        </div>
        <div className="grid grid-cols-2">
          <ul className="space-y-3">
            <li>Home</li>
            <li>Iphone</li>
            <li>Ipad</li>
            <li>Mac</li>
            <li>Airpods</li>
          </ul>
          <ul className="space-y-3">
            <li>Our Store</li>
            <li>Career</li>
            <li>Legal</li>
            <li>Terms and Condition</li>
          </ul>
        </div>
        <div className="space-y-10">
          <p className="text-sm tracking-tight">We Accept Payment From:</p>
          <img src="/payment.webp" alt="" />
        </div>
      </div>
    </>
  );
}
