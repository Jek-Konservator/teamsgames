module.exports = {
  experimental: {
    // ssr and displayName are configured by default
    styledComponents: true,
    outputStandalone: true,
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    backendUrl: process.env.BACKEND_URL,
  },
};
