import {Component} from 'react'
import {Cookies} from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'

import Header from '../Header'
import ProfileItem from '../ProfileItem'
import TypeOfEmploymentItem from '../TypeOfEmploymentItem'
import SalaryRangeItem from '../SalaryRangeItem'
import JobListItem from '../JobListItem'

import './index.css'

const currentStatus = {
  initial: 'initial',
  inProgress: 'inProgress',
  success: 'success',
  failure: 'failure',
}

class Jobs extends Component {
  state = {
    searchValue: '',
    typeofEmployment: [],
    salaryRange: '',
    jobsList: [],
    apiStatus: currentStatus.initial,
    isSearchbtnClicked: false,
  }

  componentDidMount() {
    this.getJobs()
  }

  getJobs = async () => {
    this.setState({apiStatus: currentStatus.inProgress})
    const {searchValue, typeofEmployment, salaryRange, isSearchbtnClicked} =
      this.state
    const jwtToken = Cookies.get('jwt_token') // Corrected token key

    const url = `https://apis.ccbp.in/jobs?employment_type=${typeofEmployment.join(
      ',',
    )}&minimum_package=${salaryRange}&search=${
      isSearchbtnClicked && searchValue
    }`

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`, // Corrected header name
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      const userDetails = data.jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))
      this.setState({jobsList: userDetails, apiStatus: currentStatus.success})
    } else {
      this.setState({apiStatus: currentStatus.failure})
    }
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderList = () => {
    const {jobsList} = this.state
    return (
      <>
        {jobsList.length !== 0 ? (
          jobsList.map(each => <JobListItem each={each} key={each.id} />)
        ) : (
          <div className="no-job-cont">
            <img
              className="no-jobs-img"
              src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
              alt="no jobs"
            />
            <h1 className="no-jobs-heading">No Jobs Found</h1>
            <p className="no-jobs-para">
              We could not find any jobs. Try other filters.
            </p>
          </div>
        )}
      </>
    )
  }

  onClickRetry = () => {
    this.getJobs()
  }

  renderFailuer = () => (
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
        return this.renderFailuer()
      default:
        return null
    }
  }

  onClickType = (value, checked) => {
    if (checked) {
      this.setState(prevState => ({
        typeofEmployment: [...prevState.typeofEmployment, value],
      }))
    } else {
      const {typeofEmployment} = this.state
      const newList = typeofEmployment.filter(each => each !== value)
      this.setState({typeofEmployment: newList})
    }
  }

  onClickSalary = value => {
    this.setState({salaryRange: value})
  }

  onChangeSearch = event => {
    this.setState({searchValue: event.target.value}) // Corrected target spelling
  }

  searchJobs = () => {
    const {searchValue} = this.state
    if (searchValue.trim() !== '') {
      this.setState({isSearchbtnClicked: true})
    }
  }

  render() {
    const {employmentTypesList, salaryRangesList} = this.props

    return (
      <div className="jobs-bg-cont">
        <Header />
        <div className="responsive-cont">
          <div className="jobs-sorting-profile-cont">
            <div className="search-cont-sm">
              <input
                className="input-el"
                type="text"
                placeholder="Search"
                onChange={this.onChangeSearch}
              />
              <button
                className="jobs-search-btn"
                type="submit" // Corrected type
                data-testid="searchButton"
                onClick={this.searchJobs}
                aria-label="Search"
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            <div className="em-type-cont">
              <ProfileItem />
            </div>
            <p className="title-border">-</p>
            <ul className="em-type-cont">
              <h1 className="sortin-title">Type of Employment</h1>
              {employmentTypesList.map(typeItem => (
                <TypeOfEmploymentItem
                  typeItem={typeItem}
                  key={typeItem.id}
                  onClickType={this.onClickType}
                />
              ))}
            </ul>
            <p className="title-border">.</p>
            <ul className="em-type-cont">
              <h1 className="sortin-title">Salary Range</h1>
              {salaryRangesList.map(salaryItem => (
                <SalaryRangeItem
                  salaryItem={salaryItem}
                  key={salaryItem.id}
                  onClickSalary={this.onClickSalary}
                />
              ))}
            </ul>
          </div>
          <ul className="jobsList-cont">
            <div className="search-cont-lg">
              <input
                className="input-el"
                type="text"
                placeholder="Search"
                onChange={this.onChangeSearch}
              />
              <button
                className="jobs-search-btn"
                type="submit" // Corrected type
                data-testid="searchButton"
                aria-label="Search"
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            {this.renderAllProducts()}
          </ul>
        </div>
      </div>
    )
  }
}
export default Jobs
