import {Component} from 'react'
import Loader from 'react-loader-spinner'

import {FaExternalLinkAlt, FaStar} from 'react-icons/fa'
import {IoLocationSharp} from 'react-icons/io5'
import {BsBriefcaseFill} from 'react-icons/bs'

import Header from '../Header'
import SimilarJobItem from '../SimilarJobItem'
import './index.css'

const currentStatus = {
  initial: 'initial',
  inProgress: 'inProgress',
  success: 'success',
  failure: 'failure',
}

class JobItemDetails extends Component {
  state = {
    jobItem: {},
    similarJobsList: [],
    apiStatus: currentStatus.initial,
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({apiStatus: currentStatus.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const url = `https://apis.ccbp.in/jobs/${id}`
    const response = await fetch(url)
    const data = await response.json()
    if (response.ok) {
      const userDetails = {
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        id: data.job_details.id,
        jobDescription: data.job_details.job_description,
        skills: data.job_details.skills,
        lifeAtCompany: data.job_details.life_at_company,
        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
        title: data.job_details.title,
      }
      const similarJobs = data.similar_jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        rating: each.rating,
        title: each.title,
      }))
      this.setState({
        jobItem: userDetails,
        similarJobsList: similarJobs,
        apiStatus: currentStatus.success,
      })
    } else {
      this.setState({apiStatus: currentStatus.failure})
    }
  }

  renderList = () => {
    const {jobItem, similarJobsList} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      skills,
      lifeAtCompany,
      location,
      packagePerAnnum,
      rating,
      title,
    } = jobItem
    return (
      <>
        <div className="jobItem-cont">
          <div className="row-cont">
            <img className="jobItem-logo" src={companyLogoUrl} alt="company" />
            <div className="column-cont">
              <h1>{title}</h1>
              <div className="row-cont">
                <FaStar className="star-icon" />
                <p className="rating-num">{rating}</p>
              </div>
            </div>
          </div>
          <div className="loc-type-cont">
            <div className="row-cont">
              <div className="row-cont">
                <IoLocationSharp />
                <p className="rating-num">{location}</p>
              </div>
              <div className="row-cont">
                <BsBriefcaseFill />
                <p className="rating-num">{employmentType}</p>
              </div>
            </div>
            <p className="description-title">{packagePerAnnum}</p>
          </div>
          <p className="title-border">.</p>
          <div className="description-cont">
            <div className="loc-type-cont">
              <p className="description-title">Description</p>
              <a href={companyWebsiteUrl} className="row-cont">
                <p>Visit</p>
                <FaExternalLinkAlt />
              </a>
            </div>
            <p className="rating-num">{jobDescription}</p>
          </div>
          <h1 className="description-title">Skills</h1>
          <ul className="skills-cont">
            {skills.map(each => {
              const skill = {
                imageUrl: each.image_url,
                name: each.name,
              }

              const {imageUrl, name} = skill
              return (
                <li className="row-cont">
                  <img className="skill-img" src={imageUrl} alt={name} />
                  <p className="rating-num">{name}</p>
                </li>
              )
            })}
          </ul>
          <h1 className="description-title">Life at Company</h1>
          <div className="lifeAtCompany-cont">
            <p className="rating-num">{lifeAtCompany.description}</p>
            <img
              className="company-img"
              src={lifeAtCompany.image_url}
              alt="life at company"
            />
          </div>
        </div>
        <div>
          <h1 className="description-title">Similar Jobs</h1>
          <ul className="skills-cont">
            {similarJobsList.map(job => (
              <SimilarJobItem job={job} key={job.id} />
            ))}
          </ul>
        </div>
      </>
    )
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailure = () => (
    <div className="no-job-cont">
      <img
        className="no-jobs-img"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1 className="no-jobs-heading">Oops! Something Went Wrong</h1>
      <p className="no-jobs-para">
        We cannot seem to find the page you are looking for.
      </p>
      <button className="no-jobs-btn" onClick={this.onClickRetry}>
        Retry
      </button>
    </div>
  )

  renderAllProducts = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case currentStatus.inProgress:
        return this.renderLoader()
      case currentStatus.success:
        return this.renderList()
      case currentStatus.failure:
        return this.renderFailure()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="job-details-bg-cont">
        <Header />
        <div className="bown-cont">{this.renderAllProducts()}</div>
      </div>
    )
  }
}
export default JobItemDetails
