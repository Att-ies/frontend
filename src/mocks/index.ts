if (typeof window === 'undefined') {
  const { server } = require('./server');
  server.listen({
    onUnhandledRequest(req) {
      console.error(
        'Found an unhandled %s request to %s',
        req.method,
        req.url.href,
      );
    },
  });
} else {
  const { worker } = require('./browser');
  worker.start();
}
export {};
