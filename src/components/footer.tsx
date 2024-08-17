"use client";
import Discord from "@/components/icons/Discord";

export function WordwareFooter() {
  return (
    <footer className="p-4 bg-white w-full">
      <div className="mx-auto w-fit">
        <div className="max-w-xs">
          <a href="https://www.linkedin.com/in/tzb-aaron/" target="_blank">
            <p className="font-semibold uppercase text-center">Wordware hire me pls</p>
          </a>
        </div>
      </div>
      <div className="mx-auto w-fit mt-4">
        <a href="https://discord.gg/6Zm5FGC2kR">
          <Discord width="100" height="80" className="w-8 hover:fill-[#5865F2] fill-black" />
        </a>
      </div>
    </footer>
  );
}