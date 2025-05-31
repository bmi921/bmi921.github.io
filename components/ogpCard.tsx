import React from "react";
import { OGPData } from "../types/ogp";
import crypto from "crypto";
import ogpData from "../public/ogp-data.json";

function generateHashFilename(url: string): string {
  // 1. URLをハッシュ化（MD5やSHA-1など）
  const hash = crypto.createHash("md5").update(url).digest("hex");
  // 2. 拡張子を追加
  return `${hash}.jpg`;
}

type OgpCardProps = {
  href: string;
};

export const OgpCard: React.FC<OgpCardProps> = ({ href }) => {
  const data = (ogpData as Record<string, OGPData>)[href] || {
    title: href,
    // image: "/99cd2175108d157588c04758296d1cfc.jpg",
    domain: new URL(href).hostname,
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="ogp-card block border rounded-lg overflow-hidden shadow hover:shadow-lg transition"
    >
      <div className="flex">
        <div className="w-48">
          {/* <img
            src={data.image}
            alt={data.title}
            className="object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/default-ogp.jpg";
            }}
          /> */}
          <img
            src="/default-ogp.jpg"
            alt={data.title}
            className="object-cover"
          />
        </div>
        <div className="p-2 flex-1">
          <h3 className="font-medium text-gray-900 dark:text-gray-100">
            {data.title}
          </h3>
          {data.description && (
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
              {data.description}
            </p>
          )}
          <div className="mt-2 text-xs text-gray-500">{data.domain}</div>
        </div>
      </div>
    </a>
  );
};
