import Bookmarks from "../index";
import { screen, render } from "@testing-library/react";
import { HashRouter } from "react-router-dom";
import * as bookmarkService from "../../../services/bookmarks-service";
// ];
// export default function bookmarktest() {

//   return <div>bookmark.test</div>;
// }

test("bookmark component renders", async () => {
  const dataRecieved = await bookmarkService.findAllTuitsBookmarkedByUser("me");
  render(
    <>
      <HashRouter>
        <Bookmarks servertuitRecieved={dataRecieved[0]} />
      </HashRouter>
    </>
  );
  // checks whether action tag of the tweet retrived from server is present or not
  const test = screen.getByText(/action/i);
  expect(test).toBeInTheDocument();

  // expect(true);
});
