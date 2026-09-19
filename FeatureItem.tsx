import { ReactNode } from "react";

interface Props {
  icon: ReactNode;
  title: string;
  subtitle: string;
}

export default function FeatureItem({
  icon,
  title,
  subtitle,
}: Props) {
  return (
    <div className="flex gap-4 py-5 border-b border-gray-200">
      <div className="text-black">{icon}</div>

      <div>
        <h3 className="font-semibold text-[16px] text-[#222222]">
          {title}
        </h3>

        <p className="text-gray-500 text-sm mt-1">
          {subtitle}
        </p>
      </div>
    </div>
  );
}