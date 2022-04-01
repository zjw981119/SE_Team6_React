import {act, create} from 'react-test-renderer';
import TuitStats from "../../components/tuits/tuit-stats";

test('stats render likes correctly', () => {
    let stats = {
        likes: 123,
        dislikes: 111,
        replies: 234,
        retuits: 345
    }

    const likeTuit = () => {
        act(() => {
            stats.likes++;
            tuitStats.update(
                <TuitStats
                    tuit={{stats: stats}}
                    likeTuit={() => {}}
                    dislikeTuit={() => {}}
                />)
        })
    }

    let tuitStats
    act(() => {
        tuitStats = create(
            <TuitStats
                likeTuit={likeTuit}
                tuit={{stats: stats}}/>
        );
    })
    // get document root
    const root = tuitStats.root;

    // get stats
    // eslint-disable-next-line testing-library/await-async-query
    const likesCounter = root.findByProps({className: 'ttr-stats-likes'})
    // eslint-disable-next-line testing-library/await-async-query
    const retuitsCounter = root.findByProps({className: 'ttr-stats-retuits'})
    // eslint-disable-next-line testing-library/await-async-query
    const repliesCounter = root.findByProps({className: 'ttr-stats-replies'})

    // get buttons
    // eslint-disable-next-line testing-library/await-async-query
    const likeTuitButton = root.findByProps(
        {className: 'ttr-like-tuit-click'})

    // verify initial stats text
    let likesText = likesCounter.children[0];
    const repliesText = repliesCounter.children[0];
    const retuitsText = retuitsCounter.children[0];
    expect(likesText).toBe('123');
    expect(repliesText).toBe('234');
    expect(retuitsText).toBe('345');

    // verify stats after like-click event
    act(() => {likeTuitButton.props.onClick()})
    likesText = likesCounter.children[0];
    expect(likesText).toBe('124');

});

test('stats render dislikes correctly', () => {
    let stats = {
        likes: 123,
        dislikes: 111,
        replies: 234,
        retuits: 345
    }

    const dislikeTuit = () => {
        act(() => {
            stats.dislikes++;
            tuitStats.update(
                <TuitStats
                    tuit={{stats: stats}}
                    likeTuit={() => {}}
                    dislikeTuit={() => {}}
                />)
        })
    }

    let tuitStats
    act(() => {
        tuitStats = create(
            <TuitStats
                dislikeTuit={dislikeTuit}
                tuit={{stats: stats}}/>
        );
    })
    // get document root
    const root = tuitStats.root;

    // get dislike stat
    // eslint-disable-next-line testing-library/await-async-query
    const dislikesCounter = root.findByProps({className: 'ttr-stats-dislikes'})

    // get buttons
    // eslint-disable-next-line testing-library/await-async-query
    const dislikeTuitButton = root.findByProps(
        {className: 'ttr-dislike-tuit-click'})

    // verify initial dislike stats text
    let dislikesText = dislikesCounter.children[0];
    expect(dislikesText).toBe('111');

    // verify stats after dislike-click event
    act(() => {dislikeTuitButton.props.onClick()})
    dislikesText = dislikesCounter.children[0];
    expect(dislikesText).toBe('112');

});