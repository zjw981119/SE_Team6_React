import {render, screen} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import Tuits from "../../components/tuits";
import axios from "axios";
import {findAllTuitsDisLikedByUser} from "../../services/dislikes-service";
import {login} from "../../services/security-service";

// sample tuits
const MOCKED_TUITS_I_DISLIKED = [
    {
        _id: "123",
        tuit: "bob's first tuit",
        postedBy: {
            _id: "bob2222",
            username: 'bob',
            password: 'bob123',
            email: 'bob@weyland.com',
        },
        stats:{
            replies: 0,
            retuits: 0,
            likes: 0,
            dislikes: 2
        },
        postedOn: "2022-03-20T20:24:10.481Z"
    },
    {
        _id: "234",
        tuit: "bob's second tuit",
        postedBy: {
            _id: "bob2222",
            username: 'bob',
            password: 'bob123',
            email: 'bob@weyland.com',
        },
        stats:{
            replies: 0,
            retuits: 0,
            likes: 0,
            dislikes: 3
        },
        postedOn: "2022-03-21T20:24:10.481Z"
    },
];

const LOGIN_USER = {
    username: "alice",
    password: "alice123"
}
//test static tuit array
test('dislike list renders static tuit array', () => {
    // render a tuit array
    render(
        <HashRouter>
            <Tuits tuits={MOCKED_TUITS_I_DISLIKED}/>
        </HashRouter>);
    // verify dislike number appears in screen somewhere
    const linkElement = screen.getByText(/2/i);
    expect(linkElement).toBeInTheDocument();
});

// test rendering from REST
test('dislike list renders async', async () => {
    //user login
    await login(LOGIN_USER)
    const tuits = await findAllTuitsDisLikedByUser("me");
    // render a dislike tuit array
    render(
        <HashRouter>
            <Tuits tuits={tuits}/>
        </HashRouter>);
    // verify dislike number appears in screen somewhere
    const linkElement = screen.getByText(/1/i);
    expect(linkElement).toBeInTheDocument();
})

test('dislike list renders mocked', async () => {
    //only mock axios.get() method
    const mock = jest.spyOn(axios, 'get');
    // simulate response from REST with static response
    mock.mockImplementation(() =>
        Promise.resolve({data: {tuits: MOCKED_TUITS_I_DISLIKED}}));
    const response = await findAllTuitsDisLikedByUser("me");
    const tuits = response.tuits;

    // render a dislike tuit array
    render(
        <HashRouter>
            <Tuits tuits={tuits}/>
        </HashRouter>);
    // verify dislike number appears in screen somewhere
    const linkElement = screen.getByText(/3/i);
    expect(linkElement).toBeInTheDocument();

    // restore original implementation
    // mock.mockRestore();
});