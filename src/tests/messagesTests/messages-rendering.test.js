/*
{Tuits} imports the export 'Tuits' from the file '../components/tuits/index'
while Tuits imports the default export from '../components/tuits/index'.
 */
import Contacts from "../../components/messages/Contacts";
import {screen, render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";


// sample contacts
const MOCKED_USERS = [
    {username: 'alice', email: 'alice@weyland.com', _id: "alice1111"},
    {username: 'bob', email: 'bob@weyland.com', _id: "bob2222"},
    {username: 'charlie', email: 'charlie@weyland.com', _id: "charlie3333"}
];


test('contacts list renders static contacts array', () => {
    // render a contacts array
    render(
        <HashRouter>
            <Contacts contacts={MOCKED_USERS}/>
        </HashRouter>);
    // verify contact appears in screen somewhere
    const linkElement = screen.getByText(/alice/i);
    expect(linkElement).toBeInTheDocument();
});
