import React from "react";

/**
 * Returns Spark icon only as SVG.
 *
 * @param props SVG props (width, height, etc.)
 * @returns SVG
 */
function SparkIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      id="sparkicon"
      data-name="Spark icon"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 207.31 114.03"
      {...props}
    >
      <rect id="spark" y="93.34" width="53.21" height="20.69" fill="#188af0" />
      <rect
        id="spark-2"
        data-name="spark"
        x="37.55"
        y="21.75"
        width="20.69"
        height="53.21"
        transform="translate(-20.16 48.03) rotate(-45)"
        fill="#00b7d8"
      />
      <rect
        id="spark-3"
        data-name="spark"
        x="93.28"
        width="20.69"
        height="53.21"
        fill="#00d4b0"
      />
      <rect
        id="spark-4"
        data-name="spark"
        x="132.35"
        y="38.45"
        width="53.21"
        height="20.69"
        transform="translate(12.05 126.69) rotate(-45)"
        fill="#00e54b"
      />
      <rect
        id="spark-5"
        data-name="spark"
        x="154.1"
        y="93.28"
        width="53.21"
        height="20.69"
        fill="#00f800"
      />
    </svg>
  );
}

export default SparkIcon;
