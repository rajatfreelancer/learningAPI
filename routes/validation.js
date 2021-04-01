const { param, query, cookies, header , body, validationResult } = require('express-validator')
var Common = require("../api/common");


exports.userLoginValidation = () => {
  return [
    body('email').exists().trim().escape().withMessage('email Field is Required'),
    body('password').exists().trim().withMessage('Password Field is Required'),
  ]
}

exports.userRegisterValidation = () => {
  return [
    body('username').exists().trim().escape().withMessage('Username Field is Required'),
    body('firstname').exists().trim().escape().withMessage('Firstname Field is Required'),
    body('lastname').exists().trim().escape().withMessage('Lastname Field is Required'),
    body('email').exists().trim().escape().withMessage('Email Field is Required'),
    body('password').exists().trim().withMessage('Password Field is Required'),
    body('deviceToken').exists().trim().escape().withMessage('Device Token Not Recognisable'),
    body('deviceType').exists().trim().escape().withMessage('Device Type Not Recognisable'),
  ]
}


exports.educatorValidation = () => {
  return [
    param('languageId').exists().trim().escape().withMessage('Language Id Field is Required'),
  ]
}

exports.eventIdValidation = () => {
  return [
    param('eventid').exists().trim().escape().withMessage('Event Id Field is Required'),
  ]
}

exports.videoTypeValidation = () => {
  return [
    param('type').exists().trim().escape().withMessage('Video type is Required'),
  ]
}

exports.faqValidation = () => {
  return [
    param('id').exists().trim().escape().withMessage('Id Field is Required'),
  ]
}

exports.chatStatusValidation = () => {
  return [
    param('remoteuserid').exists().trim().escape().withMessage('RemoteUserId Field is Required'),
  ]
}

exports.canRateValidation = () => {
  return [
    param('educator').exists().escape().withMessage('Educator Name Field is Required'),
  ]
}

exports.ratingValidation = () => {
  return [
    body('educator').exists().escape().withMessage('Educator Name Field is Required'),
    body('rating').exists().escape().withMessage('Rating Field is Required'),
  ]
}

exports.educatorsubscriptionValidation = () => {
  return [
    body('eventid').exists().escape().withMessage('Eventid Field is Required'),
    body('status').exists().escape().withMessage('Status Field is Required'),
  ]
}
exports.millicastValidation = () => {
  return [
    body('id').exists().trim().escape().withMessage('Id Field is Required'),
  ]
}

exports.validateError = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json(
      Common.errorResponse(
      "badRequest",
      "Validation Failed",
      errors.array(),
      )
    );
  }

  return next()
}

module.exports;