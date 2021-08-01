export const connected = new Promise<void>((resolve) => {
  if (navigator.serviceWorker.controller) return resolve();
  navigator.serviceWorker.addEventListener("controllerchange", (e) =>
    resolve()
  );
});
