import Bookmarks from "../index";
import { screen, render } from "@testing-library/react";
import { HashRouter } from "react-router-dom";

const MOCKED_TWEET = [
  {
    isBookmarked: true,
    isDisliked: false,
    isLiked: false,
    postedBy: { username: "alice" },
    tag: "action",
    tuit: "Spiderman #action",
  },
  {
    isBookmarked: true,
    isDisliked: false,
    isLiked: false,
    postedBy: { username: "radan" },
    tag: "action",
    tuit: "Captiain america #action",
  },
  {
    isBookmarked: false,
    isDisliked: false,
    isLiked: false,
    postedBy: { username: "bob" },
    tag: "action",
    tuit: "Thor #action",
  },
  {
    isBookmarked: true,
    isDisliked: false,
    isLiked: false,
    postedBy: { username: "peter" },
    tag: "action",
    tuit: "Hulk #action",
  },
];

test("bookmark component renders", () => {
  render(
    <>
      <HashRouter>
        <Bookmarks tuitsData={MOCKED_TWEET} />
      </HashRouter>
    </>
  );

  // checks thw text Hulk is present on the screen or not, Hulk is used in MOCKED_TWEET which is static data
  const test = screen.getByText(/Hulk/i);
  expect(test).toBeInTheDocument();
});
