"use client";

import { motion } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";
import type { PropsWithChildren } from "react";

type Props = PropsWithChildren<
  Omit<HTMLMotionProps<"button">, "children"> & {
    variant?: "primary" | "ghost";
    wide?: boolean;
  }
>;

export default function MotionButton({
  children,
  className,
  variant = "ghost",
  wide,
  ...rest
}: Props) {
  const classes = [
    "btn",
    variant === "primary" ? "btnPrimary" : "btnGhost",
    wide ? "btnWide" : "",
    className ?? ""
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <motion.button
      whileHover={{ y: -1, filter: "brightness(1.02)" }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 420, damping: 30 }}
      className={classes}
      {...rest}
    >
      {children}
    </motion.button>
  );
}


