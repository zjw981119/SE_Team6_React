import {act, create} from "react-test-renderer";
import Tuits from "./tuits";
import tuitsJson from "./tuits-data.json"

test('tuits render', () => {
    let tuitsRender
    act(() => {
        tuitsRender = create(
            <Tuits
                tuits={tuitsJson}/>
        )
    })
    const root = tuitsRender.root
    // eslint-disable-next-line testing-library/await-async-query
    const ttrTuits = root.findAllByProps({
        className: 'ttr-tuit'})
    expect(ttrTuits.length).toBe(tuitsJson.length)
    ttrTuits.forEach((ttrTuit, ndx) => {
        expect(ttrTuit.props.children).toBe(tuitsJson[ndx].tuit)
    })
})