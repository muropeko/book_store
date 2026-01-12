import Link from "next/link";

interface InfoRowProps {
  label: string;
  value: string | number | React.ReactNode;
  type?: "text" | "link" | "component";
  linkHref?: string;
}

export const InfoRow = ({ label, value, type = "text", linkHref }: InfoRowProps) => {
  let content: React.ReactNode;

  switch (type) {
    case "component":
      content = value;
      break;
    case "link":
      content = linkHref ? (
        <Link href={linkHref} className="hover:text-red-600 transition duration-300">
          {value}
        </Link>
      ) : value;
      break;
    default:
      content = value;
  }

  return (
    <>
      <span className="font-semibold self-center">{label}</span>
      <span className="self-center">{content}</span>
    </>
  );
};
