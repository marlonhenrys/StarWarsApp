import React, { useState, useEffect } from 'react';
import { HashRouter, Route, Switch } from "react-router-dom";
import routes from "./utils/routes";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/Home";
import Error404 from "./pages/Error404";
import Category from "./pages/Category";
import Item from "./pages/Item";
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';
import './styles.css';

export const API_BASE = 'https://swapi.co/api/';

const App = () => {

    /**
     * Até o momento, a organização que pensei foi o objeto apiData ser do tipo:
     *
     * {
     *     url: dado,
     *     url: dado,
     *     url: dado,
     *     url: dado,
     * }
     *
     * Isso porque a api sempre traz as urls das coisas, então basta acessar o
     * objeto apiData usando a url como chave que ele trará os dados caso já tenham
     * sido pegos.
     */
    const [apiData, setApiData] = useState({});

    function fetchUrl(url = API_BASE) {
        return new Promise(
            (resolve, reject) => {
                if (apiData[url]) resolve(apiData[url]);

                else axios.get(url).then(
                    (response) => {
                        setApiData({ ...apiData, [url]: response.data });
                        resolve(response.data);
                    }
                )
                    .catch((error) => console.log(error));
            }
        );
    }

    function fetchCategory(categoryName, page = 1) {
        return new Promise(
            (resolve, reject) => {
                const pageQuery = page === 1 ? '' : `?page=${page}`;
                const url = `${API_BASE}${categoryName}/${pageQuery}`;

                fetchUrl(url).then((data) => {
                    resolve(data);

                    /*const newApiData = {...apiData};

                    // Além de fazer o cache da url da categoria, faz o cache das urls
                    // de cada um dos itens dela
                    data.results.forEach((result) => newApiData[result.url] = result);

                    setApiData(newApiData);*/

                    console.log(data);
                });
            }
        );
    }

    function fetchCategoryItem(categoryName, id) {
        return new Promise(
            (resolve, reject) => {
                const url = `${API_BASE}${categoryName}/${id}`;

                fetchUrl(url).then((data) => {
                    resolve(data);
                    console.log(data);
                });
            }
        );
    }

    useEffect(() => { fetchCategory('people'); }, [apiData]);

    const [darkModeActived, setDarkModeActived] = useState(false);

    useEffect(() => {
        const root = document.documentElement;

        if (darkModeActived) {
            root.style.setProperty('--color-bg-main', '#222');
            root.style.setProperty('--color-bg-items', '#444');
            root.style.setProperty('--color-font-standard', '#FFF');
            root.style.setProperty('--color-font-feature', 'rgb(231, 212, 28)');
        } else {
            root.style.setProperty('--color-bg-main', '#CCC');
            root.style.setProperty('--color-bg-items', '#FFF');
            root.style.setProperty('--color-font-standard', '#000');
            root.style.setProperty('--color-font-feature', 'rgb(88, 90, 155)');
        }
    }, [darkModeActived]);


    return (
        <HashRouter>
            <Switch>
                <Route path={routes.index} exact={true} component={Index} />
                <Route path={routes.login} exact={true} component={Login} />
                <Route path={routes.register} exact={true} component={Register} />
                <PrivateRoute>
                    <Switch>
                        <Route path={routes.home} exact={true}
                            component={() => <Home darkModeActived={darkModeActived} changeTheme={() => setDarkModeActived(!darkModeActived)} />} />
                        <Route path={routes.genericCategory} exact={true}
                            render={(props) => <Category {...props} darkModeActived={darkModeActived} changeTheme={() => setDarkModeActived(!darkModeActived)} />} />
                        <Route path={routes.genericItem} exact={true}
                            render={(props) => <Item {...props} darkModeActived={darkModeActived} changeTheme={() => setDarkModeActived(!darkModeActived)} />} />
                    </Switch>
                </PrivateRoute>
                <Route path={"*"} component={Error404} />
            </Switch>
        </HashRouter>
    );
};

export default App;
