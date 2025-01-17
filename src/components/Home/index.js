import {Link} from 'react-router-dom'

import Header from '../Header'
import './index.css'

const Home = () => (
  <div className="home-bg-cont">
    <Header />
    <div className="home-content-cont">
      <h1 className="home-h1">Find The Job That Fits Your Life</h1>
      <p className="home-para">
        Millions of People are searching for jobs, salary information, company
        reviews. Find the job that fits your abilities and potential.
      </p>
      <Link to="/jobs">
        <button className="home-btn">Find Jobs</button>
      </Link>
    </div>
  </div>
)
export default Home
