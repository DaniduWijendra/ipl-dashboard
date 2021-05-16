import './App.css';
import {TeamPage} from './pages/TeamPage';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {MatchPage} from "./pages/MatchPage";


function App() {
    //we use switch because choose one of router from them first use long one if not match switch to second one
    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route path="/teams/:teamName/matches/:year">
                        <MatchPage/>
                    </Route>
                    <Route path="/teams/:teamName">
                        <TeamPage/>
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
