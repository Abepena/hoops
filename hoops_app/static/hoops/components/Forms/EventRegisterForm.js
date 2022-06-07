import { Formik, Form } from "formik";
import * as Yup from "yup";
import { WaiverCheckbox, TextInput } from "components/Forms/Fields";
import UserInfoForm from "./UserInfoForm";
import WaiverForm from "./WaiverForm";
import PaymentForm from "./PaymentForm";
import Stepper from "./Stepper";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const steps = ["Register", "Waiver", "Confirm and Pay"];

function _renderStepContent(step) {
  switch (step) {
    case 0:
      return <UserInfoForm />;
    case 1:
      return <WaiverForm />;
    case 2:
      return <PaymentForm />;
    default:
      return <div className="grid place-items-center">Form Not Found</div>;
  }
}

function EventRegiserForm() {
  const [activeStep, setactiveStep] = useState(0);
  const isLastStep = activeStep === steps.length - 1;

  function _sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function _submitForm(values, actions) {
    await _sleep(1000);
    alert(JSON.stringify(values, null, 2));
    actions.setSubmitting(false);

    setActiveStep(activeStep + 1);
  }

  async function _submitForm(values, actions) {
    await _sleep(1000);
    alert(JSON.stringify(values, null, 2));
    actions.setSubmitting(false);

    setActiveStep(activeStep + 1);
  }

  function _handleSubmit(values, actions) {
    if (isLastStep) {
      _submitForm(values, actions);
    } else {
      setActiveStep(activeStep + 1);
      actions.setTouched({});
      actions.setSubmitting(false);
    }
  }

  function _handleBack() {
    setActiveStep(activeStep - 1);
  }
  return (
    <>
      <Stepper activeStep={activeStep} />
      {/* MULTSTEP FORM */}
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          acceptedWaiver: false,
        }}
        validationSchema={Yup.object({
          firstName: Yup.string()
            .max(15, "Must be 15 characters or less")
            .required("Required"),
          lastName: Yup.string()
            .max(20, "Must be 20 characters or less")
            .required("Required"),
          email: Yup.string()
            .email("Invalid email address")
            .required("Required"),
          phone: Yup.string().matches(phoneRegExp, "Phone number is not valid"),
          acceptedWaiver: Yup.boolean()
            .required("Required")
            .oneOf(
              [true],
              "You must read and accept the waiver in order to participate"
            ),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        <Form className="">
          <UserInfoForm />
          <WaiverForm />
        </Form>
      </Formik>
      <PaymentForm />
    </>
  );
}

export default EventRegiserForm;
