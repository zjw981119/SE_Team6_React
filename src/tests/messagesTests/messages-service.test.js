/**
 * @jest-environment node
 */
import {createUser, deleteUsersByUsername, findAllUsers} from "../../services/users-service";
import {deleteMsgByContent, findAllContacts, findAllMessages, sendMessage} from "../../services/messages-service";

describe('can retrieve all contacts with REST API', () => {
    // sample user to insert
    const users = [
        {
            username: 'test1',
            password: 'test1123',
            email: 'test1@aliens.com'
        },
        {
            username: 'test2',
            password: 'test2123',
            email: 'test2@aliens.com'
        }
    ];

    // setup test before running test
    beforeAll(() => {
        // use return, Jest will wait for this promise to resolve before running tests.
        // remove any/all users to make sure we create it in the test
        const promise1 = deleteUsersByUsername(users[0].username)
        const promise2 = deleteUsersByUsername(users[1].username)
        return Promise.all([promise1, promise2])
    })


    // clean up after test runs
    afterAll(() => {
            // remove any data we created
            const promise1 = deleteUsersByUsername(users[0].username)
            const promise2 = deleteUsersByUsername(users[1].username)
            return Promise.all([promise1, promise2])
        }
    )

    test('can retrieve all contacts', async () => {
        const oldUsers = await findAllUsers();
        // add old users to user array
        oldUsers.map(user => users.push(user))
        const userAmount = users.length;

        // insert new users in the database
        const loginUser = await createUser(users[0]);
        await createUser(users[1]);

        // retrieve all contacts(excluding the login user)
        const contacts = await findAllContacts(loginUser._id);
        expect(contacts.length).toEqual(userAmount - 1);

        // compare property of contacts
        contacts.forEach(contact => {
            const user = users.find(user => user.username === contact.username);
            expect(contact.username).toEqual(user.username);
            expect(contact.email).toEqual(user.email);
        });

        // login user shouldn't be in the contacts list
        const result = contacts.find(user => user.username === loginUser.username)
        expect(result).toEqual(undefined);
    });
});

describe('can create message with REST API', () => {
    // sample user to insert
    const users = [
        {
            username: 'test1',
            password: 'test1',
            email: 'test1@aliens.com'
        },
        {
            username: 'test2',
            password: 'test2',
            email: 'test2@aliens.com'
        }
    ];
    // sample message to send
    const message = {
        message: 'first message'
    }

    // setup test before running test
    beforeAll(() => {
        // use return, Jest will wait for this promise to resolve before running tests.
        // remove any/all messages to make sure we create it in the test
        return deleteMsgByContent(message.message)
    })


    // clean up after test runs
    afterAll(() => {
            // remove any data we created
            const promise1 = deleteMsgByContent(message.message)
            const promise2 = deleteUsersByUsername(users[0].username)
            const promise3 = deleteUsersByUsername(users[1].username)
            return Promise.all([promise1, promise2, promise3])
        }
    )

    test('can send new msg with REST API', async () => {
        // insert new user in the database
        const sender = await createUser(users[0]);
        const receiver = await createUser(users[1]);

        // send new msg
        const newMsg = await sendMessage(sender._id, receiver._id, message)

        // verify inserted tuit's properties match parameter tuit and user's id
        expect(newMsg.message).toEqual(message.message);
        expect(newMsg.sentFrom).toEqual(sender._id);
        expect(newMsg.sentTo).toEqual(receiver._id);
    });
});

describe('can retrieve all messages between two users with REST API', () => {
    // sample user to insert
    const users = [
        {
            username: 'sender',
            password: 'sender',
            email: 'sender@aliens.com'
        },
        {
            username: 'receiver',
            password: 'receiver',
            email: 'receiver@aliens.com'
        }
    ];
    // sample message to send
    const messages = [
        {
            message: 'sender message'
        },
        {
            message: 'receiver message'
        }
    ]

    // setup test before running test
    beforeAll(() => {
        // use return, Jest will wait for this promise to resolve before running tests.
        // remove any/all messages to make sure we create it in the test
        const promise1 = deleteMsgByContent(messages[0].message)
        const promise2 = deleteMsgByContent(messages[1].message)
        return Promise.all([promise1, promise2])
    })


    // clean up after test runs
    afterAll(() => {
            // remove any data we created
            const promise1 = deleteMsgByContent(messages[0].message)
            const promise2 = deleteMsgByContent(messages[1].message)
            const promise3 = deleteUsersByUsername(users[0].username)
            const promise4 = deleteUsersByUsername(users[1].username)
            return Promise.all([promise1, promise2, promise3, promise4])
        }
    )

    test('can retrieve all msgs with REST API', async () => {
        // insert new user in the database
        const sender = await createUser(users[0]);
        const receiver = await createUser(users[1]);

        // sender send new msg
        const newMsg1 = await sendMessage(sender._id, receiver._id, messages[0])
        // receiver send new msg
        const newMsg2 = await sendMessage(receiver._id, sender._id, messages[1])

        // sender retrieve all messages
        const allMsgs = await findAllMessages(
            {
                sentFrom: sender._id,
                sentTo: receiver._id,
            }
        )
        expect(allMsgs.length).toEqual(messages.length);
        // verify msg sent from sender
        expect(allMsgs[0].message).toEqual(newMsg1.message);
        expect(allMsgs[0].fromSelf).toEqual(true);
        // verify msg sent from receiver
        expect(allMsgs[1].message).toEqual(newMsg2.message);
        expect(allMsgs[1].fromSelf).toEqual(false);
    });
});