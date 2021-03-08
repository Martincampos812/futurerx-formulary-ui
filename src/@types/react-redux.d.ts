import 'react-redux';

import { AppState } from '../redux/store';

declare module 'react-redux' {
  interface DefaultRootState extends AppState { };
}