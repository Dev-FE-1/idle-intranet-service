export const matchRoute = (path, routes) => {
  for (const routePath in routes) {
    const route = routes[routePath];
    const paramNames = [];
    const regexPath = routePath.replace(/:[^\s/]+/g, (match) => {
      paramNames.push(match.slice(1));
      return '([^\\/]+)';
    });

    const regex = new RegExp(`^${regexPath}$`);
    const match = path.match(regex);

    if (match) {
      return route;
    }
  }
  return null;
};
