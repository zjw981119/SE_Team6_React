/**
 * @jest-environment node
 */
import {createUser, deleteUsersByUsername} from "../../services/users-service";
import {deleteMsgByContent, sendMessage} from "../../services/messages-service";

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