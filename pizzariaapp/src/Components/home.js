import React from "react";
import Home1 from "../assets/images/Home.jpg";
import Home2 from "../assets/images/Home2.jpg";
import Home3 from "../assets/images/Home3.jpg";

function Home() {
  return (
    <div>

      <div className="container mt-5">
        <h2 className="text-center">Our story</h2>
        <p>
          We believe in good. We launched Fresh Pan Pizza Best Excuse Awards on
          our Facebook fan page. Fans were given situations where they had to
          come up with wacky and fun excuses. The person with the best excuse
          won the Best Excuse Badge and won Pizzeria's vouchers. Their
          enthusiastic response proved that Pizzeria's Fresh Pan Pizza is the
          Tastiest Pan Pizza. Ever!
        </p>
        <p>
          Ever since we launched the Tastiest Pan Pizza, ever, people have not
          been able to resist the softest, cheesiest, crunchiest, butteriest
          Domino's Fresh Pan Pizza. They have been leaving the stage in the
          middle of a performance and even finding excuses to be disqualified in
          a football match.
        </p>


        
        <div className="row">
          <div className="col-md-6">
            <img src={Home1} className="img-fluid" alt="" />
          </div>
          <div className="col-md-6">
            <p><br/></p>
            <h3>Ingredients</h3>
            <p>
              We're ruthless about goodness. We have no qualms about tearing up
              a day-old lettuce leaf (straight from the farm), or steaming a
              baby (carrot). Cut. Cut. Chop. Chop. Steam. Steam. Stir Stir.
              While they're still young and fresh – that's our motto. It makes
              the kitchen a better place.
            </p>
          </div>
        </div>

        
        <div className="row">
          <div className="col-md-6">
          <p><br/></p>
          <h3>Our Chefs</h3>
            <p>
              They make sauces sing and salads dance. They create magic with
              skill, knowledge, passion, and stirring spoons (among other
              things). They make goodness so good, it doesn't know what to do
              with itself. We do though. We send it to you.
            </p>
          </div>
          <div className="col-md-6">
            <img src={Home2} className="img-fluid" alt=""/>
          </div>
        </div>


        
        <div className="row">
          <div className="col-md-6">
            <img src={Home3} className="img-fluid" alt=""/>
          </div>
          <div className="col-md-6">
            <p><br/><br/><br/><br/></p>
            <h3>45 min delivery</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
