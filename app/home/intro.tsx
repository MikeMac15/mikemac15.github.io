import GalaxyCanvas from "./galaxy";
import PixelWaterfall from "./PixelWaterfall";
import SolarSystem from "./solarSystem";


export default function Intro() {
  return (
    <div className="flex flex-col md:flex-row items-center min-h-screen p-10 bg-[#02040a] text-white">
      <div className="w-full md:w-3/5">
        <PixelWaterfall />
      </div>
      <div className="w-full md:w-2/5 pl-10">
        <h1 className="text-5xl font-black mb-4">Michael McIntosh</h1>
        <h2 className="text-2xl font-bold mb-6 text-blue-400 uppercase tracking-tighter">Software Engineer</h2>
        <p className="text-gray-400 text-lg max-w-md leading-relaxed">
          I'm a Creative Developer specializing in 3D web experiences and modern frontend architectures.
        </p>
      </div>
    </div>
  );
}