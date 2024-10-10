export default function RoundedSectionEnding() {
  return (
    <div
      id="gray"
      style={{
        zIndex: -1,
        overflow: "hidden",
        height: "120px",
        backgroundColor: "#FBFCF8",
      }}>
      <div
        id="red"
        style={{
          width: "150%",
          height: "120%",
          backgroundColor: "#E8EDE8",
          borderRadius: "100%",
          bottom: "40%",
          left: "-25%",
          right: 0,
          position: "relative",
        }}></div>
    </div>
  );
}
