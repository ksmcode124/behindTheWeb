import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config) => { //gatau ini dari GPT kmrn
    config.watchOptions = {
      ignored: [
        '**/node_modules/**',
        '**/.git/**',
        'C:/pagefile.sys',
        'C:/swapfile.sys',
        'C:/hiberfil.sys',
        'C:/DumpStack.log.tmp'
      ],
    };
    return config;
  },
  images: {
    remotePatterns: [new URL('https://ef40sz0w6l.ufs.sh/f/**')], //agar bisa load gambar dari github 
  },
};

export default nextConfig;
