export const register = () => {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () =>
      navigator.serviceWorker
        .register("/sw.js", { scope: "" })
        .then((registration) => {
          if (process.env.NODE_ENV === "development")
            console.log(
              "Successfully registered ServiceWorker with scope:",
              registration.scope
            );
        })
        .catch((err) => console.error(err))
    );
  }
};
