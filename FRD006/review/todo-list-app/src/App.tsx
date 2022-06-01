import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonPage, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import { history } from './redux/history';
import { TodoList } from './pages/TodoList';
import { TodoDetail } from './pages/TodoDetail';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter history={history}>
      <IonPage>
        <IonRouterOutlet>
          {/* React Router V5 嘅寫法 */}
          <Route path="/" component={Home} exact />
          <Route path="/todos" exact>
            <TodoList></TodoList>
          </Route>
          <Route path="/todo-details/:id" exact>
            <TodoDetail></TodoDetail>
          </Route>
        </IonRouterOutlet>
      </IonPage>
    </IonReactRouter>
  </IonApp>
);

export default App;
