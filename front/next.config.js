module.exports = () => {
  const rewrites = () => {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:3005/:path*",
      },
    ];
  };
  return {
    rewrites,
  };
};