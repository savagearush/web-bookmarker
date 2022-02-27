import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <section className="py-5 text-center container">
        <div className="row py-lg-5">
          <div className="col-lg-6 col-md-8 mx-auto">
            <h1 className="fw-light">Website Bookmarker</h1>
            <p className="lead text-muted">
              Here you can save your websites. It also has authentication
              feature So you don't have to worry, your privacy is our first
              Priority.
            </p>
            <p>
              <Link to="/login" className="btn btn-primary my-2 mx-2">
                Login
              </Link>
              <Link to="signup" className="btn btn-secondary my-2">
                SignUp
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
