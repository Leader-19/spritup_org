// router/index.js
import { createRouter, createWebHistory } from "vue-router";
import { useAuth } from "../stores/auth.js"

const routes = [
  {
    path: "/",
    name: "home-page",
    component: () => import("../views/home/HomePage.vue"),
  },
  {
    path: "/home",
    name: "home-about-page",
    component: () => import("../views/home/HomeAboutPage.vue"),
  },
  {
    path: "/login",
    name: "login-page",
    component: () => import("../views/auth/LoginPage.vue"),
    meta: { requiresGuest: true },
  },
  {
    path: "/register",
    name: "register-page",
    component: () => import("../views/auth/RegisterPage.vue"),
    meta: { requiresGuest: true },
  },
  {
    path: "/dashboard",
    name: "dashboard-page",
    component: () => import("../views/dashboard/DashboardPage.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/subscription-plans",
    name: "subscription-plans",
    component: () => import("../views/SubscriptionPlans.vue"),
  },
  {
    path: "/documents",
    name: "documents-page",
    component: () => import("../views/documents/DocumentsPage.vue"),
  },
  {
    path: "/donate",
    name: "donate-page",
    component: () => import("../views/donates/DonatePage.vue"),
  },
  {
    path: "/contact",
    name: "contact-page",
    component: () => import("../views/contact/ContactPage.vue"),
  },
  {
    path: "/all-documents",
    name: "all-documents-page",
    component: () => import("../components/documents/TableComponents.vue"),
  },
  {
    path: "/law-documents",
    name: "law-documents-page",
    component: () => import("../components/documents/LawTableComponents.vue"),
  },
  {
    path: "/krom-documents",
    name: "krom-documents-page",
    component: () => import("../components/documents/KromTableComponents.vue"),
  },
  {
    path: "/brakeas-documents",
    name: "brakeas-documents-page",
    component: () => import("../components/documents/BrakeasTableComponents.vue"),
  },
  {
    path: "/constitution-documents",
    name: "constitution-documents-page",
    component: () => import("../components/documents/ConstitutionTableComponents.vue"),
  },
  {
    path: "/deyka-documents",
    name: "deyka-documents-page",
    component: () => import("../components/documents/DeykaTableComponents.vue"),
  },
  {
    path: "/niyeambratebatte-documents",
    name: "niyeambratebatte-documents-page",
    component: () => import("../components/documents/NiyeambratebatteTableComponents.vue"),
  },
  {
    path: "/preahreachokram-documents",
    name: "preahreachokram-documents-page",
    component: () => import("../components/documents/PreahreachokramTableComponents.vue"),
  },
  {
    path: "/royaldecree-documents",
    name: "royaldecree-documents-page",
    component: () => import("../components/documents/RoyaldecreeTableComponents.vue"),
  },
  {
    path: "/sub-decree-documents",
    name: "sub-decree-documents-page",
    component: () => import("../components/documents/Sub-decreeTableComponents.vue"),
  },
  {
    path: "/treatyconventionpact-documents",
    name: "treatyconventionpact-documents-page",
    component: () => import("../components/documents/TreatyconventionpactTableComponents.vue"),
  },
  {
    path: "/settings/profile",
    name: "settings-profile",
    component: () => import("../views/settings/SettingsProfile.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/settings/preferences",
    name: "settings-preferences",
    component: () => import("../views/settings/SettingsPreferences.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/settings/privacy",
    name: "settings-privacy",
    component: () => import("../views/settings/SettingsPrivacy.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/settings",
    name: "settings-page",
    component: () => import("../views/settings/SettingsPage.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/help/faq",
    name: "help-faq",
    component: () => import("../views/help/HelpFaq.vue"),
  },
  {
    path: "/help/support",
    name: "help-support",
    component: () => import("../views/help/HelpSupport.vue"),
  },
  {
    path: "/help/documentation",
    name: "help-documentation",
    component: () => import("../views/help/HelpDocumentation.vue"),
  },
  {
    path: "/help",
    name: "help-page",
    component: () => import("../views/help/HelpPage.vue"),
  },
  {
    path: "/admin/users",
    redirect: "/admin/admin-users",
  },
  {
    path: "/admin/admin-users",
    name: "admin-created-users",
    component: () => import("../views/admin/AdminUsers.vue"),
    meta: { requiresAuth: true, requiresAdmin: true, registrationSource: 'admin', pageTitle: 'Admin-Created Users' },
  },
  {
    path: "/admin/frontend-users",
    name: "frontend-registered-users",
    component: () => import("../views/admin/AdminUsers.vue"),
    meta: { requiresAuth: true, requiresAdmin: true, registrationSource: 'frontend', pageTitle: 'Frontend Registered Users' },
  },
  {
    path: "/admin/users/:id",
    name: "admin-user-detail",
    component: () => import("../views/admin/AdminUserDetail.vue"),
    meta: { requiresAuth: true, requiresAdmin: true },
  },
  {
    path: "/admin/users/:id/categories",
    name: "admin-user-categories",
    component: () => import("../views/admin/AdminUserCategories.vue"),
    meta: { requiresAuth: true, requiresAdmin: true },
  },
  {
    path: "/admin/plans",
    name: "admin-plans",
    component: () => import("../views/admin/AdminPlans.vue"),
    meta: { requiresAuth: true, requiresAdmin: true },
  },
  {
    path: "/admin/categories",
    name: "admin-categories",
    component: () => import("../views/admin/AdminCategories.vue"),
    meta: { requiresAuth: true, requiresAdmin: true },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: () => import("../views/NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const auth = useAuth()

router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    next({ name: 'login-page', query: { redirect: to.fullPath } })
  } else if (to.meta.requiresGuest && auth.isAuthenticated) {
    next({ name: 'home-page' })
  } else if (to.meta.requiresAdmin && !auth.isAdmin) {
    next({ name: 'home-page' })
  } else {
    next()
  }
})

export default router;
