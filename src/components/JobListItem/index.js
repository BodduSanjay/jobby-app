import {Link} from 'react-router-dom'
import {FaStar} from 'react-icons/fa'
import {IoLocationSharp} from 'react-icons/io5'
import {BsBriefcaseFill} from 'react-icons/bs'

import './index.css'

const JobListItem = ({each}) => {
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = each
  return (
    <li className="jobItem-cont">
      <Link to={`/jobs/${id}`}>
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
          <p className="description-title">Description</p>
          <p className="rating-num">{jobDescription}</p>
        </div>
      </Link>
    </li>
  )
}

export default JobListItem
