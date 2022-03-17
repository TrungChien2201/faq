export default function UpgradeLink({ openUpgrade, text = "", textTwo = "" }) {
  return (
    <div style={{ color: "#999", fontStyle: "italic", fontSize: "13px" }}>
      {text}, &nbsp;
      <span
        onClick={openUpgrade}
        style={{
          textDecoration: "underline",
          color: "var(--p-interactive)",
          cursor: "pointer",
          fontWeight: "600",
        }}
      >
        Upgrade to Pro!
      </span>
      &nbsp;{textTwo}
    </div>
  );
}
