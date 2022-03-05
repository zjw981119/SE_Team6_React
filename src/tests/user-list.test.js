import {UserList} from "../components/profile/user-list";
import {screen, render} from "@testing-library/react";  // for rendering component
import {HashRouter} from "react-router-dom";  // for navigation
import {findAllUsers} from "../services/users-service";
import axios from "axios";

//jest.mock('axios');

// sample users rendered by user-list
const MOCKED_USERS = [
    {username: 'ellen_ripley', password: 'lv426', email: 'repley@weyland.com', _id: "123"},
    {username: 'sarah_conor', password: 'illbeback', email: 'sarah@bigjeff.com', _id: "234"},
]

test('user list renders static user array', () => {
    // render a user array
    render(
        <HashRouter>
            <UserList users={MOCKED_USERS}/>
        </HashRouter>);
    // verify user appears in screen somewhere
    const linkElement = screen.getByText(/ellen_ripley/i);
    expect(linkElement).toBeInTheDocument();
});


// test rendering from REST
test('user list renders async', async () => {
    // retrieve users from REST
    // findAllUsers() returns a response with data in it, where data = {users: [....]}
    const users = await findAllUsers();
    render(
        <HashRouter>
            <UserList users={users}/>
        </HashRouter>);
    const linkElement = screen.getByText(/alice/i);
    expect(linkElement).toBeInTheDocument();
})

test('user list renders mocked', async () => {
    //only mock axios.get() method
    const mock = jest.spyOn(axios, 'get');
    // simulate response from REST with static response
    mock.mockImplementation(() =>
        Promise.resolve({data: {users: MOCKED_USERS}}));
    const response = await findAllUsers();
    const users = response.users;

    render(
        <HashRouter>
            <UserList users={users}/>
        </HashRouter>);

    // verify user appears in screen somewhere
    const user = screen.getByText(/ellen_ripley/i);
    expect(user).toBeInTheDocument();

    // restore original implementation
    // mock.mockRestore();
});
