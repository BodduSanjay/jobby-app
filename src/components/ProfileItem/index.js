import React, {Component} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'

const currentApiStatus = {
  initial: 'initial',
  inProgress: 'inProgress',
  success: 'success',
  failure: 'failure',
}

class ProfileItem extends Component {
  state = {
    profileDets: {name: '', profileImageUrl: '', shortBio: ''},
    apiStatus: currentApiStatus.initial,
  }

  componentDidMount() {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    this.setState({apiStatus: currentApiStatus.inProgress})
    const url = 'https://apis.ccbp.in/profile'
    const response = await fetch(url)
    const data = await response.json()
    if (response.ok) {
      const formattedData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({
        profileDets: formattedData,
        apiStatus: currentApiStatus.success,
      })
    } else {
      this.setState({apiStatus: currentApiStatus.failure})
    }
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={50} width={50} />
    </div>
  )

  renderList = () => {
    const {profileDets} = this.state
    const {name, profileImageUrl, shortBio} = profileDets
    return (
      <div className="profile-container">
        <img className="profile-pic" src={profileImageUrl} alt={name} />
        <h1 className="profile-heading">{name}</h1>
        <p className="profile-para">{shortBio}</p>
      </div>
    )
  }

  onClickRetry = () => {
    this.getProfileDetails()
  }

  renderFailure = () => (
    <div className="failure-container">
      <button className="no-jobs-btn" onClick={this.onClickRetry}>
        Retry
      </button>
    </div>
  )

  renderAll = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case currentApiStatus.inProgress:
        return this.renderLoader()
      case currentApiStatus.success:
        return this.renderList()
      case currentApiStatus.failure:
        return this.renderFailure()
      default:
        return null
    }
  }

  render() {
    return <div className="bg-profile_details-cont">{this.renderAll()}</div>
  }
}
export default ProfileItem
