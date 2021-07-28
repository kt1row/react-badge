
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
  import rootRoutes from '../pages.config';
  
  // Utilize a layout to decouple page layout (navigation menu/header/footer/side menu) from main app component
  // https://reactrouter.com/web/guides/quick-start
  export const RootLayout = () => (
    <Router>
        <ul>
          {/* Finds all routes with defined linkText property */}
          {rootRoutes.filter(route => !!route.linkText).map((route, index) => (
            <li key={index}>
             <Link to={route.path}>{route.linkText}</Link>
           </li>
          ))}
        </ul>
        <Switch>
          {rootRoutes.map((route, index) => (
            <Route exact={route.exact} key={index} path={route.path} component={route.routeComponent} />
          ))}
        </Switch>
    </Router>
  );
  
  export default RootLayout;