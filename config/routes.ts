export default [
  {
    path: '/',
    component: '../layouts/BlankLayout',
    routes: [
      {
        path: '/login',
        component: '../layouts/UserLayout',
        routes: [
          {
            name: 'login',
            path: '/login/user',
            component: './User/login',
          },
          // {
          //   name: 'Đăng nhập',
          //   path: '/login/admin',
          //   component: './AdminLogin',
          // },
        ],
      },
      {
        path: '/',
        component: '../layouts/SecurityLayout',
        routes: [
          {
            path: '/',
            component: '../layouts/BasicLayout',
            // authority: ['admin', 'user'],
            routes: [
              {
                path: '/',
                name: "home",
                exac: true,
                component: './Health',
              },
              {
                path: '/company',
                name: "company",
                component: './Company',
                exact: true,
                authority: ['admin'],
              },
              {
                path: '/sign',
                name: "sign",
                component: './Sign',
                exact: true,
                authority: ['admin'],
              },
              {
                path: '/declaration',
                name: "declaration",
                component: './Declaration',
                exact: true,
                authority: ['admin'],
              },
              {
                component: './404',
              },
            ],
          },
          {
            component: './404',
          },
        ],
      },
    ],
  },
  {
    component: './404',
  },
];
