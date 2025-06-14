import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
    index('routes/home.tsx'),
    route('set/:code', 'routes/set.tsx'),
] satisfies RouteConfig;
