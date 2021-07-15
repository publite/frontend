export const goTo = (
  href: string = window.location.href,
  nextTitle: string = document.title
) => window.history.pushState({}, nextTitle, href);
