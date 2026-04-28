"use client";

import { motion } from "motion/react";
import { PhoneMock, BrowserMock } from "@/components/Mockups";

type Pair = {
  label: string;
  desktop: string;
  mobile: string;
};

export default function ResponsivePairs({
  pairs,
  bg,
  fg,
  accent,
}: {
  pairs: Pair[];
  bg: string;
  fg: string;
  accent: string;
}) {
  return (
    <div className="space-y-10 md:space-y-14">
      {pairs.map((pair, i) => (
        <motion.div
          key={pair.label}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{
            duration: 0.6,
            delay: i * 0.08,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="grid grid-cols-1 md:grid-cols-[1fr_180px] lg:grid-cols-[1fr_220px] gap-6 md:gap-8 items-center"
        >
          <BrowserMock
            bg={bg}
            fg={fg}
            accent={accent}
            label={`${pair.label} — Desktop`}
            image={pair.desktop}
            aspect="3 / 2"
            themed
          />
          <PhoneMock
            bg={bg}
            fg={fg}
            accent={accent}
            label={`${pair.label} — Mobile`}
            image={pair.mobile}
            themed
          />
        </motion.div>
      ))}
    </div>
  );
}
