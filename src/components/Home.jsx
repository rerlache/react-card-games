import {
  FaFacebookSquare,
  FaGithubSquare,
  FaGlobeEurope,
} from "react-icons/fa";
import {
  GiCardDraw,
  GiCardPick,
  GiCardPlay,
  GiCardAceHearts,
} from "react-icons/gi";
import codePic from "../assets/images/code.png";

function Home() {
  const imgTitle = "BlackJack and CardWar code";
  return (
    <main className="homecontent">
      <h1 className="projectheader">Cardgames build with React</h1>
      <div className="subheader">
        These are my first react projects, with some instructions/tutorials from
        youtube.
      </div>
      <img
        className="codeimage"
        src={codePic}
        alt={imgTitle}
        title={imgTitle}
      />
      <div className="description">
        <h2 className="featureheading">
          <GiCardDraw /> Card-War <GiCardPick />
        </h2>
        <div className="featuredescription">
          In CardWar there are 2 stacks of cards. One for the CPU and one for
          the Player.
          <br />
          Flipping cards, displays the top cards of both stacks. The higher card
          wins.
          <br />
          The winner get both cards at the bottom of the his stack.
          <br />
          Afterwards the next cards will be flipped. Winner is, who gets all the
          cards.
          <p>
            Got the Idea from:{" "}
            <a href="https://www.youtube.com/@WebDevSimplified" target="_blank">
              Web Dev Simplified
            </a>{" "}
            reworked his JavaScript solution wo work with react.
          </p>
        </div>
        <hr />
        <h2 className="featureheading">
          <GiCardPlay /> BlackJack <GiCardAceHearts />
        </h2>
        <div className="featuredescription">describe game here</div>
      </div>
      <footer className="footer">
        <div className="sociallinkcontainer">
          <a
            href="https://facebook.com/rerlache"
            target="_blank"
            title="Check out facebook"
          >
            <FaFacebookSquare className="socialicon" />
          </a>
          <a
            href="https://github.com/rerlache"
            target="_blank"
            title="This is my github profile"
          >
            <FaGithubSquare className="socialicon" />
          </a>
          <a
            href="https://robinerlacher.online"
            target="_blank"
            title="My personal Website (written in c#)"
          >
            <FaGlobeEurope className="socialicon" />
          </a>
        </div>
      </footer>
    </main>
  );
}

export default Home;
