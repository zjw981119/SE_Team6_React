/**
 * @jest-environment node
 */

import {userBookmarksTuit, findAllTuitsBookmarkedByUser, findAllBookmarkedTuitsByTag, findAllTags} from "../../services/bookmarks-service";
import {createTuit, deleteTuitByContent, findTuitById} from "../../services/tuits-service";
import {logout, signup} from "../../services/security-service";
import {deleteUsersByUsername} from "../../services/users-service";

// sample user to insert
const user = {
    username: 'ellenripley',
    password: 'lv426',
    email: 'ellenripley@aliens.com'
};

//sample tuit to insert
const tuit = {
    tuit: 'test tuit',
    tag: 'first'
};

const tuit2 = {
    tuit: 'test tuit2',
    tag: 'second'
};

const tuit3 = {
    tuit: 'test tuit3',
    tag: 'first'
};

describe('toggleBookmark', () => {

    // setup test before running test
    beforeAll(() => {
        const promise1 = deleteUsersByUsername(user.username);
        const promise2 = deleteTuitByContent(tuit.tuit)
        // pass an array to Promise.all()
        return Promise.all([promise1, promise2]);
    })

    // clean up after test runs
    afterAll(() => {
    //     // remove any data we created
        const promise1 = deleteUsersByUsername(user.username);
        const promise2 = deleteTuitByContent(tuit.tuit)
        const promise3 = logout()
        return Promise.all([promise1, promise2, promise3]);
    })


    test('can bookmark a tuit', async () => {
        // extend timeout
        jest.setTimeout(10000)
        //user signup, create session
        const loginUser = await signup(user);
        //login user create tuit
        const newTuit = await createTuit(loginUser._id, tuit)
        //
        // //verify initial bookmark
        expect(newTuit.stats.bookmarks).toEqual(0);
        //
        // // toggle bookmark to 1
        await userBookmarksTuit(loginUser._id, newTuit._id);
        let updatedTuit = await findTuitById(newTuit._id);
        expect(updatedTuit.stats.bookmarks).toEqual(1);
        //
        // //toggle bookmark to 0
        await userBookmarksTuit(loginUser._id, newTuit._id);
        updatedTuit = await findTuitById(newTuit._id);
        expect(updatedTuit.stats.bookmarks).toEqual(0);
    });

});

//test getTuitsBookmarkedByUser
describe('getTuitsBookmarkedByUser', () => {

    // setup test before running test
    beforeAll(() => {
        const promise1 = deleteUsersByUsername(user.username);
        const promise2 = deleteTuitByContent(tuit.tuit)
        const promise3 = deleteTuitByContent(tuit2.tuit)
        const promise4 = deleteTuitByContent(tuit3.tuit)
        // pass an array to Promise.all()
        return Promise.all([promise1, promise2, promise3, promise4]);
    })

    // clean up after test runs
    afterAll(() => {
        // remove any data we created
        const promise1 = deleteUsersByUsername(user.username);
        const promise2 = deleteTuitByContent(tuit.tuit)
        const promise3 = deleteTuitByContent(tuit2.tuit)
        const promise4 = deleteTuitByContent(tuit3.tuit)
        const promise5 = logout()
        return Promise.all([promise1, promise2, promise3, promise4, promise5]);
    })


    test('can find tuits bookmarked by user', async () => {
        // extend timeout
        jest.setTimeout(10000)
        //user signup, create session
        const loginUser = await signup(user);
        //login user create tuit
        const newTuit1 = await createTuit(loginUser._id, tuit)
        const newTuit2 = await createTuit(loginUser._id, tuit2)
        const newTuit3 = await createTuit(loginUser._id, tuit3)

        //login user bookmarks two tuits
        await userBookmarksTuit(loginUser._id, newTuit1._id);
        await userBookmarksTuit(loginUser._id, newTuit2._id);

        //find tuits bookmarked by login user
        const bookmarkedTuits = await findAllTuitsBookmarkedByUser(loginUser._id)
        //verify tuits number
        expect(bookmarkedTuits.length).toEqual(2);
        //verify tuits content
        expect(bookmarkedTuits[0].tuit).toEqual(newTuit1.tuit);
        expect(bookmarkedTuits[1].tuit).toEqual(newTuit2.tuit);

        //unbookmark tuits, clear data in bookmarks database table
        await userBookmarksTuit(loginUser._id, newTuit1._id);
        await userBookmarksTuit(loginUser._id, newTuit2._id);
    });

});

