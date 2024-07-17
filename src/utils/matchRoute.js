export const matchRoute = (path, routes) => {
  // 하나의 함수가 하는 일이 너무 많다.
  // 적절히 분리해서 함수를 만들어주는 것이 좋다.

  if (!routes) {
    return null;
  }

  let matchedRoute = null;

  // forEach 대신 reduce를 사용하면 코드가 더 간결해질 수 있습니다.
  Object.keys(routes).forEach((routePath) => {
    if (matchedRoute) return; // 이 코드의 용도가 무엇일까요?

    const route = routes[routePath];

    // 정규표현식을 생성하는 함수로 따로 분리할 수 있겠네요.
    const paramNames = [];
    const regexPath = routePath.replace(/:[^\s/]+/g, (match) => {
      paramNames.push(match.slice(1));
      return '([^\\/]+)';
    });

    const regex = new RegExp(`^${regexPath}$`);
    //

    const match = path.match(regex);
    if (match) {
      matchedRoute = route;
    }
  });

  return matchedRoute;
};

const generateRegex = (routePath, path) => {
  const paramNames = [];
  const regexPath = routePath.replace(/:[^\s/]+/g, (match) => {
    paramNames.push(match.slice(1));
    return '([^\\/]+)';
  });

  const regex = new RegExp(`^${regexPath}$`);
  const match = path.match(regex);

  return { paramNames, match };
};

export const matchRoute2 = (path, routes) => {
  if (!routes) {
    return null;
  }

  return Object.entries(routes).reduce((result, [routePath, route]) => {
    if (result) return result;

    const { paramNames, match } = generateRegex(routePath, path);

    if (match) {
      const params = paramNames.reduce((acc, cur, index) => {
        acc[cur] = match[index + 1];
        return acc;
      }, {});

      return { route, params };
    }

    return null;
  }, null);
};
