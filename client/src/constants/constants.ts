import { AppRoutes } from '../containers/Router/routes';
export const TAG_LINE = "Welcome onboard from Team one!";
export const DEBOUNCE_DURATION = 300;
export const AUTH_USER_KEY = "auth-user";
export const BASE_URL = "https://www.homeforme-aws.de:5000";
export const RESULTS_PER_PAGE = 8;
export const NavigationTabData = [
    { label: 'home', to: AppRoutes.Landing },
    { label: 'properties', to: AppRoutes.Properties },
    { label: 'average price', to: AppRoutes.AvgPrice },
    { label: 'Dashboard', to: AppRoutes.Dashboard },
    { label: 'companies', to: AppRoutes.Companies },
    { label: 'about us', to: AppRoutes.AboutUs },
  ];
export const API_MSG_URL = '/api/message/getNewMessages';
export const LOG_OUT = "Log Out";
export const MAX_ROOMS_ALLOWED = 8;
export const MIN_ROOMS_ALLOWED = 1;
export const MAX_SIZE_ALLOWED = 500;
