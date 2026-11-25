import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#070709",
          color: "#F5F5F5",
          padding: "64px",
          border: "2px solid rgba(255, 92, 0, 0.35)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "20px",
            letterSpacing: "0.2em",
            color: "#92929C",
          }}
        >
          <span>AMDAVADHACKS // 2027</span>
          <span style={{ color: "#FF5C00" }}>AHMEDABAD, GUJARAT</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: "84px",
              fontWeight: 700,
              lineHeight: 0.95,
              letterSpacing: "-0.03em",
            }}
          >
            ENGINEER
          </div>
          <div
            style={{
              fontSize: "84px",
              fontWeight: 700,
              lineHeight: 0.95,
              letterSpacing: "-0.03em",
              color: "#FF5C00",
            }}
          >
            THE IMPOSSIBLE.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "22px",
            color: "#92929C",
            borderTop: "1px solid rgba(245,245,245,0.14)",
            paddingTop: "24px",
          }}
        >
          <span>THE CITY BUILDS. THE FUTURE FOLLOWS.</span>
          <span style={{ color: "#FFB36B" }}>MARCH–MAY 2027 (TENTATIVE)</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
