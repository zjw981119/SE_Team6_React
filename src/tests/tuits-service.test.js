import {
    createTuit, deleteTuit,
    findTuitById, findAllTuits, deleteTuitByContent
} from "../services/tuits-service";
import {createUser, deleteUsersByUsername} from "../services/users-service";

describe('can create tuit with REST API', () => {
    // sample user to insert
    const nasa = {
        username: 'nasa',
        password: 'nasa426',
        email: 'nasa@aliens.com'
    };
    // sample tuit to insert
    const nasaTuit = {
        tuit: 'our @NASAPersevere Mars rover landed and our Ingenuity....',
    };

    // setup test before running test
    beforeAll(() => {
        // use return, Jest will wait for this promise to resolve before running tests.
        // remove any/all tuits to make sure we create it in the test
        return deleteTuitByContent(nasaTuit.tuit);
    })

    // clean up after test runs
    afterAll(() => {
            // remove any data we created
            const promise1 = deleteTuitByContent(nasaTuit.tuit)
            const promise2 = deleteUsersByUsername(nasa.username)
            // The Promise.all() method takes an iterable of promises as an input
            // must use Promise.all([])  or pass an iterable such as .map()
            return Promise.all([promise1, promise2])
        }
    )

    test('can insert new tuit with REST API', async () => {
        // insert new user in the database
        const newUser = await createUser(nasa);
        // insert new tuit in the database
        const newTuit = await createTuit(newUser._id, nasaTuit)

        // verify inserted tuit's properties match parameter tuit and user's id
        expect(newTuit.tuit).toEqual(nasaTuit.tuit);
        expect(newTuit.postedBy).toEqual(newUser._id);
    });
});

describe('can delete tuit wtih REST API', () => {
    const nasa = {
        username: 'nasa',
        password: 'nasa426',
        email: 'nasa@aliens.com'
    };
    // sample tuit to delete
    const nasaTuit = {
        tuit: 'our @NASAPersevere Mars rover landed and our Ingenuity....',
    };

    // clean up after test runs
    afterAll(async () => {
            // remove any data we created
            // use await to wait until all promises finished
            await deleteTuitByContent(nasaTuit.tuit)
            await deleteUsersByUsername(nasa.username)
        }
    )

    test('can delete users from REST API by username', async () => {
        const newUser = await createUser(nasa);
        const newTuit = await createTuit(newUser._id, nasaTuit)
        // delete a tuit by its id.
        const status = await deleteTuit(newTuit._id);
        // verify we deleted at least one tuit by their id
        expect(status.deletedCount).toBe(1);
    });

});

describe('can retrieve a tuit by their primary key with REST API', () => {
    // TODO: implement this
});

describe('can retrieve all tuits with REST API', () => {
    // TODO: implement this
});