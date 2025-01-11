import { InstagramIcon, TwitterIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Branding() {
  return (
    <div className="w-full text-center text-xs md:text-sm flex items-center justify-center gap-1">
      Designed by{" "}
      <Link href={"https://mohammadfaizan.in"} className="text-green-500">
        Mohammad Faizan
      </Link>
    </div>
  );
}
