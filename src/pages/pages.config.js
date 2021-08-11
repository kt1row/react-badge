
import QSLForm from './QSLForm.component';
import QSLCard from './QSLCard.component';
//import HamPageComponent from './ham-page/ham-page.component';

// Config for root routes to easily add/omit routes
// NOTE: Including linkText property will include route in navigation menu; omit this property for routes which shouldn't be in navigation
// NOTE: You may need to update this config with more properties and map to the RootLayout if more complex routes are required
export const routes = [
  // Currently a fallback route which will match if any routes above are not exactly matched
  // NOTE: Fallback routes should always be last
  //{ path: '/Ham', linkText: 'Ham', routeComponent: HamPageComponent, exact: true},
  { path: '/QSLCard', linkText: 'QSLCard', routeComponent: QSLCard, exact: true },
  { path: '/', linkText: 'QSLForm', routeComponent: QSLForm, exact: false },
];

export default routes;