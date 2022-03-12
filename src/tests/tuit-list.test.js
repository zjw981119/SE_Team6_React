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
const MOCKED_USERS = [
    {username: 'alice', password: 'alice123', email: 'alice@weyland.com', _id: "alice1111"},
    {username: 'bob', password: 'bob123', email: 'bob@weyland.com', _id: "bob2222"},
    {username: 'charlie', password: 'charlie123', email: 'charlie@weyland.com', _id: "charlie3333"}
];

const MOCKED_TUITS = [
    "alice's tuit", "bob's tuit", "charlie's tuit"
];

test('tuit list renders static tuit array', () => {
    // mock inserting tuit
    const mockTuits = []
    for(var i = 0; i < MOCKED_TUITS.length; i++){
        mockTuits.push({_id: "tuit" + i, tuit: MOCKED_TUITS[i], postedBy: MOCKED_USERS[i]._id})
    }
    // render a tuit array
    render(
        <HashRouter>
            <Tuits tuits={mockTuits}/>
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
    // mock inserting tuit
    const mockTuits = []
    for(var i = 0; i < MOCKED_TUITS.length; i++){
        mockTuits.push({_id: "tuit" + i, tuit: MOCKED_TUITS[i], postedBy: MOCKED_USERS[i]._id})
    }
    //only mock axios.get() method
    const mock = jest.spyOn(axios, 'get');
    // simulate response from REST with static response
    mock.mockImplementation(() =>
        Promise.resolve({data: {tuits: mockTuits}}));
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
