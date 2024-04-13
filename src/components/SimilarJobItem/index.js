import {FaStar} from 'react-icons/fa'
import {IoLocationSharp} from 'react-icons/io5'
import {BsBriefcaseFill} from 'react-icons/bs'

import './index.css'

const SimilarJobItem = ({job}) => {
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = job

  return (
    <li className="SimilarJobItem-cont">
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
      <div className="descrp-cont">
        <h1 className="description-title">Description</h1>
        <p className="rating-num">{jobDescription}</p>
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
      </div>
    </li>
  )
}
export default SimilarJobItem
