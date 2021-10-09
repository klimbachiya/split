import Container from 'components/Container.style';
import Button from 'components/Button.style';
import {
  StyledLabel,
  TextField,
  TextFieldWithIcon,
} from 'components/FormControl.style';
import { Grid2Cols, Grid3Cols } from 'components/Grid.style';
import Image from 'next/image';
import {
  SectionSplitter,
  TipBox,
  LogoBox,
  TipContent,
  SelectAmount,
  SelectTip,
  TipPercentBox,
  TipCustomTextBox,
  CheckAmount,
  AmountBox,
  AmountLabel,
  AmountPerPerson,
  Amount,
  ResetBtn,
} from 'components/splitter.style';
import { splitterValidationSchema } from 'validators/splitter.validator';
import { useFormik } from 'formik';
import { useRef, useState } from 'react';

const Splitter = () => {
  const [totalPerPerson, setTotalPerPerson] = useState(0);
  const [selectedTip, setSelectedTip] = useState(0);
  const [tipPerPerson, setTipPerPerson] = useState(0);
  const tipsPercentArray = [5, 10, 15, 20, 25];

  const billAmountRef = useRef(null);
  const noOfPeopleRef = useRef(null);
  const customTipPercentRef = useRef(null);

  const formik = useFormik({
    validateOnBlur: true, // turn off fields validation
    isValidating: true,
    initialValues: { billAmount: '', noOfPeople: '', customTipPercent: '' },
    validationSchema: splitterValidationSchema,
    onSubmit: (values, { resetForm }) => {
      resetAmount();
      setSelectedTip(0);
      resetForm();
    },
  });

  const {
    handleChange,
    handleSubmit,
    values,
    errors,
    handleBlur,
    setFieldValue,
    touched,
  } = formik;

  const handleChangeBillAmount = e => {
    handleCalculateAmountPerPerson(e, 'billAmount');
  };

  const handleChangeNoOfPeople = e => {
    handleCalculateAmountPerPerson(e, 'noOfPeople');
  };

  const handleCalculateAmountPerPerson = (e, fieldName) => {
    if (allowOnlyNumbers(e, fieldName)) {
      handleChange(e);
      calculateAmountPerPerson(selectedTip);
      if (!e.target.value) {
        resetAmount();
      }
    }
  };

  // code to find tip and all on base of bill amount added
  // const calculateAmountPerPerson = tipPercent => {
  //   const billAmount = billAmountRef?.current?.value;
  //   const noOfPeople = noOfPeopleRef?.current?.value;
  //   if (billAmount && noOfPeople) {
  //     const amountPerPersonWithoutTip = billAmount / noOfPeople;
  //     if (tipPercent) {
  //       const totalTip = ((billAmount * tipPercent) / 100).toFixed(2);

  //       const tipPerPerson = totalTip / noOfPeople;
  //       setTipPerPerson(tipPerPerson);
  //       const amountPerPerson = amountPerPersonWithoutTip - tipPerPerson;
  //       setTotalPerPerson(amountPerPerson);
  //       return;
  //     }
  //     setTotalPerPerson(amountPerPersonWithoutTip);
  //     setTipPerPerson(0);
  //   }
  // };

  const calculateAmountPerPerson = tipPercent => {
    const billAmount = billAmountRef.current.value;
    const noOfPeople = noOfPeopleRef.current.value;
    if (billAmount && noOfPeople) {
      const amountPerPersonWithoutTip = (billAmount / noOfPeople).toFixed(2);
      if (tipPercent !== 0) {
        const totalTip = ((billAmount * tipPercent) / 100).toFixed(2);

        const tipPerPerson = (totalTip / noOfPeople).toFixed(2);
        setTipPerPerson(tipPerPerson);
        // Note : toFixed(2) converts the answer in string, so to further add two values we need to convert it to numbers
        const amountPerPerson = +amountPerPersonWithoutTip + +tipPerPerson;
        setTotalPerPerson(amountPerPerson);
        return;
      }
      setTotalPerPerson(amountPerPersonWithoutTip);
      setTipPerPerson(0);
    }
  };

  const handleSelectTipPercent = e => {
    setSelectedTip(e);
    calculateAmountPerPerson(e);
    setFieldValue('customTipPercent', '');
  };

  const handleChangeCustomTipPercent = e => {
    if (allowOnlyNumbers(e, 'customTipPercent')) {
      let customTip = 0;
      if (e.target.value) {
        customTip = e.target.value;
      }
      setSelectedTip(customTip);
      calculateAmountPerPerson(customTip);
    }
  };

  const resetAmount = () => {
    setTipPerPerson(0);
    setTotalPerPerson(0);
  };

  const allowOnlyNumbers = (e, fieldName) => {
    const re = /^\d*[.]?\d*$/;
    if (e.target.value === '' || re.test(e.target.value)) {
      setFieldValue(fieldName, e.target.value);
      return true;
    }
    return false;
  };

  return (
    <>
      <main>
        <SectionSplitter>
          <Container>
            <TipBox>
              <LogoBox>
                <Image src="/logo.svg" layout="fill" />
              </LogoBox>
              <TipContent>
                <form>
                  <Grid2Cols>
                    <SelectAmount>
                      <TextFieldWithIcon
                        type="text"
                        name="billAmount"
                        id="billAmount"
                        label="Bill *"
                        placeholder="0"
                        ref={billAmountRef}
                        value={values.billAmount}
                        touched={touched.billAmount}
                        error={errors.billAmount}
                        icon="/icon-dollar.svg"
                        isInvalid={
                          errors &&
                          errors?.billAmount &&
                          touched &&
                          touched.billAmount
                        }
                        onChange={handleChangeBillAmount}
                        onBlur={handleBlur}></TextFieldWithIcon>
                      <SelectTip>
                        <StyledLabel>Select Tip %</StyledLabel>
                        <Grid3Cols>
                          {tipsPercentArray.map(tipPercent => (
                            <TipPercentBox
                              onClick={() => handleSelectTipPercent(tipPercent)}
                              key={tipPercent}
                              isActive={tipPercent === selectedTip}>
                              {tipPercent}%
                            </TipPercentBox>
                          ))}
                          {/* <TipPercentBox isActive={true}>5%</TipPercentBox>
                          <TipPercentBox>10%</TipPercentBox>
                          <TipPercentBox>15%</TipPercentBox>
                          <TipPercentBox>20%</TipPercentBox>
                          <TipPercentBox>25%</TipPercentBox> */}
                          {/* <div className="tip-percent-custom tip-percent">
                            Custom
                          </div> */}
                          <TipCustomTextBox>
                            <TextField
                              type="text"
                              name="customTipPercent"
                              id="customTipPercent"
                              placeholder="Custom"
                              ref={customTipPercentRef}
                              isActive={values.customTipPercent?.length}
                              value={values.customTipPercent}
                              touched={touched.customTipPercent}
                              error={errors.customTipPercent}
                              isInvalid={
                                errors &&
                                errors?.customTipPercent &&
                                touched &&
                                touched.customTipPercent
                              }
                              onChange={e => handleChangeCustomTipPercent(e)}
                              onBlur={handleBlur}></TextField>
                          </TipCustomTextBox>
                        </Grid3Cols>
                      </SelectTip>
                      <TextFieldWithIcon
                        type="text"
                        name="noOfPeople"
                        id="noOfPeople"
                        label="No of People *"
                        placeholder="0"
                        ref={noOfPeopleRef}
                        value={values.noOfPeople}
                        icon="/icon-person.svg"
                        touched={touched.noOfPeople}
                        error={errors.noOfPeople}
                        isInvalid={
                          errors &&
                          errors?.noOfPeople &&
                          touched &&
                          touched.noOfPeople
                        }
                        onChange={handleChangeNoOfPeople}
                        onBlur={handleBlur}></TextFieldWithIcon>
                    </SelectAmount>
                    <CheckAmount>
                      <AmountBox>
                        <div>
                          <AmountLabel>Tip Amount</AmountLabel>
                          <AmountPerPerson>/ person</AmountPerPerson>
                        </div>
                        <Amount>$ {tipPerPerson}</Amount>
                      </AmountBox>
                      <AmountBox>
                        <div>
                          <AmountLabel>Total</AmountLabel>
                          <AmountPerPerson>/ person</AmountPerPerson>
                        </div>
                        <Amount>$ {totalPerPerson}</Amount>
                      </AmountBox>
                      <ResetBtn>
                        <Button onClick={handleSubmit}>RESET</Button>
                      </ResetBtn>
                    </CheckAmount>
                  </Grid2Cols>
                </form>
              </TipContent>
            </TipBox>
          </Container>
        </SectionSplitter>
      </main>
    </>
  );
};

export default Splitter;
