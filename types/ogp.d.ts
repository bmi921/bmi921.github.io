declare module "../../public/ogp-data.json" {
  export interface OGPData {
    url: string;
    title: string;
    description: string;
    image: string;
    domain: string;
  }
  const value: Record<string, OGPData>;
  export default value;
}

export interface OGPData {
  url: string;
  title: string;
  description: string;
  image: string;
  domain: string;
}
