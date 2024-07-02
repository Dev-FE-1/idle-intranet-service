export const matchRoute = (path, routes) => {
  let matchedRoute = null;

  Object.keys(routes).forEach((routePath) => {
    if (matchedRoute) return;

    const route = routes[routePath];
    const paramNames = [];
    const regexPath = routePath.replace(/:[^\s/]+/g, (match) => {
      paramNames.push(match.slice(1));
      return '([^\\/]+)';
    });

    const regex = new RegExp(`^${regexPath}$`);
    const match = path.match(regex);

    if (match) {
      matchedRoute = route;
    }
  });

  return matchedRoute;
};
