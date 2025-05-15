import React from "react";

type OgpCardProps = {
  href: string;
  children: React.ReactNode;
};

export const OgpCard: React.FC<OgpCardProps> = ({ href, children }) => {
  // ローカルに保存したOGP画像パスをURLエンコードで参照
  const encoded = encodeURIComponent(href);
  console.log(encoded);
  const imgSrc = `${encoded}.jpg`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="block border rounded-md overflow-hidden shadow hover:shadow-lg transition"
    >
      {/* <div className="flex"> */}
      <img
        src={`${href}`}
        alt={`OGP of ${href}`}
        className="w-48 h-32 object-cover"
      />
      {/* <div className="p-2 text-sm text-gray-700"> */}
      {children}
      {/* </div> */}
      {/* </div> */}
    </a>
  );
};
