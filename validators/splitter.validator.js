import * as Yup from 'yup';

// const mobileNoRegExp =
//   /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const onlyDigitsRegEx = /^\d*[.]?\d*$/;

export const splitterValidationSchema = Yup.object().shape({
  billAmount: Yup.string('Required')
    .required('Please enter bill amount')
    .matches(
      onlyDigitsRegEx,
      'Bill Amount is not valid, it must be digits only'
    ),
  noOfPeople: Yup.string('Required')
    .required('Please enter number of people')
    .matches(
      onlyDigitsRegEx,
      'No of people is not valid, it must be digits only'
    ),
  customTipPercent: Yup.string('Required').matches(
    onlyDigitsRegEx,
    'No of people is not valid, it must be digits only'
  ),
});
