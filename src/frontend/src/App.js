import './App.scss';
import {TeamPage} from './pages/TeamPage';
import {HashRouter as Router, Route, Switch} from "react-router-dom";
import {MatchPage} from "./pages/MatchPage";
import {HomePage} from "./pages/HomePage";


function App() {
    //we use switch because choose one of router from them first use long one if not match switch to second one
    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route path="/teams/:teamName/matches/:year">
                        <MatchPage />
                    </Route>
                    <Route path="/teams/:teamName">
                        <TeamPage/>
                    </Route>
                    <Route path="/">
                        <HomePage/>
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
