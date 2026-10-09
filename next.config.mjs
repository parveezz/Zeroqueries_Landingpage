/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  allowedDevOrigins: [
    '192.168.1.7',
    '192.168.1.7:3000',
    '192.168.29.240',
    '192.168.1.11',
    'localhost',
    '127.0.0.1',
  ],
  reactCompiler: true,
  async redirects() {
    return [
      {
        source: '/sub-processors',
        destination: '/sub-processor',
        permanent: true,
      },
      {
        source: '/terms',
        destination: '/tos',
        permanent: true,
      },
      {
        source: '/security',
        destination: '/support',
        permanent: true,
      },
      {
        source: '/integrations/slack',
        destination: '/slack',
        permanent: true,
      },
      {
        source: '/platform/integrations/slack',
        destination: '/slack',
        permanent: true,
      },
      {
        source: '/integrations/whatsapp',
        destination: '/whatsapp',
        permanent: true,
      },
      {
        source: '/platform/integrations/whatsapp',
        destination: '/whatsapp',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
