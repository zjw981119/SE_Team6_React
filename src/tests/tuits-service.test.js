import {
    createTuit, deleteTuit,
    findTuitById, findAllTuits, deleteTuitByContent
} from "../services/tuits-service";
import {createUser, deleteUsersByUsername, findAllUsers, findUserById} from "../services/users-service";

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
        // create new tuit
        const newUser = await createUser(nasa);
        const newTuit = await createTuit(newUser._id, nasaTuit)
        // delete a tuit by its id.
        const status = await deleteTuit(newTuit._id);
        // verify we deleted at least one tuit by their id
        expect(status.deletedCount).toBe(1);
    });

});

describe('can retrieve a tuit by their primary key with REST API', () => {
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

    test('can retrieve a tuit from REST API by primary key', async () => {
        // create new tuit
        const newUser = await createUser(nasa);
        const newTuit = await createTuit(newUser._id, nasaTuit)

        // verify new tuit matches the parameter tuit && new user's id(primary key)
        expect(newTuit.tuit).toEqual(nasaTuit.tuit);
        expect(newTuit.postedBy).toEqual(newUser._id);

        // retrieve the user from the database by its primary key
        const existingTuit = await findTuitById(newTuit._id);

        // verify retrieved tuit matches parameter tuit && new user's id
        expect(existingTuit.tuit).toEqual(nasaTuit.tuit);
        // existingTuit is a tuit object with a populated postedBy(user) object
        expect(existingTuit.postedBy._id).toEqual(newUser._id);
    });
});

describe('can retrieve all tuits with REST API', () => {
    // TODO: implement this
    // sample user we'll insert to create tuits
    const nasa = {
        username: 'nasa',
        password: 'nasa426',
        email: 'nasa@aliens.com'
    };
    // sample tuits we'll insert to then retrive
    const tuitContents = [
        "This is the first tuit",
        "This is the second tuit",
        "This is the third tuit"
    ];

    // setup data before test
    beforeAll(async () => {
            // use Promise.all to wait until all promises(delete user operations) are done
            {
                const user = await createUser(nasa)
                //add id to nasa
                nasa._id = user._id
                //each user creates three tuits
                await Promise.all(tuitContents.map(content =>
                    createTuit(user._id, {tuit: content})))
            }

        }
    );

    // clean up after test runs
    afterAll(async () => {
            await Promise.all(tuitContents.map(content =>
                deleteTuitByContent(content)
            ))
            await deleteUsersByUsername(nasa.username)
        }
    );

    test('can retrieve all tuits from REST API', async () => {
        // retrieve all the tuits
        const tuits = await findAllTuits();

        // let's check each tuit we inserted
        const tuitsWeInserted = tuits.filter(
            // indexOf() method returns the first index (position) of a specified value.
            // returns -1 if value not found
            newTuit => tuitContents.indexOf(newTuit.tuit) >= 0);

        // exactly same tuits number as we inserted
        expect(tuitsWeInserted.length).toEqual(tuitContents.length);

        //compare the actual tuits in database with the ones we sent
        tuitsWeInserted.forEach(tuit => {
            // The find() method retuns undefined if no elements are found.
            const tuitContent = tuitContents.find(tuitContent => tuitContent === tuit.tuit);
            expect(tuit.tuit).toEqual(tuitContent);
            expect(tuit.postedBy).toEqual(nasa._id);
            //expect(tuit.password).toEqual(`${username}123`);
        });
    });

});