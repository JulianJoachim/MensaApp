export default function LocalServiceWorkerRegister() {
  const swPath = `/serviceworker.js`;
  if ('serviceWorker' in navigator && process.env.NODE_ENV !== 'production') {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register(swPath, {
    scope: '/' }).then(registration => {
        console.log('Service worker registered');
      });
    });
  }
}