//test getTuitsBookmarkedByUser
describe('getTuitsBookmarkedBasedOnTags', () => {

    // setup test before running test
    beforeAll(() => {
        const promise1 = deleteUsersByUsername(user.username);
        const promise2 = deleteTuitByContent(tuit.tuit)
        const promise3 = deleteTuitByContent(tuit2.tuit)
        const promise4 = deleteTuitByContent(tuit3.tuit)
        // pass an array to Promise.all()
        return Promise.all([promise1, promise2, promise3, promise4]);
    })

    // clean up after test runs
    afterAll(() => {
        // remove any data we created
        const promise1 = deleteUsersByUsername(user.username);
        const promise2 = deleteTuitByContent(tuit.tuit)
        const promise3 = deleteTuitByContent(tuit2.tuit)
        const promise4 = deleteTuitByContent(tuit3.tuit)
        const promise5 = logout()
        return Promise.all([promise1, promise2, promise3, promise4, promise5]);
    })


    test('can find tuits bookmarked by user based on tags', async () => {
        // extend timeout
        jest.setTimeout(10000)
        //user signup, create session
        const loginUser = await signup(user);
        //login user create tuit
        const newTuit1 = await createTuit(loginUser._id, tuit)
        const newTuit2 = await createTuit(loginUser._id, tuit2)
        const newTuit3 = await createTuit(loginUser._id, tuit3)

        //login user bookmarks three tuits
        await userBookmarksTuit(loginUser._id, newTuit1._id);
        await userBookmarksTuit(loginUser._id, newTuit2._id);
        await userBookmarksTuit(loginUser._id, newTuit3._id);

        //find tuits bookmarked by login user based on tags
        const bookmarkedTuits = await findAllBookmarkedTuitsByTag(loginUser._id, 'first')
        //verify tuits number
        expect(bookmarkedTuits.length).toEqual(2);
        //verify tuits content
        expect(bookmarkedTuits[0].tuit).toEqual(newTuit1.tuit);
        expect(bookmarkedTuits[1].tuit).toEqual(newTuit3.tuit);

        //unbookmark tuits, clear data in bookmarks database table
        await userBookmarksTuit(loginUser._id, newTuit1._id);
        await userBookmarksTuit(loginUser._id, newTuit2._id);
        await userBookmarksTuit(loginUser._id, newTuit3._id);
    });

});

//test getAllUniqueTags
describe('getUniqueTagsOfUser', () => {

    // setup test before running test
    beforeAll(() => {
        const promise1 = deleteUsersByUsername(user.username);
        const promise2 = deleteTuitByContent(tuit.tuit)
        const promise3 = deleteTuitByContent(tuit2.tuit)
        const promise4 = deleteTuitByContent(tuit3.tuit)
        // pass an array to Promise.all()
        return Promise.all([promise1, promise2, promise3, promise4]);
    })

    // clean up after test runs
    afterAll(() => {
        // remove any data we created
        const promise1 = deleteUsersByUsername(user.username);
        const promise2 = deleteTuitByContent(tuit.tuit)
        const promise3 = deleteTuitByContent(tuit2.tuit)
        const promise4 = deleteTuitByContent(tuit3.tuit)
        const promise5 = logout()
        return Promise.all([promise1, promise2, promise3, promise4, promise5]);
    })


    test('can find unique tags of tuits bookmarked by user', async () => {
        // extend timeout
        jest.setTimeout(10000)
        //user signup, create session
        const loginUser = await signup(user);
        //login user create tuit
        const newTuit1 = await createTuit(loginUser._id, tuit)
        const newTuit2 = await createTuit(loginUser._id, tuit2)
        const newTuit3 = await createTuit(loginUser._id, tuit3)

        //login user bookmarks three tuits
        await userBookmarksTuit(loginUser._id, newTuit1._id);
        await userBookmarksTuit(loginUser._id, newTuit2._id);
        await userBookmarksTuit(loginUser._id, newTuit3._id);

        //find unique tags of tuits bookmarked by login user based on tags
        const bookmarkedTuitsTags = await findAllTags(loginUser._id)
        //verify unique tags number
        expect(bookmarkedTuitsTags.length).toEqual(2);
        //verify unique tags content
        expect(bookmarkedTuitsTags[0]).toEqual(newTuit1.tag);
        expect(bookmarkedTuitsTags[1]).toEqual(newTuit2.tag);

        //unbookmark tuits, clear data in bookmarks database table
        await userBookmarksTuit(loginUser._id, newTuit1._id);
        await userBookmarksTuit(loginUser._id, newTuit2._id);
        await userBookmarksTuit(loginUser._id, newTuit3._id);
    });

});