const TAG_COLORS = {
  Marketing: { bg: "#FFF6E6", text: "#FFB836" },
  Design: { bg: "#E5F9F3", text: "#56CDAD" },
  Business: { bg: "#FFF1F0", text: "#FF6550" },
  Technology: { bg: "#EBF5FF", text: "#26A4FF" },
  Finance: { bg: "#EBEBFF", text: "#4640DE" },
  Engineering: { bg: "#F8F0FF", text: "#7A0ECC" },
  Sales: { bg: "#FFF6E6", text: "#FF9500" },
  "Human Resource": { bg: "#FFEEF0", text: "#E05151" },
};

const TagBadge = ({ tag, small = false }) => {
  const colors = TAG_COLORS[tag] || { bg: "#F0F0FF", text: "#4640DE" };
  return (
    <span
      className={`inline-flex items-center rounded font-semibold ${
        small ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-sm"
      }`}
      style={{ backgroundColor: colors.bg, color: colors.text }}
    >
      {tag}
    </span>
  );
};

export default TagBadge;
