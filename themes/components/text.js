const Text = {
  baseStyle: {
    color: "gray.500",
  },
  // Two sizes: sm and md
  sizes: {
    lg: {
      fontSize: "lg",
    },
    xl: {
      fontSize: "xl",
    },
    "2xl": {
      fontSize: "2xl",
    },
  },
  variants: {
    bold: {
      color: "black",
      fontWeight: 600,
    },
    badge: {
      textTransform: "uppercase",
      color: "blue.400",
      fontWeight: 600,
      fontSize: "sm",
      bg: "blue.50",
      p: 2,
      px: 3,
      rounded: "md",
    },
  },
};

export default Text;
