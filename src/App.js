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

    /**
     * Organização:
     * 
     * {
     *     categoryUrl: {page: number, maxReached: boolean},
     *     categoryUrl: {page: number, maxReached: boolean},
     *     categoryUrl: {page: number, maxReached: boolean},
     * }
     */
    const [categoriesPages, setCategoriesPages] = useState({});

    function fetchUrl(url = API_BASE, saveState = false) {
        return new Promise(
            (resolve, reject) => {
                const cached = !!apiData[url];

                if (cached) resolve([apiData[url], cached]);

                else axios.get(url).then(
                    (response) => {
                        if (saveState) setApiData({ ...apiData, [url]: response.data });
                        resolve([response.data, cached]);
                    }
                )
                    .catch(
                        (error) => {
                            console.log(error);
                            resolve(null);
                        }
                    );
            }
        );
    }

    // A URL já tem que vir com o filtro de page. O parâmetro page desta função
    // é usado apenas para guardá-lo no objeto buscado
    function fetchCategoryUrl(urlBase, url, page = 1) {
        return new Promise(
            (resolve, reject) => {
                fetchUrl(url).then(
                    (dataAndCacheStatus) => {
                        if (dataAndCacheStatus === null) resolve(null);

                        else {
                            const [data, cached] = dataAndCacheStatus;

                            if (!cached) {
                                data.url = url;
                                data.page = page;

                                const newApiData = { ...apiData, [url]: data };

                                // Além de fazer o cache da url da categoria, faz o cache das urls
                                // de cada um dos itens dela
                                data.results.forEach((result) => newApiData[result.url] = result);

                                setApiData(newApiData);
    
                                const categoryInfo = {page, maxReached: false};
                                setCategoriesPages({...categoriesPages, [urlBase]: categoryInfo});
                                console.log(data);
                            }

                            resolve(data);
                        }
                    }
                )
                .catch(
                    (error) => {
                        console.log(error);
                        const categoryInfo = {page, maxReached: true};
                        setCategoriesPages({...categoriesPages, [urlBase]: categoryInfo});
                        resolve(null);
                    }
                );
            }
        );
    }

    function fetchNextCategoryPageUrl(url) {
        const page = categoriesPages[url] ? categoriesPages[url].page + 1 : 1;
        const pageQuery = page === 1 ? '' : `?page=${page}`;

        return fetchCategoryUrl(url, `${url}${page === 1 ? '' : `?page=${page}`}`, page);
    }

    function fetchNextCategoryPageByName(name) {
        // debugger;
        return fetchNextCategoryPageUrl(`${API_BASE}${name}/`);
    }

    function fetchCategory(categoryName, page = 1) {
        const pageQuery = page === 1 ? '' : `?page=${page}`;
        const urlBase = `${API_BASE}${categoryName}/`;

        return fetchCategoryUrl(urlBase, `${urlBase}${pageQuery}`, page);
    }

    function fetchCategoryItemUrl(url) {
        return new Promise(
            (resolve, reject) => {
                fetchUrl(url).then(
                    (dataAndCacheStatus) => {

                        if (dataAndCacheStatus === null) resolve(null);

                        else {
                            const [data, cached] = dataAndCacheStatus;

                            if (!cached) {
                                setApiData({ ...apiData, [url]: data });
                                console.log(data);
                            }

                            resolve(data);
                        }
                    }
                );
            }
        );
    }

    function fetchCategoryItem(categoryName, id) {
        return fetchCategoryItemUrl(`${API_BASE}${categoryName}/${id}`);
    }

    function clearCategoryPages(categoryName) {
        const urlBase = `${API_BASE}${categoryName}/`;

        setCategoriesPages({...categoriesPages, [urlBase]: null});
    }

    // useEffect(() => { fetchCategory('people'); }, [apiData]);

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
                            component={() =>
                                <Home darkModeActived={darkModeActived}
                                    changeTheme={() => setDarkModeActived(!darkModeActived)} />}
                        />

                        <Route path={routes.genericCategory} exact={true}
                            render={(props) =>
                                <Category {...props} darkModeActived={darkModeActived}
                                changeTheme={() => setDarkModeActived(!darkModeActived)}
                                fetchNextCategoryPageByName={fetchNextCategoryPageByName}
                                clearCategoryPages={clearCategoryPages} />}
                        />

                        <Route path={routes.genericItem} exact={true}
                            render={(props) =>
                                <Item {...props} darkModeActived={darkModeActived}
                                    changeTheme={() => setDarkModeActived(!darkModeActived)}
                                    fetchCategoryItem={fetchCategoryItem} />}
                        />
                    </Switch>
                </PrivateRoute>
                <Route path={"*"} component={Error404} />
            </Switch>
        </HashRouter>
    );
};

export default App;
