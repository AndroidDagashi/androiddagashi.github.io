/* eslint semi:0 */
import { Route } from 'vue-router';

// https://github.com/nuxt-community/typescript-template/issues/23
export default interface WithRoute {
  $route: Route;
}
