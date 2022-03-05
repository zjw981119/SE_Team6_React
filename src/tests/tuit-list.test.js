/*
{Tuits} imports the export 'Tuits' from the file '../components/tuits/index'
while Tuits imports the default export from '../components/tuits/index'.
 */
import Tuits from "../components/tuits/index";
import {screen, render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import {findAllTuits} from "../services/tuits-service";
import axios from "axios";

//jest.mock('axios');

// sample tuits
const MOCKED_TUITS = [
    {
        tuit: "alice's tuit",
        postedBy: {username: 'alice', password: 'alice123', email: 'alice@weyland.com', _id: "user1"},
        postedOn: '2022-03-05T01:42:16.736Z', _id: "tuit1"
    },
    {
        tuit: "bob's tuit",
        postedBy: {username: 'bob', password: 'bob123', email: 'bob@weyland.com', _id: "user2"},
        postedOn: '2022-03-05T02:42:16.736Z', _id: "tuit2"
    },
    {
        tuit: "charlie's tuit",
        postedBy: {username: 'charlie', password: 'charlie123', email: 'charlie@weyland.com', _id: "user3"},
        postedOn: '2022-03-05T03:42:16.736Z', _id: "tuit3"
    },
]

test('tuit list renders static tuit array', () => {
    // render a tuit array
    render(
        <HashRouter>
            <Tuits tuits={MOCKED_TUITS}/>
        </HashRouter>);
    // verify tuit appears in screen somewhere
    const linkElement = screen.getByText(/alice's tuit/i);
    expect(linkElement).toBeInTheDocument();
});

// test rendering from REST
test('tuit list renders async', async () => {
    const tuits = await findAllTuits();
    // render a tuit array
    render(
        <HashRouter>
            <Tuits tuits={tuits}/>
        </HashRouter>);
    // verify tuit appears in screen somewhere
    const linkElement = screen.getByText(/bob's tuit/i);
    expect(linkElement).toBeInTheDocument();
})

test('tuit list renders mocked', async () => {
    //only mock axios.get() method
    const mock = jest.spyOn(axios, 'get');
    // simulate response from REST with static response
    mock.mockImplementation(() =>
        Promise.resolve({data: {tuits: MOCKED_TUITS}}));
    const response = await findAllTuits();
    const tuits = response.tuits;

    // render a tuit array
    render(
        <HashRouter>
            <Tuits tuits={tuits}/>
        </HashRouter>);
    // verify tuit appears in screen somewhere
    const linkElement = screen.getByText(/charlie's tuit/i);
    expect(linkElement).toBeInTheDocument();

    // restore original implementation
    // mock.mockRestore();
});
