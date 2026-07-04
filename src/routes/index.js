// router/index.js
import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../views/home/HomePage.vue";
import DashboardPage from "../views/dashboard/DashboardPage.vue";
import DocumentsPage from "../views/documents/DocumentsPage.vue";
import DonatePage from "../views/donates/DonatePage.vue";
import ContactPage from "../views/contact/ContactPage.vue";
import SettingsProfile from "../views/settings/SettingsProfile.vue";
import SettingsPreferences from "../views/settings/SettingsPreferences.vue";
import SettingsPrivacy from "../views/settings/SettingsPrivacy.vue";
import HelpFaq from "../views/help/HelpFaq.vue";
import HelpSupport from "../views/help/HelpSupport.vue";
import HelpDocumentation from "../views/help/HelpDocumentation.vue";
import TableComponents from "../components/documents/TableComponents.vue";
import LawTableComponents from "../components/documents/LawTableComponents.vue";
import KromTableComponents from "../components/documents/KromTableComponents.vue";
import BrakeasTableComponents from "../components/documents/BrakeasTableComponents.vue";
import ConstitutionTableComponents from "../components/documents/ConstitutionTableComponents.vue";
import DeykaTableComponents from "../components/documents/DeykaTableComponents.vue";
import NiyeambratebatteTableComponents from "../components/documents/NiyeambratebatteTableComponents.vue";
import PreahreachokramTableComponents from "../components/documents/PreahreachokramTableComponents.vue";
import RoyaldecreeTableComponents from "../components/documents/RoyaldecreeTableComponents.vue";
import SubDecreeTableComponents from "../components/documents/Sub-decreeTableComponents.vue";
import TreatyconventionpactTableComponents from "../components/documents/TreatyconventionpactTableComponents.vue";

const routes = [
  {
    path: "/",
    name: "home-page",
    component: HomePage,
  },
  {
    path: "/dashboard",
    name: "dashboard-page",
    component: DashboardPage,
  },
  {
    path: "/documents",
    name: "documents-page",
    component: DocumentsPage,
  },
  {
    path: "/donate",
    name: "donate-page",
    component: DonatePage,
  },
  {
    path: "/contact",
    name: "contact-page",
    component: ContactPage,
  },
  {
    path: "/all-documents",
    name: "all-documents-page",
    component: TableComponents,
  },
  {
    path: "/law-documents",
    name: "law-documents-page",
    component: LawTableComponents,
  },
  {
    path: "/krom-documents",
    name: "krom-documents-page",
    component: KromTableComponents,
  },
  {
    path: "/brakeas-documents",
    name: "brakeas-documents-page",
    component: BrakeasTableComponents,
  },
  {
    path: "/constitution-documents",
    name: "constitution-documents-page",
    component: ConstitutionTableComponents,
  },
  {
    path: "/deyka-documents",
    name: "deyka-documents-page",
    component: DeykaTableComponents,
  },
  {
    path: "/niyeambratebatte-documents",
    name: "niyeambratebatte-documents-page",
    component: NiyeambratebatteTableComponents,
  },
  {
    path: "/preahreachokram-documents",
    name: "preahreachokram-documents-page",
    component: PreahreachokramTableComponents,
  },
  {
    path: "/royaldecree-documents",
    name: "royaldecree-documents-page",
    component: RoyaldecreeTableComponents,
  },
  {
    path: "/sub-decree-documents",
    name: "sub-decree-documents-page",
    component: SubDecreeTableComponents,
  },
  {
    path: "/treatyconventionpact-documents",
    name: "treatyconventionpact-documents-page",
    component: TreatyconventionpactTableComponents,
  },
  {
    path: "/settings/profile",
    name: "settings-profile",
    component: SettingsProfile,
  },
  {
    path: "/settings/preferences",
    name: "settings-preferences",
    component: SettingsPreferences,
  },
  {
    path: "/settings/privacy",
    name: "settings-privacy",
    component: SettingsPrivacy,
  },
  {
    path: "/help/faq",
    name: "help-faq",
    component: HelpFaq,
  },
  {
    path: "/help/support",
    name: "help-support",
    component: HelpSupport,
  },
  {
    path: "/help/documentation",
    name: "help-documentation",
    component: HelpDocumentation,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
