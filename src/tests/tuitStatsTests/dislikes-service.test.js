/**
 * @jest-environment node
 */
import {deleteUsersByUsername} from "../../services/users-service";
import {createTuit, deleteTuitByContent, findTuitById} from "../../services/tuits-service";
import {logout, signup} from "../../services/security-service";
import {userDislikesTuit} from "../../services/dislikes-service";
import {userLikesTuit} from "../../services/likes-service";

// sample user to insert
const user = {
    username: 'ellenripley',
    password: 'lv426',
    email: 'ellenripley@aliens.com'
};

//sample tuit to insert
const tuit = {
    tuit: 'test tuit',
};

describe('toggleDislike', () => {

    // setup test before running test
    beforeAll(() => {
        const promise1 = deleteUsersByUsername(user.username);
        const promise2 = deleteTuitByContent(tuit.tuit)
        // pass an array to Promise.all()
        return Promise.all([promise1, promise2]);
    })

    // clean up after test runs
    afterAll(() => {
        // remove any data we created
        const promise1 = deleteUsersByUsername(user.username);
        const promise2 = deleteTuitByContent(tuit.tuit)
        const promise3 = logout()
        return Promise.all([promise1, promise2, promise3]);
    })


    test('can dislike a tuit', async () => {
        // extend timeout
        jest.setTimeout(10000)
        //user signup, create session
        const loginUser = await signup(user);
        //login user create tuit
        const newTuit = await createTuit(loginUser._id, tuit)

        //verify initial likes && dislikes
        expect(newTuit.stats.likes).toEqual(0);
        expect(newTuit.stats.dislikes).toEqual(0);

        // toggle dislike, dislike change to 1
        await userDislikesTuit(loginUser._id, newTuit._id);
        let updatedTuit = await findTuitById(newTuit._id);
        expect(updatedTuit.stats.likes).toEqual(0);
        expect(updatedTuit.stats.dislikes).toEqual(1);

        //toggle dislike again, dislike change to 0
        await userDislikesTuit(loginUser._id, newTuit._id);
        updatedTuit = await findTuitById(newTuit._id);
        expect(updatedTuit.stats.likes).toEqual(0);
        expect(updatedTuit.stats.dislikes).toEqual(0);
    });

});

describe('sameUserToggleLikeBeforeDislike', () => {

    // setup test before running test
    beforeAll(() => {
        const promise1 = deleteUsersByUsername(user.username);
        const promise2 = deleteTuitByContent(tuit.tuit)
        // pass an array to Promise.all()
        return Promise.all([promise1, promise2]);
    })

    // clean up after test runs
    afterAll(() => {
        // remove any data we created
        const promise1 = deleteUsersByUsername(user.username);
        const promise2 = deleteTuitByContent(tuit.tuit)
        const promise3 = logout()
        return Promise.all([promise1, promise2, promise3]);
    })


    test('dislike a tuit will decrease like', async () => {
        // extend timeout
        jest.setTimeout(10000)
        //user signup, create session
        const loginUser = await signup(user);
        //login user create tuit
        const newTuit = await createTuit(loginUser._id, tuit)

        //verify initial likes && dislikes
        expect(newTuit.stats.likes).toEqual(0);
        expect(newTuit.stats.dislikes).toEqual(0);

        // toggle like, like change to 1
        await userLikesTuit(loginUser._id, newTuit._id);
        let updatedTuit = await findTuitById(newTuit._id);
        expect(updatedTuit.stats.likes).toEqual(1);
        expect(updatedTuit.stats.dislikes).toEqual(0);

        //toggle dislike , dislike change to 1, like change to 0
        await userDislikesTuit(loginUser._id, newTuit._id);
        updatedTuit = await findTuitById(newTuit._id);
        expect(updatedTuit.stats.likes).toEqual(0);
        expect(updatedTuit.stats.dislikes).toEqual(1);
    });

});

describe('sameUsertoggleDislikeBeforeLike', () => {

    // setup test before running test
    beforeAll(() => {
        const promise1 = deleteUsersByUsername(user.username);
        const promise2 = deleteTuitByContent(tuit.tuit)
        // pass an array to Promise.all()
        return Promise.all([promise1, promise2]);
    })

    // clean up after test runs
    afterAll(() => {
        // remove any data we created
        const promise1 = deleteUsersByUsername(user.username);
        const promise2 = deleteTuitByContent(tuit.tuit)
        const promise3 = logout()
        return Promise.all([promise1, promise2, promise3]);
    })


    test('like a tuit will decrease dislike', async () => {
        // extend timeout
        jest.setTimeout(10000)
        //user signup, create session
        const loginUser = await signup(user);
        //login user create tuit
        const newTuit = await createTuit(loginUser._id, tuit)

        //verify initial likes && dislikes
        expect(newTuit.stats.likes).toEqual(0);
        expect(newTuit.stats.dislikes).toEqual(0);

        // toggle dislike, dislike change to 1
        await userDislikesTuit(loginUser._id, newTuit._id);
        let updatedTuit = await findTuitById(newTuit._id);
        expect(updatedTuit.stats.likes).toEqual(0);
        expect(updatedTuit.stats.dislikes).toEqual(1);

        //toggle like , like change to 1, dislike change to 0
        await userLikesTuit(loginUser._id, newTuit._id);
        updatedTuit = await findTuitById(newTuit._id);
        expect(updatedTuit.stats.likes).toEqual(1);
        expect(updatedTuit.stats.dislikes).toEqual(0);
    });

});

