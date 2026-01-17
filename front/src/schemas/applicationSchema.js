import * as yup from "yup"

const applicationSchema = yup.object({
    email: yup.string("Neispravan format").email("Neispravan format emaila").required("Email je obavezan"),
    name: yup.string("Neispravan format").required("Ime je obavezno"),
    phone: yup.string("Neispravan format")
    .required('Broj telefona je obavezan')
    .matches(/\+(38)[0-9]{6,15}/, 'Mora biti u formatu +38*6*******'),
  });


  export default applicationSchema;