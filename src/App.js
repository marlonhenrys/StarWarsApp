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
import starWarsAPI from './StarWarsAPI';

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

    const fetchUrl = (url = starWarsAPI.baseURL, saveState = false) =>
        starWarsAPI.fetchUrl(url, saveState, apiData, setApiData)

    const fetchCategoryUrl = (urlBase, url, page = 1) =>
        starWarsAPI.fetchCategoryUrl(
            urlBase, url, page, apiData, setApiData, categoriesPages, setCategoriesPages)

    const fetchNextCategoryPageUrl = (url) =>
        starWarsAPI.fetchNextCategoryPageUrl(
            url, apiData, setApiData, categoriesPages, setCategoriesPages)

    const fetchNextCategoryPageByName = (name) =>
        starWarsAPI.fetchNextCategoryPageByName(
            name, apiData, setApiData, categoriesPages, setCategoriesPages)

    const fetchCategory = (categoryName, page = 1) =>
        starWarsAPI.fetchCategory(
            categoryName, page, apiData, setApiData, categoriesPages, setCategoriesPages)

    const fetchCategoryItemUrl = (url) =>
        starWarsAPI.fetchCategoryItemUrl(url, apiData, setApiData)

    const fetchCategoryItem = (categoryName, id) =>
        starWarsAPI.fetchCategoryItem(categoryName, id, apiData, setApiData)

    const clearCategoryPages = (categoryName) =>
        starWarsAPI.clearCategoryPages(categoryName, categoriesPages, setCategoriesPages)

    // useEffect(() => { fetchCategory('people'); }, [apiData]);

    const [darkModeActived, setDarkModeActived] = useState(false);

    useEffect(() => setTimeout(() => setDarkModeActived(true), 300), []);

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
