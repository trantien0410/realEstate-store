"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();

  return (
    <Image
      onClick={() => router.push("/")}
      className="hidden md:block cursor-pointer"
      src="/images/Logo10.png"
      height={64} // Adjusted height to fit navbar
      width={64} // Adjusted width to maintain aspect ratio or to preference
      style={{
        width: "auto", // Adjust width to 'auto' to maintain aspect ratio
        height: "100%", // Adjust height to '100%' to fill navbar height
      }}
      alt="Logo"
      priority
    />
  );
};

export default Logo;
