/**
 * @jest-environment node
 */
import Bookmarks from "../index";
import { screen, render } from "@testing-library/react";
import { HashRouter } from "react-router-dom";
import * as bookmarkService from "../../../services/bookmarks-service";
// ];
// export default function bookmarktest() {

//   return <div>bookmark.test</div>;
// }

test("bookmark component renders", () => {
  return bookmarkService.findAllTuitsBookmarkedByUser("624604ca22fb564f3f16d64f").then((tuits) => {
    console.log(tuits);
    render(
      <>
        <HashRouter>
          <Bookmarks servertuitRecieved={tuits} />
        </HashRouter>
      </>
    );
    // checks whether action tag of the tuit retrieved from server is present or not
    const test = screen.getByText(/action/i);
    expect(test).toBeInTheDocument();
  });

  // expect(true);
});
